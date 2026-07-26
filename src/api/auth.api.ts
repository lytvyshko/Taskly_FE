import { api } from './axios';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const refresh = async () => {
  const { data } = await api.post('/auth/refresh');

  return data;
};
