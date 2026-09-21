import { api } from './axios';
import type { Tag } from '@/types/tag.types.ts';

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>('/tags');

  return response.data;
};
