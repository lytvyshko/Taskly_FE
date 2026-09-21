import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/NavBar.tsx';

export const AppLayout = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
