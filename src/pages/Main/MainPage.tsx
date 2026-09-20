import { Box } from '@mui/material';
import { NavBar } from '@/components/NavBar.tsx';
import { MobileTopBar } from '@/components/MobileTopBar.tsx';
import { Tasks } from '@/components/Tasks.tsx';
import { useState } from 'react';

export const MainPage = () => {
  const [searchInput, setSearchInput] = useState('');
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
        <MobileTopBar
          searchInput={searchInput}
          onSearchChange={setSearchInput}
        />
        <Tasks searchInput={searchInput} onSearchChange={setSearchInput} />
      </Box>
    </Box>
  );
};
