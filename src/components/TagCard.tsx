import { useState } from 'react';
import {
  DeleteOutlineRounded,
  EditOutlined,
  LabelOutlined,
  MoreVertRounded,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import type { Tag } from '@/types/tag.types.ts';

const defaultTagColor = tagColors.purple;

interface TagCardProps {
  tag: Tag;
  isSelectionMode: boolean;
  isSelected: boolean;
  onToggleSelect: (tagId: number) => void;
  onDelete: (tagId: number) => void;
  onEdit: (tag: Tag) => void;
}

export const TagCard = ({
  tag,
  isSelectionMode,
  isSelected,
  onToggleSelect,
  onDelete,
  onEdit,
}: TagCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const colors = tagColors[tag.color] ?? defaultTagColor;
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{
        alignItems: 'center',
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderRadius: 2,
        display: 'flex',
        gap: 1.5,
        minHeight: 112,
        p: 2,
        position: 'relative',
        bgcolor: isSelected ? 'primary.light' : 'background.paper',
      }}
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(tag.id)}
          size="small"
          slotProps={{
            input: { 'aria-label': `Select ${tag.title}` },
          }}
          sx={{ p: 0.25 }}
        />
      )}
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: colors.background,
          borderRadius: '50%',
          color: colors.foreground,
          display: 'flex',
          flexShrink: 0,
          height: 64,
          justifyContent: 'center',
          width: 64,
        }}
      >
        {tagIcons[tag.icon] ?? <LabelOutlined />}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: 'text.primary',
            fontSize: 16,
            fontWeight: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {tag.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>
          {tag.task_count} {tag.task_count === 1 ? 'task' : 'tasks'}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        aria-label={`Actions for ${tag.title}`}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="small"
        sx={{ color: 'grey.500' }}
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEdit(tag);
          }}
        >
          <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onDelete(tag.id);
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 36 }}>
            <DeleteOutlineRounded fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ color: 'error.main', fontSize: 14 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
