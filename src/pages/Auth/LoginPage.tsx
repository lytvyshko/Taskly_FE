import { Box, Link, Typography } from '@mui/material';
import loginImage from '@/assets/login-tasks.png';
import LoginForm from '@/components/LoginForm.tsx';
import { Link as RouterLink } from 'react-router';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '50%',
        },
        margin: '80px auto',
      }}
    >
      <Box
        component="img"
        src={loginImage}
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
        Welcome back!
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mb: 1, mx: 'auto' }}
      >
        Log in to continue to your tasks
      </Typography>

      <LoginForm />

      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ textAlign: 'center', fontSize: '0.875rem' }}
      >
        Don't have an account?{' '}
        <Link
          component={RouterLink}
          to="/sign-up"
          underline="hover"
          sx={{
            fontWeight: 500,
          }}
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};
