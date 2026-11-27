
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth.accessToken';
const USER_KEY = 'auth.user';
const FIRST_LAUNCH_KEY = 'app.initialized';

export type User = {
  id: string;
  email: string;
  displayName?: string | null;
};

export const storage = {
  async initialize(): Promise<void> {
    const initialized = await AsyncStorage.getItem(
      FIRST_LAUNCH_KEY
    );

    if (!initialized) {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);

      await AsyncStorage.setItem(
        FIRST_LAUNCH_KEY,
        'true'
      );
    }
  },

  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  },

  async getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(USER_KEY);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
  },

  async clearSession(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
  },
};
