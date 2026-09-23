import {
  CalendarTodayRounded,
  CheckBoxOutlineBlankRounded,
  CheckRounded,
  DeleteOutlineRounded,
  EditOutlined,
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
import { useState } from 'react';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import type { Task } from '@/types/task.types.ts';

const defaultTagColor = tagColors.purple;

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const formatDateLabel = (date: string | null) => {
  if (!date) return 'No date';

  const datePart = date.slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return 'No date';
  }

  const parsedDate = new Date(`${datePart}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'No date';
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  if (isSameDay(parsedDate, today)) return 'Today';
  if (isSameDay(parsedDate, tomorrow)) return 'Tomorrow';

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(parsedDate);
};

const TaskRow = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: task.completed ? 'background.paper' : 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        gap: { xs: 0.75, md: 1.5 },
        minHeight: { xs: 68, md: 76 },
        px: { xs: 1, md: 1.5 },
        py: { xs: 1.25, md: 1 },
        '&:last-child': {
          borderBottom: 0,
        },
      }}
    >
      <Checkbox
        checked={task.completed}
        icon={<CheckBoxOutlineBlankRounded />}
        checkedIcon={
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'primary.main',
              borderRadius: 0.75,
              color: 'common.white',
              display: 'flex',
              height: 20,
              justifyContent: 'center',
              width: 20,
            }}
          >
            <CheckRounded sx={{ fontSize: 15 }} />
          </Box>
        }
        slotProps={{
          input: { 'aria-label': `Complete ${task.title}` },
        }}
        readOnly
        sx={{
          color: 'grey.400',
          flexShrink: 0,
          p: 0.5,
          '&.Mui-checked': {
            color: 'primary.main',
          },
        }}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: { md: '280px', lg: '500px', xl: '800px' },
        }}
      >
        <Typography
          sx={{
            color: task.completed ? 'text.secondary' : 'text.primary',
            fontSize: { xs: 13, md: 14 },
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: task.completed ? 'line-through' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: 11, md: 12 },
              lineHeight: 1.35,
              mt: 0.25,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {task.description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: '20px', sm: '30px', lg: '60px', xl: '120px' },
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            color: 'text.secondary',
            display: 'flex',
            flexShrink: 0,
            gap: 0.5,
            width: { xs: 'auto', md: '100px' },
            maxWidth: { xs: 68, md: 92 },
          }}
        >
          <CalendarTodayRounded
            sx={{ display: { xs: 'none', md: 'block' }, fontSize: 15 }}
          />
          <Typography
            sx={{
              fontSize: { xs: 10, md: 12 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {formatDateLabel(task.due_date)}
          </Typography>
        </Box>

        {task.tag && (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor:
                tagColors[task.tag_color ?? '']?.background ??
                defaultTagColor.background,
              borderRadius: 5,
              color:
                tagColors[task.tag_color ?? '']?.foreground ??
                defaultTagColor.foreground,
              display: 'flex',
              gap: 0.5,
              flexShrink: 0,
              maxWidth: { xs: 110, md: 150 },
              minWidth: 0,
              px: 1.25,
              py: 0.5,
              '& svg': { fontSize: { xs: 13, md: 15 } },
            }}
          >
            {tagIcons[task.tag_icon ?? ''] ?? tagIcons.label}
            <Typography
              sx={{
                color: 'inherit',
                fontSize: { xs: 10, md: 11 },
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {task.tag}
            </Typography>
          </Box>
        )}
      </Box>

      <IconButton
        aria-label={`More actions for ${task.title}`}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="small"
        sx={{ color: 'grey.500', flexShrink: 0, marginLeft: 'auto' }}
      >
        <MoreVertRounded fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEdit(task);
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
            onDelete(task);
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

export const TasksList = ({ tasks, onEdit, onDelete }: Props) => {
  if (!tasks.length) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 180,
          px: 2,
        }}
      >
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          No tasks found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { xs: 2.5, md: 3.5 } }}>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};
