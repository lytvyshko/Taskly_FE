import { useLogout } from '@/hooks/useLogout.ts';
import { Box, Typography } from '@mui/material';

export const TasksPage = () => {
  const { mutate: logoutMutation } = useLogout();

  return (
    <Box>
      <Typography>You successfully logged in</Typography>
      <button onClick={() => logoutMutation()}>logout</button>
    </Box>
  );
};
