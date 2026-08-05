import { Box, Button, Typography } from '@mui/material';
import passwordUpdatedImage from '@/assets/password-updated.png';
import { useNavigate } from 'react-router-dom';

export const PasswordUpdatedPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxWidth: 350,
        width: {
          xs: '100%',
        },
        margin: '80px auto 0',
      }}
    >
      <Box
        component="img"
        src={passwordUpdatedImage}
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
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
        Password changed successfully! 🎉
      </Typography>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{ maxWidth: 350, textAlign: 'center', mx: 'auto' }}
      >
        Your password has been updated.
        <br />
        You can now sign in with your new password.
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 16, py: 1.5, borderRadius: 2 }}
        onClick={() => navigate('/login')}
        fullWidth
      >
        Continue to login
      </Button>
    </Box>
  );
};
