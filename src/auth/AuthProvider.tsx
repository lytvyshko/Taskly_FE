import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';
import type { User } from '../types/user.types';
import { refresh } from '@/api/auth.api.ts';
import { tokenService } from '@/auth/token.service.ts';
import { getMe } from '@/api/users.api.ts';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { accessToken } = await refresh();

        tokenService.setAccessToken(accessToken);

        const user = await getMe();

        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
