import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { useIsMutating } from '@tanstack/react-query';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }

  40% {
    transform: translateY(-8px) scale(1.2);
    opacity: 1;
  }
`;

const dots = [
  { color: '#5E49E7', delay: '0s' },
  { color: '#BAABFA', delay: '0.15s' },
  { color: '#E4DEFD', delay: '0.3s' },
];

export const GlobalLoader = () => {
  const isLoggingOut =
    useIsMutating({
      mutationKey: ['logout'],
    }) > 0;

  const isVerifyingEmail =
    useIsMutating({
      mutationKey: ['email-verify'],
    }) > 0;

  const isAuthLoading = isLoggingOut || isVerifyingEmail;

  if (!isAuthLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: (theme) => theme.zIndex.modal + 1,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {dots.map(({ color, delay }) => (
          <Box
            key={color}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: color,
              animation: `${bounce} 0.8s ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
