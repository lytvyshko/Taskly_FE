import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { loginSchema, type LoginFormData } from '@/schemas/loginSchema.ts';
import {
  Box,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        navigate('/check-email', {
          state: { email: data.email, mode: 'login' },
        });

        return;
      }
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 300,
        },
        mx: 'auto',
        mb: 2,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={0.5}>
        <Stack spacing={0.5}>
          <Typography variant="body2">Email</Typography>

          <TextField
            placeholder="Enter your email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ' '}
            fullWidth
            slotProps={{
              input: {
                sx: {
                  '& input': {
                    py: 1.5,
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="body2">Password</Typography>

          <TextField
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            slotProps={{
              input: {
                sx: {
                  '& input': {
                    py: 1.5,
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev: boolean) => !prev)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            sx={{
              alignSelf: 'flex-end',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Forgot password?
          </Link>
        </Stack>

        <Box sx={{ pt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, borderRadius: 2 }}
            loading={isPending}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
