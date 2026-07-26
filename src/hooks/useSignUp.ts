import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/auth.api.ts';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useSignUp() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,

    onSuccess: (_, variables) => {
      navigate('/check-email', {
        state: {
          email: variables.email,
        },
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
