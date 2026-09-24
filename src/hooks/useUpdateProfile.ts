import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/api/users.api.ts';

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  });
