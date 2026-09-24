import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth.api.ts';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';
import { toast } from 'react-toastify';

export const useChangePassword = () =>
  useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
