import { Box, Divider, IconButton, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ArrowBackOutlined } from '@mui/icons-material';
import signUpImage from '@/assets/sign-up1.png';
import { SignUpForm } from '@/features/auth/components/SignUpForm.tsx';

export const SignUpPage = () => {
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
      <Link component={RouterLink} to="/login">
        <IconButton>
          <ArrowBackOutlined />
        </IconButton>
      </Link>
      <Box
        component="img"
        src={signUpImage}
        alt="login-image"
        sx={{
          width: {
            xs: 200,
            sm: 250,
          },
          display: 'block',
          mx: 'auto',
        }}
      />
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Create your account
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mb: 1, mx: 'auto' }}
      >
        Sign up to get started with your tasks
      </Typography>

      <SignUpForm />

      <Divider
        sx={{
          m: '0 auto 20px',
          maxWidth: 300,
          color: 'text.secondary',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        or
      </Divider>

      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ textAlign: 'center', fontSize: '0.875rem' }}
      >
        Already have an account?{' '}
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          sx={{
            fontWeight: 500,
          }}
        >
          Log in
        </Link>
      </Typography>
    </Box>
  );
};
