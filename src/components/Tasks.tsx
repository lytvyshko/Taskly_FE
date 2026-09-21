import { useState } from 'react';
import { AddRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/api/tasks.api.ts';
import type { Task, TaskTab } from '@/types/task.types.ts';
import { TasksList } from '@/components/TasksList.tsx';

const taskTabs: { label: string; value: TaskTab }[] = [
  { label: 'Planned', value: 'planned' },
  { label: 'Today', value: 'today' },
  { label: 'Completed', value: 'completed' },
];

interface Props {
  searchInput: string;
  onSearchChange: (value: string) => void;
}

export const Tasks = ({ searchInput, onSearchChange }: Props) => {
  const [activeTab, setActiveTab] = useState<TaskTab>('planned');
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks', { tab: activeTab, search: searchInput }],
    queryFn: () =>
      getTasks({ tab: activeTab, search: searchInput }),
  });

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
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          mb: { xs: 1.5, md: 2.25 },
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
          }}
        >
          My Tasks
        </Typography>

        <Box
          sx={{
            alignItems: 'center',
            display: { xs: 'none', md: 'flex' },
            gap: 1.25,
          }}
        >
          <TextField
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            hiddenLabel
            placeholder="Search tasks..."
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: 'grey.500', fontSize: 19 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: 230,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: 2,
                fontSize: 12,
                height: 38,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
            }}
          />
          <Button
            startIcon={<AddRounded />}
            variant="contained"
            sx={{
              borderRadius: 2,
              minHeight: 38,
              px: 2,
              whiteSpace: 'nowrap',
            }}
          >
            New Task
          </Button>
        </Box>
      </Box>

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
          onChange={(_, value) => setActiveTab(value as TaskTab)}
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
          {taskTabs.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.label}
              value={tab.value}
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

      <TasksList
        tasks={tasks ?? []}
      />
    </Box>
  );
};
