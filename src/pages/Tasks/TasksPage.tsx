import { useLogout } from '@/hooks/useLogout.ts';
import { Box, Typography } from '@mui/material';
import { useAuth } from '@/auth/useAuth.ts';

export const TasksPage = () => {
  const { user } = useAuth();
  const { mutate: logoutMutation } = useLogout();

  return (
    <Box>
      <Typography>{`Hello, ${user?.name}`}</Typography>
      <Typography>You successfully logged in</Typography>
      <button onClick={() => logoutMutation()}>logout</button>
    </Box>
  );
};
