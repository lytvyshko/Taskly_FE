import { api } from './axios';
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
} from '../types/auth.types';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await api.post<SignUpResponse>('/auth/register', data);

  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const refresh = async () => {
  const { data } = await api.post('/auth/refresh');

  return data;
};

export const resendEmailVerification = async (email: string) => {
  await api.post('/auth/resend-verification', { email });
};

export const verifyEmail = async (token: string) => {
  await api.get('/auth/verify-email', {
    params: {
      token,
    },
  });
};

export const forgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};
