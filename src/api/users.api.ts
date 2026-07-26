import { api } from './axios';
import type { User } from '@/types/user.types.ts';

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};
