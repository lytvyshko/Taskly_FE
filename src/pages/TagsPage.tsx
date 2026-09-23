import { useState } from 'react';
import {
  AddRounded,
  ArrowBackRounded,
  CheckBoxOutlined,
  DeleteOutlineRounded,
} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {
  createTag,
  deleteTag,
  deleteTags,
  getTags,
  updateTag,
} from '@/api/tags.api.ts';
import {
  CreateTagDialog,
  type TagColorOption,
  type TagIconOption,
} from '@/components/CreateTagDialog.tsx';
import { DeleteTagsDialog } from '@/components/DeleteTagsDialog.tsx';
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
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagDialogKey, setTagDialogKey] = useState(0);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
  const [pendingDeleteTag, setPendingDeleteTag] = useState<Tag | null>(null);
  const [pendingDeleteType, setPendingDeleteType] = useState<'single' | 'bulk'>(
    'bulk',
  );
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
  const { mutate: updateTagMutation, isPending: isUpdatingTag } = useMutation({
    mutationFn: ({
      tagId,
      tagData,
    }: {
      tagId: number;
      tagData: CreateTagInput;
    }) => updateTag(tagId, tagData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tags'] });
      setIsCreateDialogOpen(false);
      setEditingTag(null);
      toast.success('Tag updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
  const { mutate: deleteTagsMutation, isPending: isDeletingTags } = useMutation(
    {
      mutationFn: ({
        ids,
        type,
      }: {
        ids: number[];
        type: 'single' | 'bulk';
      }) => (type === 'single' ? deleteTag(ids[0]) : deleteTags(ids)),
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries({ queryKey: ['tags'] });
        setIsDeleteDialogOpen(false);
        setPendingDeleteIds([]);
        setPendingDeleteTag(null);
        setPendingDeleteType('bulk');
        setSelectedTagIds([]);
        setIsSelectionMode(false);
        toast.success(
          variables.ids.length === 1
            ? 'Tag deleted successfully'
            : `${variables.ids.length} tags deleted successfully`,
        );
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    },
  );

  const handleToggleSelect = (tagId: number) => {
    setSelectedTagIds((currentIds) =>
      currentIds.includes(tagId)
        ? currentIds.filter((id) => id !== tagId)
        : [...currentIds, tagId],
    );
  };

  const handleExitSelectionMode = () => {
    setSelectedTagIds([]);
    setIsSelectionMode(false);
  };

  const areAllTagsSelected =
    tags.length > 0 && selectedTagIds.length === tags.length;

  const handleToggleSelectAll = () => {
    setSelectedTagIds(areAllTagsSelected ? [] : tags.map((tag) => tag.id));
  };

  const handleOpenSingleDelete = (tagId: number) => {
    const tag = tags.find((currentTag) => currentTag.id === tagId) ?? null;

    setPendingDeleteType('single');
    setPendingDeleteIds([tagId]);
    setPendingDeleteTag(tag);
    setIsDeleteDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setEditingTag(null);
    setTagDialogKey((currentKey) => currentKey + 1);
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (tag: Tag) => {
    setEditingTag(tag);
    setTagDialogKey((currentKey) => currentKey + 1);
    setIsCreateDialogOpen(true);
  };

  const handleCloseTagDialog = () => {
    if (isCreatingTag || isUpdatingTag) return;

    setIsCreateDialogOpen(false);
    setEditingTag(null);
  };

  const handleSubmitTag = (tagData: CreateTagInput) => {
    if (editingTag) {
      updateTagMutation({ tagId: editingTag.id, tagData });
      return;
    }

    createTagMutation(tagData);
  };

  const handleOpenBulkDelete = () => {
    if (!selectedTagIds.length) return;

    setPendingDeleteType('bulk');
    setPendingDeleteIds(selectedTagIds);
    setPendingDeleteTag(null);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteIds.length) return;

    deleteTagsMutation({
      ids: pendingDeleteIds,
      type: pendingDeleteType,
    });
  };

  const selectedCount = selectedTagIds.length;

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
          pb: { xs: isSelectionMode ? 20 : 11, md: 4 },
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
                display: {
                  xs: isSelectionMode ? 'none' : 'block',
                  md: 'block',
                },
                fontSize: { xs: 26, md: 32 },
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Tags
            </Typography>
          </Box>

          {isSelectionMode ? (
            <Box
              sx={{
                alignItems: 'center',
                display: { xs: 'none', sm: 'flex' },
                gap: 1,
              }}
            >
              <Typography
                sx={{ color: 'text.primary', fontSize: 14, fontWeight: 700 }}
              >
                {selectedCount} selected
              </Typography>
              <Button onClick={handleToggleSelectAll} variant="text">
                {areAllTagsSelected ? 'Unselect all' : 'Select all'}
              </Button>
              <Button onClick={handleExitSelectionMode} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleOpenBulkDelete}
                disabled={!selectedCount}
                startIcon={<DeleteOutlineRounded />}
                variant="contained"
                sx={{
                  bgcolor: 'error.main',
                  '&:hover': { bgcolor: 'error.main' },
                }}
              >
                Delete
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button
                onClick={() => setIsSelectionMode(true)}
                startIcon={<CheckBoxOutlined />}
                variant="outlined"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Select
              </Button>
              <Button
                onClick={handleOpenCreateDialog}
                startIcon={<AddRounded />}
                variant="contained"
                sx={{
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
          )}
        </Box>

        {isSelectionMode && (
          <Box
            sx={{
              alignItems: 'center',
              display: { xs: 'flex', sm: 'none' },
              gap: 0.75,
              mt: 1.25,
            }}
          >
            <Button
              aria-label="Exit selection mode"
              onClick={handleExitSelectionMode}
              startIcon={<ArrowBackRounded />}
              sx={{ minWidth: 0, px: 0.5 }}
            >
              {selectedCount} selected
            </Button>
            <Button onClick={handleToggleSelectAll} sx={{ ml: 'auto' }}>
              {areAllTagsSelected ? 'Unselect all' : 'Select all'}
            </Button>
          </Box>
        )}

        <Typography
          sx={{
            color: 'text.secondary',
            display: { xs: isSelectionMode ? 'none' : 'block', sm: 'block' },
            fontSize: 16,
            mt: 1.5,
            mb: { xs: 2, sm: 3 },
          }}
        >
          Organize your tasks with custom tags
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: {
              xs: isSelectionMode ? 'none' : 'inline-flex',
              sm: 'none',
            },
            justifyContent: 'space-between',
            mb: 2.5,
          }}
        >
          <Button
            onClick={() => setIsSelectionMode(true)}
            startIcon={<CheckBoxOutlined />}
            variant="outlined"
            sx={{ minHeight: 38, whiteSpace: 'nowrap' }}
          >
            Select
          </Button>

          <Button
            onClick={handleOpenCreateDialog}
            startIcon={<AddRounded />}
            variant="contained"
            sx={{
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
              <TagCard
                key={tag.id}
                tag={tag}
                isSelectionMode={isSelectionMode}
                isSelected={selectedTagIds.includes(tag.id)}
                onToggleSelect={handleToggleSelect}
                onDelete={handleOpenSingleDelete}
                onEdit={handleOpenEditDialog}
              />
            ))}
          </Box>
        )}
      </Box>

      {isSelectionMode && (
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            bottom: 68,
            display: { xs: 'flex', sm: 'none' },
            gap: 1,
            left: 0,
            p: 1.25,
            position: 'fixed',
            right: 0,
            zIndex: 9,
          }}
        >
          <Button
            onClick={handleExitSelectionMode}
            variant="outlined"
            sx={{ flex: 1, minHeight: 42 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleOpenBulkDelete}
            disabled={!selectedCount}
            startIcon={<DeleteOutlineRounded />}
            variant="contained"
            sx={{
              bgcolor: 'error.main',
              flex: 1,
              minHeight: 42,
              '&:hover': { bgcolor: 'error.main' },
            }}
          >
            Delete
          </Button>
        </Box>
      )}

      <CreateTagDialog
        key={tagDialogKey}
        isOpen={isCreateDialogOpen}
        isSubmitting={isCreatingTag || isUpdatingTag}
        mode={editingTag ? 'edit' : 'create'}
        initialTag={editingTag}
        iconOptions={tagIconOptions}
        colorOptions={tagColorOptions}
        onClose={handleCloseTagDialog}
        onSubmit={handleSubmitTag}
      />

      <DeleteTagsDialog
        isOpen={isDeleteDialogOpen}
        count={pendingDeleteIds.length}
        tag={pendingDeleteTag}
        isDeleting={isDeletingTags}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};
