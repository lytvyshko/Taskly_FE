import { Box, Button, IconButton, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ArrowBackOutlined } from '@mui/icons-material';
import checkEmailImage from '@/assets/check-email.png';
import { useLocation } from 'react-router-dom';
import {
  MarkEmailUnreadOutlined,
  Refresh,
  ArrowBack,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useResendEmailVerification } from '@/hooks/useResendEmailVerification.ts';
import { useNavigate } from 'react-router-dom';

export const CheckEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, mode } = location.state ?? {};

  const [sendEmailDelay, setSendEmailDelay] = useState(
    mode === 'sign-up' ? 30 : 0,
  );

  const { mutate: resendEmail } = useResendEmailVerification();

  useEffect(() => {
    if (sendEmailDelay === 0) return;

    const timer = setInterval(() => {
      setSendEmailDelay((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [sendEmailDelay]);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleResendEmail = async () => {
    resendEmail(email, {
      onSuccess: () => {
        setSendEmailDelay(30);
      },
    });
  };

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
      <Link component={RouterLink} to="/sign-up">
        <IconButton>
          <ArrowBackOutlined />
        </IconButton>
      </Link>
      <Box
        component="img"
        src={checkEmailImage}
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
        {mode === 'login' ? 'Email not verified' : 'Check your email'}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: 'center', mb: 1, mx: 'auto', color: 'grey.500' }}
      >
        {mode === 'login'
          ? `Try to send a verification link again to ${' '}`
          : `We've sent a verification link to ${' '}`}
        <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
          {email}
        </Box>
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: 'center',
          mb: 2,
          mx: 'auto',
          color: 'grey.500',
          lineHeight: 1.25,
        }}
      >
        Please check your inbox and spam folder and click the link to confirm
        your email address and activate your account.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: '#F4F2FB',
          borderRadius: '8px',
          p: '16px',
          mb: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#E3E1F9',
            flexShrink: 0,
          }}
        >
          <MarkEmailUnreadOutlined
            sx={{
              width: '30px',
              height: '30px',
              color: 'primary.main',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Didn't receive the email?
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'grey.500' }}>
            It might take a few minutes to arrive. Don't forget to check your
            spam folder.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button
          variant="contained"
          disabled={sendEmailDelay > 0}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1.5,
            borderRadius: 2,
          }}
          startIcon={<Refresh sx={{ width: '24px', height: '24px' }} />}
          fullWidth
          onClick={handleResendEmail}
        >
          {sendEmailDelay > 0
            ? `Resend in ${sendEmailDelay}s`
            : 'Resend verification email'}
        </Button>

        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          startIcon={<ArrowBack sx={{ width: '24px', height: '24px' }} />}
          sx={{ py: 1.5, borderRadius: 2 }}
          fullWidth
        >
          Back to login
        </Button>
      </Box>
    </Box>
  );
};
