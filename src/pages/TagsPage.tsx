import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AddRounded,
  BookmarkBorderOutlined,
  BusinessCenter,
  FavoriteBorderOutlined,
  FlagOutlined,
  FolderOutlined,
  GroupOutlined,
  HomeOutlined,
  LabelOutlined,
  ListAltOutlined,
  PersonOutlineOutlined,
  SellOutlined,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { getTags } from '@/api/tags.api.ts';
import { MobileTopBar } from '@/components/MobileTopBar.tsx';
import type { Tag } from '@/types/tag.types.ts';

const tagIcons: Record<string, ReactNode> = {
  bookmark: <BookmarkBorderOutlined />,
  flag: <FlagOutlined />,
  folder: <FolderOutlined />,
  group: <GroupOutlined />,
  heart: <FavoriteBorderOutlined />,
  home: <HomeOutlined />,
  label: <LabelOutlined />,
  list: <ListAltOutlined />,
  person: <PersonOutlineOutlined />,
  tag: <SellOutlined />,
  work: <BusinessCenter />,
};

const tagColors: Record<string, { background: string; foreground: string }> = {
  purple: { background: '#F0E9FF', foreground: '#6A35D9' },
  blue: { background: '#E7F0FF', foreground: '#2F80ED' },
  green: { background: '#C6F0CC', foreground: '#189431' },
  orange: { background: '#FFF0E1', foreground: '#FF8A2B' },
  red: { background: '#FFE7EA', foreground: '#F45D66' },
  grey: { background: '#EEF0F6', foreground: '#8B93A7' },
  teal: { background: '#E2F7F8', foreground: '#10AAB3' },
};

const defaultTagColor = tagColors.primary;

const TagCard = ({ tag }: { tag: Tag }) => {
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
          Tag
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Typography sx={{ fontSize: 24 }}>•••</Typography>
    </Box>
  );
};

export const TagsPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <MobileTopBar
        page="tags"
        searchInput={searchInput}
        onSearchChange={setSearchInput}
      />

      <Box
        component="section"
        aria-labelledby="tags-title"
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
            alignItems: { xs: 'flex-start', md: 'center' },
            display: 'flex',
            gap: 1.5,
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              component="h1"
              id="tags-title"
              sx={{
                color: 'text.primary',
                fontSize: { xs: 26, md: 32 },
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Tags
            </Typography>
          </Box>

          <Button
            startIcon={<AddRounded />}
            variant="contained"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              borderRadius: 2,
              lineHeight: 1,
              minHeight: 38,
              px: 2,
              whiteSpace: 'nowrap',
            }}
          >
            New Tag
          </Button>
        </Box>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: 16,
            mt: 1.5,
            mb: { xs: 2, sm: 3 },
          }}
        >
          Organize your tasks with custom tags
        </Typography>

        <Button
          startIcon={<AddRounded />}
          variant="contained"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            width: '100%',
            alignItems: 'center',
            borderRadius: 2,
            lineHeight: 1,
            minHeight: 38,
            px: 2,
            whiteSpace: 'nowrap',
            mb: 2.5,
          }}
        >
          New Tag
        </Button>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" size={28} />
          </Box>
        )}

        {isError && (
          <Typography sx={{ color: 'error.main', fontSize: 14 }}>
            Unable to load tags.
          </Typography>
        )}

        {!isLoading && !isError && !tags.length && (
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            No tags yet.
          </Typography>
        )}

        {!isLoading && !isError && Boolean(tags.length) && (
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(3, minmax(0, 1fr))',
                xl: 'repeat(4, minmax(0, 1fr))',
              },
            }}
          >
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
