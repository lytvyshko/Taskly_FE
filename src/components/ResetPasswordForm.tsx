import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from '@/schemas/resetPasswordSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { useResetPassword } from '@/hooks/useResetPassword.tsx';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  if (!token) {
    return <Typography>Invalid reset link.</Typography>;
  }

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(
      { token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          navigate('/password-reset-success');
        },
      },
    );
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
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={1}>
        <Stack spacing={0.5}>
          <Typography variant="body2">Password</Typography>

          <TextField
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={
              errors.newPassword?.message ??
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

        <Stack spacing={0.5}>
          <Typography variant="body2">Repeat new password</Typography>

          <TextField
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat new password"
            {...register('repeatNewPassword')}
            error={!!errors.repeatNewPassword}
            helperText={errors.repeatNewPassword?.message}
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
        <Box sx={{ pt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, borderRadius: 2 }}
            loading={isPending}
            fullWidth
          >
            Create password
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
