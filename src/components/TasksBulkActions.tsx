import type { MouseEvent } from 'react';
import {
  CalendarTodayRounded,
  CheckCircleRounded,
  CloseRounded,
  DeleteOutlineRounded,
  LabelOutlined,
} from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';

interface TasksBulkActionsProps {
  areAllSelectedTasksCompleted: boolean;
  isDeletingTasks: boolean;
  isUpdatingTasks: boolean;
  onClearSelection: () => void;
  onCompleteToggle: () => void;
  onDelete: () => void;
  onOpenDateMenu: (event: MouseEvent<HTMLElement>) => void;
  onOpenTagMenu: (event: MouseEvent<HTMLElement>) => void;
  selectedCount: number;
}

export const TasksBulkActions = ({
  areAllSelectedTasksCompleted,
  isDeletingTasks,
  isUpdatingTasks,
  onClearSelection,
  onCompleteToggle,
  onDelete,
  onOpenDateMenu,
  onOpenTagMenu,
  selectedCount,
}: TasksBulkActionsProps) => (
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
      <Typography sx={{ color: 'text.primary', fontSize: 14, fontWeight: 700 }}>
        {selectedCount} selected
      </Typography>
      <Box sx={{ bgcolor: 'divider', height: 32, mx: 0.5, width: '2px' }} />
      <Button
        disabled={isUpdatingTasks}
        onClick={onCompleteToggle}
        startIcon={
          areAllSelectedTasksCompleted ? (
            <CloseRounded />
          ) : (
            <CheckCircleRounded />
          )
        }
        sx={{
          color: areAllSelectedTasksCompleted ? 'error.main' : 'success.main',
          whiteSpace: 'nowrap',
        }}
      >
        {areAllSelectedTasksCompleted ? 'Not complete' : 'Complete'}
      </Button>
      <Button
        disabled={isUpdatingTasks}
        onClick={onOpenTagMenu}
        startIcon={<LabelOutlined />}
        sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}
      >
        Change tag
      </Button>
      <Button
        disabled={isUpdatingTasks}
        onClick={onOpenDateMenu}
        startIcon={<CalendarTodayRounded />}
        sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}
      >
        Move to date
      </Button>
      <Button
        disabled={isDeletingTasks}
        onClick={onDelete}
        startIcon={<DeleteOutlineRounded />}
        sx={{ color: 'error.main', whiteSpace: 'nowrap' }}
      >
        Delete
      </Button>
      <IconButton
        aria-label="Clear selection"
        onClick={onClearSelection}
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
        <Typography sx={{ color: 'text.primary', fontSize: 16, fontWeight: 700 }}>
          {selectedCount} selected
        </Typography>
        <IconButton
          aria-label="Clear selection"
          onClick={onClearSelection}
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
          onClick={onCompleteToggle}
          startIcon={
            areAllSelectedTasksCompleted ? (
              <CloseRounded />
            ) : (
              <CheckCircleRounded />
            )
          }
          sx={{
            color: areAllSelectedTasksCompleted ? 'error.main' : 'success.main',
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
          onClick={onOpenTagMenu}
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
          onClick={onOpenDateMenu}
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
          onClick={onDelete}
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
);
