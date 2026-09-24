import { CloseRounded, DeleteOutlineRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  count: number;
  isDeleting: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle?: string;
}

export const DeleteConfirmationDialog = ({
  count,
  isDeleting,
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteConfirmationDialogProps) => {
  const isSingleTask = Boolean(taskTitle);
  const taskLabel = count === 1 ? 'task' : 'tasks';

  return (
    <Dialog
      open={isOpen}
      onClose={isDeleting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        '& .MuiDialog-container': {
          alignItems: { xs: 'flex-end', sm: 'center' },
        },
        '& .MuiDialog-paper': {
          borderRadius: { xs: '24px 24px 0 0', sm: 3 },
          margin: { xs: 0, sm: 2 },
          width: { xs: '100%', sm: 'calc(100% - 32px)' },
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 1,
          px: { xs: 2.5, sm: 3 },
          pt: { xs: 2.5, sm: 3 },
          pb: 1,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'error.main',
            borderRadius: '50%',
            color: 'common.white',
            display: 'flex',
            height: 36,
            justifyContent: 'center',
            width: 36,
          }}
        >
          <DeleteOutlineRounded fontSize="small" />
        </Box>
        <Typography
          component="span"
          sx={{ color: 'text.primary', fontSize: 20, fontWeight: 700 }}
        >
          {isSingleTask ? 'Delete task?' : `Delete ${count} ${taskLabel}?`}
        </Typography>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          disabled={isDeleting}
          sx={{ color: 'grey.500', ml: 'auto' }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, py: 1 }}>
        {isSingleTask && (
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: 14,
              fontWeight: 700,
              mb: 0.75,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {taskTitle}
          </Typography>
        )}
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          {isSingleTask
            ? 'This task will be permanently deleted.'
            : 'The selected tasks will be permanently deleted.'}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          gap: 1.25,
          px: { xs: 2.5, sm: 3 },
          pb: { xs: 2.5, sm: 3 },
          pt: 1.5,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isDeleting}
          sx={{ flex: 1, minHeight: 42 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          loading={isDeleting}
          sx={{
            bgcolor: 'error.main',
            flex: 1,
            minHeight: 42,
            '&:hover': { bgcolor: 'error.main' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
