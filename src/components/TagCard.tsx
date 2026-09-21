import { LabelOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import type { Tag } from '@/types/tag.types.ts';

const defaultTagColor = tagColors.primary;

export const TagCard = ({ tag }: { tag: Tag }) => {
  const colors = tagColors[tag.color] ?? defaultTagColor;

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        gap: 1.5,
        minHeight: 112,
        p: 2,
      }}
    >
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
      <Typography sx={{ fontSize: 24 }}>•••</Typography>
    </Box>
  );
};
