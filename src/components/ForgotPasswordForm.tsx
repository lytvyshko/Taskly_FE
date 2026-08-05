import { useForm } from 'react-hook-form';
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from '@/schemas/forgotPasswordSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { EmailOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/api/auth.api.ts';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function ForgotPasswordForm() {
  const [sendEmailDelay, setSendEmailDelay] = useState(0);

  useEffect(() => {
    if (sendEmailDelay === 0) return;

    const timer = setInterval(() => {
      setSendEmailDelay((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [sendEmailDelay]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPasswordRequest, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Reset link sent successfully');
      setSendEmailDelay(30);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordRequest(data.email);
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

        <Box sx={{ pt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            disabled={sendEmailDelay > 0}
            sx={{ py: 1.5, borderRadius: 2 }}
            fullWidth
          >
            {sendEmailDelay > 0
              ? `Resend in ${sendEmailDelay}s`
              : 'Send reset link'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
