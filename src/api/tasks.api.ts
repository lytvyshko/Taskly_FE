import { api } from './axios';
import type { Task } from '@/types/task.types.ts';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};
