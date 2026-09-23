import { api } from './axios';
import type {
  CreateTaskInput,
  Task,
  TaskTab,
} from '@/types/task.types.ts';

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

export const createTask = async (taskData: CreateTaskInput): Promise<Task> => {
  const response = await api.post<Task>('/tasks', taskData);

  return response.data;
};
