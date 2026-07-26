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

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
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
            sx={{ py: 1.5, borderRadius: 2 }}
            fullWidth
          >
            Send reset link
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
