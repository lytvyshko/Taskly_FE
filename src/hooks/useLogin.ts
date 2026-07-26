import { useMutation } from '@tanstack/react-query';

import { login as loginRequest } from '@/api/auth.api';
import { getMe } from '@/api/users.api.ts';
import { tokenService } from '@/auth/token.service';
import { useAuth } from '@/auth/useAuth';

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: async (tokens) => {
      tokenService.setAccessToken(tokens.accessToken);

      const user = await getMe();

      setUser(user);
    },
  });
}
