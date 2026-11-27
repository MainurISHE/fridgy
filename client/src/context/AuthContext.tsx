
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import axios from 'axios';
import { authApi, setAccessToken } from '../services/api';
import { storage, type User } from '../services/storage';

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(
  null
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function clearSession() {
    setAccessToken(null);
    setToken(null);
    setUser(null);

    await storage.clearSession();
  }

  useEffect(() => {
    async function restoreSession() {
      try {
        await storage.initialize();

        const savedToken = await storage.getToken();
        const savedUser = await storage.getUser();

        if (!savedToken) {
          return;
        }

        setAccessToken(savedToken);
        setToken(savedToken);
        setUser(savedUser);

        try {
          const currentUser = await authApi.me();

          const updatedUser = {
            ...savedUser,
            ...currentUser,
          };

          setUser(updatedUser);
          await storage.saveUser(updatedUser);

        } catch (error) {
          if (
            axios.isAxiosError(error) &&
            (
              error.response?.status === 401 ||
              error.response?.status === 403
            )
          ) {
            await clearSession();
          }
        }
      } catch (error) {
        console.error('Session restore error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  async function login(
    email: string,
    password: string
  ) {
    const response = await authApi.login({
      email: email.trim().toLowerCase(),
      password,
    });

    await storage.saveToken(response.accessToken);
    await storage.saveUser(response.user);

    setAccessToken(response.accessToken);
    setToken(response.accessToken);
    setUser(response.user);
  }

  async function register(
    displayName: string,
    email: string,
    password: string
  ) {
    await authApi.register({
      displayName: displayName.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
  }

  async function logout() {
    const request = authApi.logout().catch(() => {});

    await clearSession();

    void request;
  }

  async function forgotPassword(email: string) {
    await authApi.forgotPassword(
      email.trim().toLowerCase()
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}
