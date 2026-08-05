import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/auth.api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/utils/getErrorMessage';

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
