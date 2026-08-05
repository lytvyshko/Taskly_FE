import type { User } from './user.types';
import type { Dispatch, SetStateAction } from 'react';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export type SignUpResponse = {
  id: number;
  name: string;
  email: string;
  email_verified: boolean;
  created_at: string;
};

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

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
