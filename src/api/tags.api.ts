import { api } from './axios';
import type {
  CreateTagInput,
  Tag,
} from '@/types/tag.types.ts';

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>('/tags');

  return response.data;
};

export const createTag = async (
  tagData: CreateTagInput,
): Promise<Omit<Tag, 'task_count'>> => {
  const response = await api.post<Omit<Tag, 'task_count'>>(
    '/tags',
    tagData,
  );

  return response.data;
};
