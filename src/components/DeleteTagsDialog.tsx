import { DeleteOutlineRounded, CloseRounded } from '@mui/icons-material';
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

interface DeleteTagsDialogProps {
  isOpen: boolean;
  count: number;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteTagsDialog = ({
  isOpen,
  count,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteTagsDialogProps) => {
  const isSingle = count === 1;

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
          {isSingle ? 'Delete tag?' : `Delete ${count} tags?`}
        </Typography>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            color: 'grey.500',
            display: { xs: 'none', sm: 'inline-flex' },
            ml: 'auto',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, py: 1 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          {isSingle
            ? 'The selected tag will be removed. Tasks using it will not be deleted.'
            : 'The selected tags will be removed. Tasks using them will not be deleted.'}
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
