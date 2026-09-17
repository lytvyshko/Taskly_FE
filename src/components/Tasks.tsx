import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

const taskTabs = ['Planned', 'Today', 'Completed'];

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      component="section"
      aria-labelledby="tasks-title"
      sx={{
        mx: 'auto',
        pb: { xs: 11, md: 4 },
        pt: { xs: 2.75, md: 4.5 },
        px: { xs: 2, sm: 3, lg: 5 },
        width: '100%',
      }}
    >
      <Typography
        component="h1"
        id="tasks-title"
        sx={{
          color: 'text.primary',
          fontSize: { xs: 24, md: 28 },
          fontWeight: 700,
          lineHeight: 1.25,
          mb: { xs: 1.5, md: 2.25 },
        }}
      >
        My Tasks
      </Typography>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          maxWidth: { md: 560 },
          width: '100%',
        }}
      >
        <Tabs
          aria-label="Task filters"
          onChange={(_, value: number) => setActiveTab(value)}
          value={activeTab}
          variant="fullWidth"
          sx={{
            minHeight: 44,
            '& .MuiTabs-indicator': {
              bgcolor: 'primary.main',
              bottom: -1,
              height: 2,
              zIndex: 1,
            },
          }}
        >
          {taskTabs.map((label) => (
            <Tab
              disableRipple
              key={label}
              label={label}
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 13, sm: 14 },
                fontWeight: 500,
                minHeight: 44,
                minWidth: 0,
                px: { xs: 0.5, sm: 2 },
                textTransform: 'none',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
