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

export const updateTag = async (
  tagId: number,
  tagData: CreateTagInput,
): Promise<Omit<Tag, 'task_count'>> => {
  const response = await api.patch<Omit<Tag, 'task_count'>>(
    `/tags/${tagId}`,
    tagData,
  );

  return response.data;
};

export const deleteTag = async (tagId: number): Promise<void> => {
  await api.delete(`/tags/${tagId}`);
};

export const deleteTags = async (tagIds: number[]): Promise<void> => {
  await api.delete('/tags', {
    data: { ids: tagIds },
  });
};
