import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/api/auth.api.ts';
import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import emailVerifiedImage from '@/assets/emailSuccessfullyVerified.png';
import { Link as RouterLink } from 'react-router';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

export const EmailVerifiedPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const {
    mutate: verifyEmailRequest,
    isError,
    error,
  } = useMutation({
    mutationKey: ['email-verify'],
    mutationFn: verifyEmail,
  });

  useEffect(() => {
    if (token) {
      verifyEmailRequest(token);
    }
  }, [token, verifyEmailRequest]);

  if (isError) {
    return <Typography color="error">{getErrorMessage(error)}</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 300,
        width: {
          xs: '100%',
          sm: '50%',
        },
        margin: '80px auto',
      }}
    >
      <Box
        component="img"
        src={emailVerifiedImage}
        alt="login-image"
        sx={{
          width: {
            xs: 250,
            sm: 300,
          },
          display: 'block',
          mx: 'auto',
        }}
      />
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Email verified!
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mb: 28, mx: 'auto' }}
      >
        You have successfully verified your email address. You can now access
        your account and begin your tasks.
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/login"
        sx={{ py: 1.5, borderRadius: 2, mb: 2 }}
        fullWidth
      >
        Go to Login
      </Button>

      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mx: 'auto' }}
      >
        Log in to get full access.
      </Typography>
    </Box>
  );
};
