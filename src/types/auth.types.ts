import type { User } from './user.types';
import type { Dispatch, SetStateAction } from 'react';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;

  isAuthenticated: boolean;
  isLoading: boolean;
}
