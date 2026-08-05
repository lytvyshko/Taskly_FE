import { Box, Link, Typography } from '@mui/material';
import resetPasswordImage from '@/assets/reset-password.png';
import { ResetPasswordForm } from '@/components/ResetPasswordForm.tsx';
import { Link as RouterLink } from 'react-router';
import { useResetPassword } from '@/hooks/useResetPassword.tsx';

export const ResetPasswordPage = () => {
  const { isSuccess } = useResetPassword();
  console.log(isSuccess);
  return (
    <Box
      sx={{
        maxWidth: 350,
        width: {
          xs: '100%',
        },
        margin: '20px auto 0',
      }}
    >
      <Box
        component="img"
        src={resetPasswordImage}
        alt="login-image"
        sx={{
          width: {
            xs: 250,
            sm: 300,
          },
          display: 'block',
          mt: '20px',
          mx: 'auto',
        }}
      />

      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Create new password
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mb: 2, mx: 'auto' }}
      >
        Enter your new password below.
        <br />
        Make sure it's strong and secure.
      </Typography>

      <ResetPasswordForm />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          sx={{ fontSize: '0.875rem', fontWeight: 500 }}
        >
          Back to login
        </Link>
      </Box>
    </Box>
  );
};
