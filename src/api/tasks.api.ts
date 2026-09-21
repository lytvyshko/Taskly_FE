import { api } from './axios';
import type { Task, TaskTab } from '@/types/task.types.ts';

interface GetTasksParams {
  search?: string;
  tab: TaskTab;
}

export const getTasks = async ({
  tab,
  search,
}: GetTasksParams): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks', {
    params: { tab, search },
  });

  return response.data;
};
