import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { type SignUpFormData, signUpSchema } from '@/schemas/signUpSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Button from '@mui/material/Button';

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
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
          <Typography variant="body2">Name</Typography>

          <TextField
            placeholder="Enter your name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message || ' '}
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
                    <PersonOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
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
            helperText={
              errors.password?.message ??
              'At least 8 characters with a number or symbol'
            }
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
        </Stack>

        <Box sx={{ pt: 2 }}>
          <Button type="submit" variant="contained" sx={{ py: 1.5 }} fullWidth>
            Sign up
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
