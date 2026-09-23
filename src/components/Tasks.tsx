import { useState } from 'react';
import {
  AddRounded,
  CalendarTodayRounded,
  CheckCircleRounded,
  CloseRounded,
  DeleteOutlineRounded,
  LabelOutlined,
  SearchRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  type BulkUpdateTasksInput,
  createTask,
  deleteTask,
  deleteTasks,
  getTasks,
  updateTasks,
  updateTask,
} from '@/api/tasks.api.ts';
import { DeleteTaskDialog } from '@/components/DeleteTaskDialog.tsx';
import { DeleteTasksDialog } from '@/components/DeleteTasksDialog.tsx';
import { getTags } from '@/api/tags.api.ts';
import { CreateTaskDialog } from '@/components/CreateTaskDialog.tsx';
import { TasksList } from '@/components/TasksList.tsx';
import type { Tag } from '@/types/tag.types.ts';
import type { CreateTaskInput, Task, TaskTab } from '@/types/task.types.ts';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

const taskTabs: { label: string; value: TaskTab }[] = [
  { label: 'Planned', value: 'planned' },
  { label: 'Today', value: 'today' },
  { label: 'Completed', value: 'completed' },
];

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const defaultTagColor = tagColors.purple;

interface Props {
  searchInput: string;
  onSearchChange: (value: string) => void;
}

