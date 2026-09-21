import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { createTag, getTags } from '@/api/tags.api.ts';
import {
  CreateTagDialog,
  type TagColorOption,
  type TagIconOption,
} from '@/components/CreateTagDialog.tsx';
import { MobileTopBar } from '@/components/MobileTopBar.tsx';
import { TagCard } from '@/components/TagCard.tsx';
import { tagColors, tagIcons } from '@/components/tagOptions.tsx';
import type { CreateTagInput, Tag } from '@/types/tag.types.ts';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';
import { toast } from 'react-toastify';

const tagIconOptions: TagIconOption[] = [
  'folder',
  'home',
  'work',
  'person',
  'heart',
  'flag',
  'list',
  'bookmark',
  'label',
  'group',
].map((value) => ({ value, icon: tagIcons[value] }));

const tagColorOptions: TagColorOption[] = [
  'purple',
  'blue',
  'green',
  'orange',
  'red',
  'grey',
  'teal',
].map((value) => ({ value, ...tagColors[value] }));

export const TagsPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
  });
  const { mutate: createTagMutation, isPending: isCreatingTag } = useMutation({
    mutationFn: (tagData: CreateTagInput) => createTag(tagData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tags'] });
      setIsCreateDialogOpen(false);
      toast.success('Tag created successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
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
            onClick={() => setIsCreateDialogOpen(true)}
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
          onClick={() => setIsCreateDialogOpen(true)}
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

      <CreateTagDialog
        isOpen={isCreateDialogOpen}
        isSubmitting={isCreatingTag}
        iconOptions={tagIconOptions}
        colorOptions={tagColorOptions}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={createTagMutation}
      />
    </Box>
  );
};
