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

export const updateTask = async (
  taskId: number,
  taskData: CreateTaskInput,
): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${taskId}`, taskData);

  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};
