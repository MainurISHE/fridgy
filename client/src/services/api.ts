
import axios from 'axios';
import type { User } from './storage';

const API_URL = 'http://192.168.0.111:3000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

type RegisterData = {
  displayName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: User;
};

type MessageResponse = {
  message: string;
};

export const authApi = {
  async register(data: RegisterData) {
    const response = await api.post<User>(
      '/auth/register',
      data
    );

    return response.data;
  },

  async login(data: LoginData) {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      data
    );

    return response.data;
  },

  async me() {
    const response = await api.get<User>(
      '/auth/me'
    );

    return response.data;
  },

  async logout() {
    const response = await api.post<MessageResponse>(
      '/auth/logout'
    );

    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await api.post<MessageResponse>(
      '/auth/forgot-password',
      { email }
    );

    return response.data;
  },

  async resetPassword(token: string, newPassword: string) {
    const response = await api.post<MessageResponse>(
      '/auth/reset-password',
      { token, newPassword }
    );

    return response.data;
  },
};
