import { Box } from '@mui/material';
import { NavBar } from '@/components/NavBar.tsx';
import { MobileTopBar } from '@/components/MobileTopBar.tsx';
import { Tasks } from '@/components/Tasks.tsx';

export const MainPage = () => {
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
        <MobileTopBar />
        <Tasks />
      </Box>
    </Box>
  );
};
