import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/auth.api';
import { getMe } from '@/api/users.api.ts';
import { tokenService } from '@/auth/token.service';
import { useAuth } from '@/auth/useAuth';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: async (tokens) => {
      tokenService.setAccessToken(tokens.accessToken);

      const user = await getMe();

      setUser(user);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
