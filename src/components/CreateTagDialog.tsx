import { useState } from 'react';
import type { ReactNode, FormEvent } from 'react';
import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import type { CreateTagInput, Tag } from '@/types/tag.types.ts';

export interface TagIconOption {
  value: string;
  icon: ReactNode;
}

export interface TagColorOption {
  value: string;
  background: string;
  foreground: string;
}

interface CreateTagDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
  initialTag?: Tag | null;
  iconOptions: TagIconOption[];
  colorOptions: TagColorOption[];
  onClose: () => void;
  onSubmit: (tagData: CreateTagInput) => void;
}

export const CreateTagDialog = ({
  isOpen,
  isSubmitting,
  mode,
  initialTag,
  iconOptions,
  colorOptions,
  onClose,
  onSubmit,
}: CreateTagDialogProps) => {
  const [title, setTitle] = useState(initialTag?.title ?? '');
  const [selectedIcon, setSelectedIcon] = useState(
    initialTag?.icon ?? 'folder',
  );
  const [selectedColor, setSelectedColor] = useState(
    initialTag?.color ?? 'purple',
  );
  const [titleError, setTitleError] = useState('');

  const selectedColorOption =
    colorOptions.find((color) => color.value === selectedColor) ??
    colorOptions[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setTitleError('Title is required');
      return;
    }

    setTitleError('');
    onSubmit({
      title: normalizedTitle,
      icon: selectedIcon,
      color: selectedColor,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-container': {
          alignItems: { xs: 'flex-end', sm: 'center' },
        },
        '& .MuiDialog-paper': {
          borderRadius: { xs: '24px 24px 0 0', sm: 3 },
          margin: { xs: 0, sm: 2 },
          maxHeight: { xs: '92vh', sm: 'calc(100% - 32px)' },
          width: { xs: '100%', sm: 'calc(100% - 32px)' },
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}
      >
        <DialogTitle
          sx={{
            alignItems: 'center',
            color: 'text.primary',
            display: 'flex',
            fontSize: { xs: 22, sm: 24 },
            fontWeight: 700,
            px: { xs: 2.5, sm: 4 },
            pt: { xs: 2.5, sm: 3.5 },
            pb: 1.5,
          }}
        >
          {mode === 'edit' ? 'Edit tag' : 'Create new tag'}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              color: 'grey.500',
              display: { xs: 'none', sm: 'inline-flex' },
              ml: 'auto',
            }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.25,
            overflowY: 'auto',
            px: { xs: 2.5, sm: 4 },
            py: 1,
          }}
        >
          <Box>
            <Typography
              component="label"
              htmlFor="tag-title"
              sx={{
                color: 'text.primary',
                display: 'block',
                fontSize: 14,
                fontWeight: 700,
                mb: 0.75,
              }}
            >
              Title
            </Typography>
            <TextField
              id="tag-title"
              autoFocus
              fullWidth
              size="small"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError) setTitleError('');
              }}
              error={Boolean(titleError)}
              helperText={titleError || ' '}
              placeholder="Enter tag title"
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: 14,
                fontWeight: 700,
                mb: 0.75,
              }}
            >
              Icon
            </Typography>
            <Box
              role="radiogroup"
              aria-label="Tag icon"
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              }}
            >
              {iconOptions.map((option) => {
                const isSelected = selectedIcon === option.value;

                return (
                  <Box
                    key={option.value}
                    component="button"
                    type="button"
                    role="radio"
                    aria-label={option.value}
                    aria-checked={isSelected}
                    onClick={() => setSelectedIcon(option.value)}
                    sx={{
                      alignItems: 'center',
                      bgcolor: isSelected ? 'primary.light' : 'grey.50',
                      border: '2px solid',
                      borderColor: isSelected ? 'primary.main' : 'transparent',
                      borderRadius: 2,
                      color: isSelected ? 'primary.main' : 'grey.500',
                      cursor: 'pointer',
                      display: 'flex',
                      height: 48,
                      justifyContent: 'center',
                      minWidth: 0,
                      p: 0,
                      transition:
                        'border-color .2s, background-color .2s, color .2s',
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {option.icon}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: 14,
                fontWeight: 700,
                mb: 0.75,
              }}
            >
              Color
            </Typography>
            <Box
              role="radiogroup"
              aria-label="Tag color"
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: { xs: 1.25, sm: 1.5 },
                flexWrap: 'wrap',
              }}
            >
              {colorOptions.map((option) => {
                const isSelected = selectedColor === option.value;

                return (
                  <Box
                    key={option.value}
                    component="button"
                    type="button"
                    role="radio"
                    aria-label={option.value}
                    aria-checked={isSelected}
                    onClick={() => setSelectedColor(option.value)}
                    sx={{
                      alignItems: 'center',
                      bgcolor: option.foreground,
                      border: '3px solid',
                      borderColor: isSelected
                        ? 'background.paper'
                        : 'transparent',
                      borderRadius: '50%',
                      boxShadow: isSelected
                        ? `0 0 0 2px ${option.foreground}`
                        : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      height: 28,
                      justifyContent: 'center',
                      p: 0,
                      width: 28,
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: 14,
                fontWeight: 700,
                mb: 0.75,
              }}
            >
              Preview
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                bgcolor: selectedColorOption?.background ?? 'primary.light',
                borderRadius: 2,
                display: 'flex',
                gap: 1,
                minHeight: 64,
                px: 1.5,
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                  color: selectedColorOption?.foreground ?? 'primary.main',
                  display: 'flex',
                  height: 36,
                  justifyContent: 'center',
                  width: 36,
                }}
              >
                {
                  iconOptions.find((option) => option.value === selectedIcon)
                    ?.icon
                }
              </Box>
              <Typography
                sx={{
                  bgcolor: selectedColorOption?.background ?? 'primary.light',
                  borderRadius: 999,
                  color: selectedColorOption?.foreground ?? 'primary.main',
                  fontSize: 14,
                  fontWeight: 700,
                  px: 1.5,
                  py: 0.75,
                }}
              >
                {title.trim() || 'Project'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            gap: 1.25,
            justifyContent: 'flex-end',
            px: { xs: 2.5, sm: 4 },
            pb: { xs: 2.5, sm: 3.5 },
            pt: 1.5,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              flex: { xs: 1, sm: 'none' },
              minHeight: 42,
              minWidth: { sm: 132 },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              flex: { xs: 1, sm: 'none' },
              minHeight: 42,
              minWidth: { sm: 154 },
            }}
          >
            {mode === 'edit' ? 'Save changes' : 'Create tag'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
