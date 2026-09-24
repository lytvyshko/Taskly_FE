import { api } from './axios';
import type { User } from '@/types/user.types.ts';

export interface UpdateProfileData {
  name?: string;
  avatar?: File;
}

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateProfile = async ({
  name,
  avatar,
}: UpdateProfileData): Promise<User> => {
  const formData = new FormData();

  if (name !== undefined) {
    formData.append('name', name);
  }

  if (avatar) {
    formData.append('avatar', avatar);
  }

  const response = await api.patch<User>('/users/me/profile', formData);

  return response.data;
};