export const Tasks = ({ searchInput, onSearchChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: TaskTab =
    tabParam === 'today' || tabParam === 'completed' ? tabParam : 'planned';
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskDialogKey, setTaskDialogKey] = useState(0);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [tagMenuAnchor, setTagMenuAnchor] = useState<null | HTMLElement>(null);
  const [dateMenuAnchor, setDateMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [bulkDueDate, setBulkDueDate] = useState(getTodayDate);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks', { tab: activeTab, search: searchInput }],
    queryFn: () => getTasks({ tab: activeTab, search: searchInput }),
  });
  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  const { mutate: createTaskMutation, isPending: isCreatingTask } = useMutation(
    {
      mutationFn: (taskData: CreateTaskInput) => createTask(taskData),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setIsCreateDialogOpen(false);
        toast.success('Task created successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    },
  );
  const { mutate: updateTaskMutation, isPending: isUpdatingTask } = useMutation(
    {
      mutationFn: ({
        taskId,
        taskData,
      }: {
        taskId: number;
        taskData: CreateTaskInput;
      }) => updateTask(taskId, taskData),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setIsCreateDialogOpen(false);
        setEditingTask(null);
        toast.success('Task updated successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    },
  );
  const { mutate: deleteTaskMutation, isPending: isDeletingTask } = useMutation(
    {
      mutationFn: (taskId: number) => deleteTask(taskId),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setDeletingTask(null);
        toast.success('Task deleted successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    },
  );
  const { mutate: updateTasksMutation, isPending: isUpdatingTasks } =
    useMutation({
      mutationFn: ({ taskData }: { taskData: BulkUpdateTasksInput }) =>
        updateTasks(taskData),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setSelectedTaskIds([]);
        setTagMenuAnchor(null);
        setDateMenuAnchor(null);
        toast.success('Tasks updated successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  const { mutate: deleteTasksMutation, isPending: isDeletingTasks } =
    useMutation({
      mutationFn: (taskIds: number[]) => deleteTasks(taskIds),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        setSelectedTaskIds([]);
        setIsBulkDeleteDialogOpen(false);
        toast.success('Tasks deleted successfully');
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });

  const handleOpenCreateDialog = () => {
    setEditingTask(null);
    setTaskDialogKey((currentKey) => currentKey + 1);
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (task: Task) => {
    setEditingTask(task);
    setTaskDialogKey((currentKey) => currentKey + 1);
    setIsCreateDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    if (isCreatingTask || isUpdatingTask) return;

    setIsCreateDialogOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = (taskData: CreateTaskInput) => {
    if (editingTask) {
      updateTaskMutation({ taskId: editingTask.id, taskData });
      return;
    }

    createTaskMutation(taskData);
  };

  const handleConfirmDelete = () => {
    if (!deletingTask) return;

    deleteTaskMutation(deletingTask.id);
  };

  const selectedTasks = (tasks ?? []).filter((task) =>
    selectedTaskIds.includes(task.id),
  );
  const areAllSelectedTasksCompleted =
    selectedTasks.length > 0 && selectedTasks.every((task) => task.completed);
  const selectedCount = selectedTaskIds.length;

  const handleToggleTaskSelection = (taskId: number) => {
    setSelectedTaskIds((currentIds) =>
      currentIds.includes(taskId)
        ? currentIds.filter((id) => id !== taskId)
        : [...currentIds, taskId],
    );
  };

  const handleBulkUpdate = (taskData: Omit<BulkUpdateTasksInput, 'ids'>) => {
    if (!selectedCount) return;

    updateTasksMutation({
      taskData: { ids: selectedTaskIds, ...taskData },
    });
  };

  const handleMoveTasksToDate = () => {
    handleBulkUpdate({ dueDate: bulkDueDate || null });
  };

  const handleTabChange = (value: TaskTab) => {
    setSelectedTaskIds([]);
    setTagMenuAnchor(null);
    setDateMenuAnchor(null);
    setIsBulkDeleteDialogOpen(false);
    setSearchParams({ tab: value });
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

        <Button
          onClick={handleOpenCreateDialog}
          startIcon={<AddRounded />}
          variant="contained"
          sx={{
            alignItems: 'center',
            borderRadius: 2,
            display: { xs: 'inline-flex', md: 'none' },
            fontSize: 12,
            lineHeight: 1,
            minHeight: 34,
            minWidth: 0,
            px: 1.25,
            whiteSpace: 'nowrap',
            '& .MuiButton-startIcon': { mr: 0.5 },
          }}
        >
          New Task
        </Button>

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
          onChange={(_, value) => handleTabChange(value as TaskTab)}
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

      {selectedCount > 0 && (
        <>
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'primary.light',
              border: '1px solid',
              borderColor: 'primary.lighter',
              borderRadius: 2,
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              mt: 2.5,
              minHeight: 64,
              px: 2,
            }}
          >
            <Typography
              sx={{ color: 'text.primary', fontSize: 14, fontWeight: 700 }}
            >
              {selectedCount} selected
            </Typography>
            <Box
              sx={{ bgcolor: 'divider', height: 32, mx: 0.5, width: '2px' }}
            />
            <Button
              disabled={isUpdatingTasks}
              onClick={() =>
                handleBulkUpdate({
                  completed: !areAllSelectedTasksCompleted,
                })
              }
              startIcon={
                areAllSelectedTasksCompleted ? (
                  <CloseRounded />
                ) : (
                  <CheckCircleRounded />
                )
              }
              sx={{
                color: areAllSelectedTasksCompleted
                  ? 'error.main'
                  : 'success.main',
                whiteSpace: 'nowrap',
              }}
            >
              {areAllSelectedTasksCompleted ? 'Not complete' : 'Complete'}
            </Button>
            <Button
              disabled={isUpdatingTasks}
              onClick={(event) => setTagMenuAnchor(event.currentTarget)}
              startIcon={<LabelOutlined />}
              sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}
            >
              Change tag
            </Button>
            <Button
              disabled={isUpdatingTasks}
              onClick={(event) => setDateMenuAnchor(event.currentTarget)}
              startIcon={<CalendarTodayRounded />}
              sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}
            >
              Move to date
            </Button>
            <Button
              disabled={isDeletingTasks}
              onClick={() => setIsBulkDeleteDialogOpen(true)}
              startIcon={<DeleteOutlineRounded />}
              sx={{ color: 'error.main', whiteSpace: 'nowrap' }}
            >
              Delete
            </Button>
            <IconButton
              aria-label="Clear selection"
              onClick={() => setSelectedTaskIds([])}
              sx={{ color: 'grey.500', ml: 'auto' }}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          <Box
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'primary.lighter',
              borderRadius: '16px 16px 0 0',
              bottom: 68,
              display: { xs: 'block', md: 'none' },
              left: 0,
              p: 1.25,
              position: 'fixed',
              right: 0,
              zIndex: 9,
            }}
          >
            <Box sx={{ alignItems: 'center', display: 'flex', mb: 0.5 }}>
              <Typography
                sx={{ color: 'text.primary', fontSize: 16, fontWeight: 700 }}
              >
                {selectedCount} selected
              </Typography>
              <IconButton
                aria-label="Clear selection"
                onClick={() => setSelectedTaskIds([])}
                sx={{ color: 'grey.500', ml: 'auto', p: 0.5 }}
              >
                <CloseRounded />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              }}
            >
              <Button
                disabled={isUpdatingTasks}
                onClick={() =>
                  handleBulkUpdate({
                    completed: !areAllSelectedTasksCompleted,
                  })
                }
                startIcon={
                  areAllSelectedTasksCompleted ? (
                    <CloseRounded />
                  ) : (
                    <CheckCircleRounded />
                  )
                }
                sx={{
                  color: areAllSelectedTasksCompleted
                    ? 'error.main'
                    : 'success.main',
                  flexDirection: 'column',
                  fontSize: 10,
                  gap: 0.25,
                  minWidth: 0,
                  px: 0.25,
                  '& .MuiButton-startIcon': { m: 0 },
                }}
              >
                {areAllSelectedTasksCompleted ? 'Not completed' : 'Complete'}
              </Button>
              <Button
                disabled={isUpdatingTasks}
                onClick={(event) => setTagMenuAnchor(event.currentTarget)}
                startIcon={<LabelOutlined />}
                sx={{
                  color: 'text.primary',
                  flexDirection: 'column',
                  fontSize: 10,
                  gap: 0.25,
                  minWidth: 0,
                  px: 0.25,
                  '& .MuiButton-startIcon': { m: 0 },
                }}
              >
                Change tag
              </Button>
              <Button
                disabled={isUpdatingTasks}
                onClick={(event) => setDateMenuAnchor(event.currentTarget)}
                startIcon={<CalendarTodayRounded />}
                sx={{
                  color: 'text.primary',
                  flexDirection: 'column',
                  fontSize: 10,
                  gap: 0.25,
                  minWidth: 0,
                  px: 0.25,
                  '& .MuiButton-startIcon': { m: 0 },
                }}
              >
                Move to date
              </Button>
              <Button
                disabled={isDeletingTasks}
                onClick={() => setIsBulkDeleteDialogOpen(true)}
                startIcon={<DeleteOutlineRounded />}
                sx={{
                  color: 'error.main',
                  flexDirection: 'column',
                  fontSize: 10,
                  gap: 0.25,
                  minWidth: 0,
                  px: 0.25,
                  '& .MuiButton-startIcon': { m: 0 },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </>
      )}

      <Menu
        anchorEl={tagMenuAnchor}
        open={Boolean(tagMenuAnchor)}
        onClose={() => setTagMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleBulkUpdate({ tagId: null })}>
          <ListItemIcon sx={{ color: 'grey.500', minWidth: 36 }}>
            <LabelOutlined fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: 14 }}>No tag</Typography>
        </MenuItem>
        {tags.map((tag) => {
          const colors = tagColors[tag.color] ?? defaultTagColor;

          return (
            <MenuItem
              key={tag.id}
              onClick={() => handleBulkUpdate({ tagId: tag.id })}
            >
              <ListItemIcon sx={{ color: colors.foreground, minWidth: 36 }}>
                {tagIcons[tag.icon] ?? tagIcons.label}
              </ListItemIcon>
              <Typography sx={{ fontSize: 14 }}>{tag.title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>

      <Menu
        anchorEl={dateMenuAnchor}
        open={Boolean(dateMenuAnchor)}
        onClose={() => setDateMenuAnchor(null)}
      >
        <Box sx={{ p: 2, width: { xs: 240, sm: 280 } }}>
          <Typography
            sx={{ color: 'text.primary', fontSize: 14, fontWeight: 700, mb: 1 }}
          >
            Move selected tasks to
          </Typography>
          <TextField
            fullWidth
            hiddenLabel
            type="date"
            value={bulkDueDate}
            onChange={(event) => setBulkDueDate(event.target.value)}
            size="small"
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'flex-end',
              mt: 1.5,
            }}
          >
            <Button onClick={() => setDateMenuAnchor(null)} size="small">
              Cancel
            </Button>
            <Button
              disabled={!bulkDueDate || isUpdatingTasks}
              onClick={handleMoveTasksToDate}
              size="small"
              variant="contained"
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Menu>

      <TasksList
        tasks={tasks ?? []}
        selectedTaskIds={selectedTaskIds}
        onToggleSelect={handleToggleTaskSelection}
        onEdit={handleOpenEditDialog}
        onDelete={setDeletingTask}
      />

      <CreateTaskDialog
        key={taskDialogKey}
        isOpen={isCreateDialogOpen}
        isSubmitting={isCreatingTask || isUpdatingTask}
        mode={editingTask ? 'edit' : 'create'}
        initialTask={editingTask}
        tags={tags}
        onClose={handleCloseTaskDialog}
        onSubmit={handleSubmitTask}
      />

      <DeleteTaskDialog
        isOpen={Boolean(deletingTask)}
        isDeleting={isDeletingTask}
        taskTitle={deletingTask?.title ?? ''}
        onClose={() => {
          if (!isDeletingTask) setDeletingTask(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <DeleteTasksDialog
        count={selectedCount}
        isDeleting={isDeletingTasks}
        isOpen={isBulkDeleteDialogOpen}
        onClose={() => setIsBulkDeleteDialogOpen(false)}
        onConfirm={() => deleteTasksMutation(selectedTaskIds)}
      />
    </Box>
  );
};
