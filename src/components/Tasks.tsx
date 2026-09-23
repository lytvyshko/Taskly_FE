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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createTask, getTasks } from '@/api/tasks.api.ts';
import { getTags } from '@/api/tags.api.ts';
import { CreateTaskDialog } from '@/components/CreateTaskDialog.tsx';
import { TasksList } from '@/components/TasksList.tsx';
import type { Tag } from '@/types/tag.types.ts';
import type { CreateTaskInput, Task, TaskTab } from '@/types/task.types.ts';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [taskDialogKey, setTaskDialogKey] = useState(0);
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks', { tab: activeTab, search: searchInput }],
    queryFn: () => getTasks({ tab: activeTab, search: searchInput }),
  });
  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
  });
  const { mutate: createTaskMutation, isPending: isCreatingTask } =
    useMutation({
      mutationFn: (taskData: CreateTaskInput) => createTask(taskData),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setIsCreateDialogOpen(false);
        toast.success('Task created successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });

  const handleOpenCreateDialog = () => {
    setTaskDialogKey((currentKey) => currentKey + 1);
    setIsCreateDialogOpen(true);
  };

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
            onClick={handleOpenCreateDialog}
            startIcon={<AddRounded />}
            variant="contained"
            sx={{
              alignItems: 'center',
              borderRadius: 2,
              lineHeight: 1,
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

      <TasksList tasks={tasks ?? []} />

      <CreateTaskDialog
        key={taskDialogKey}
        isOpen={isCreateDialogOpen}
        isSubmitting={isCreatingTask}
        tags={tags}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={createTaskMutation}
      />
    </Box>
  );
};
