import { useMutation } from '@tanstack/react-query';
import { resendEmailVerification } from '@/api/auth.api.ts';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

export function useResendEmailVerification() {
  return useMutation({
    mutationFn: resendEmailVerification,

    onSuccess: () => {
      toast.success('Email verification link sent');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
