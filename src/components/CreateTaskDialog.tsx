import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  CalendarTodayRounded,
  CloseRounded,
  ExpandMoreRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import type { Tag } from '@/types/tag.types.ts';
import type { CreateTaskInput } from '@/types/task.types.ts';

interface CreateTaskDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  tags: Tag[];
  onClose: () => void;
  onSubmit: (taskData: CreateTaskInput) => void;
}

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const defaultTagColor = tagColors.purple;

export const CreateTaskDialog = ({
  isOpen,
  isSubmitting,
  tags,
  onClose,
  onSubmit,
}: CreateTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(getToday);
  const [tagId, setTagId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');

  const selectedTag = tags.find((tag) => tag.id === tagId);
  const selectedTagColors = selectedTag
    ? (tagColors[selectedTag.color] ?? defaultTagColor)
    : defaultTagColor;

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
      description: description.trim() || null,
      dueDate: dueDate || null,
      tagId: tagId === '' ? null : tagId,
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
          Create new task
          <IconButton
            aria-label="Close"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              color: 'grey.500',
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
            gap: 2,
            overflowY: 'auto',
            px: { xs: 2.5, sm: 4 },
            py: 1,
          }}
        >
          <TextField
            id="task-title"
            autoFocus
            fullWidth
            label="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (titleError) setTitleError('');
            }}
            error={Boolean(titleError)}
            helperText={titleError || ' '}
            placeholder="Task title"
            sx={{ mt: 1 }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add details"
          />

          <Box
            sx={{
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
            }}
          >
            <TextField
              fullWidth
              label="Due date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <CalendarTodayRounded
                      sx={{ color: 'grey.500', fontSize: 18, mr: 1 }}
                    />
                  ),
                },
              }}
            />

            <Select<number | ''>
              fullWidth
              displayEmpty
              value={tagId}
              onChange={(event) => {
                const value = event.target.value as number | '';

                setTagId(value === '' ? '' : Number(value));
              }}
              IconComponent={ExpandMoreRounded}
              renderValue={(value) => {
                if (value === '' || !selectedTag) {
                  return (
                    <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>
                      No tag
                    </Typography>
                  );
                }

                return (
                  <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: selectedTagColors.background,
                        borderRadius: '50%',
                        color: selectedTagColors.foreground,
                        display: 'flex',
                        height: 28,
                        justifyContent: 'center',
                        width: 28,
                      }}
                    >
                      {tagIcons[selectedTag.icon] ?? tagIcons.label}
                    </Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {selectedTag.title}
                    </Typography>
                  </Box>
                );
              }}
              sx={{
                minHeight: 56,
                '& .MuiSelect-select': { py: 1 },
              }}
              inputProps={{ 'aria-label': 'Tag' }}
            >
              <MenuItem value="">
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                  No tag
                </Typography>
              </MenuItem>
              {tags.map((tag) => {
                const colors = tagColors[tag.color] ?? defaultTagColor;

                return (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          bgcolor: colors.background,
                          borderRadius: '50%',
                          color: colors.foreground,
                          display: 'flex',
                          height: 28,
                          justifyContent: 'center',
                          width: 28,
                        }}
                      >
                        {tagIcons[tag.icon] ?? tagIcons.label}
                      </Box>
                      <Typography sx={{ fontSize: 14 }}>{tag.title}</Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
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
            Create task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
