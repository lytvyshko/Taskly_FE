import { Box } from '@mui/material';
import { MobileTopBar } from '@/components/MobileTopBar.tsx';
import { Tasks } from '@/components/Tasks.tsx';
import { useState } from 'react';

export const TasksPage = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100%',
      }}
    >
      <MobileTopBar
        page="tasks"
        searchInput={searchInput}
        onSearchChange={setSearchInput}
      />
      <Tasks searchInput={searchInput} onSearchChange={setSearchInput} />
    </Box>
  );
};
