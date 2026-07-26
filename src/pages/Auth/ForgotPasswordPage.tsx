import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Box, Divider, Typography, IconButton } from '@mui/material';
import { ArrowBackOutlined } from '@mui/icons-material';
import forgotPasswordImage from '@/assets/forgot-password.png';
import ForgotPasswordForm from '@/components/ForgotPasswordForm.tsx';

export const ForgotPasswordPage = () => {
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
        src={forgotPasswordImage}
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
        Forgot password?
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mb: 1, mx: 'auto' }}
      >
        Enter your email address and we'll send you instructions to reset your
        password.
      </Typography>

      <ForgotPasswordForm />

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
