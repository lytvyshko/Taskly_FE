import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/auth.api';
import { tokenService } from '@/auth/token.service';
import { useAuth } from '@/auth/useAuth.ts';

export const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,

    onSettled: () => {
      tokenService.clear();
      setUser(null);
      queryClient.clear();

      navigate('/login', {
        replace: true,
      });
    },
  });
};
