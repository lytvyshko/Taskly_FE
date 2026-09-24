import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CloseRounded,
  LockOutlined,
  PhotoCameraOutlined,
  PersonOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '@/auth/useAuth.ts';
import { useChangePassword } from '@/hooks/useChangePassword.ts';
import { useUpdateProfile } from '@/hooks/useUpdateProfile.ts';
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '@/schemas/changePasswordSchema.ts';
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from '@/schemas/updateProfileSchema.ts';

type ProfileTab = 'profile' | 'password';

interface ProfileSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const getInitials = (name?: string | null) =>
  name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

const allowedAvatarTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxAvatarSize = 5 * 1024 * 1024;

export const ProfileSettingsDialog = ({
  isOpen,
  onClose,
}: ProfileSettingsDialogProps) => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const wasOpenRef = useRef(false);

  const { mutate: changePasswordMutation, isPending: isChangingPassword } =
    useChangePassword();
  const { mutate: updateProfileMutation, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const isPending = isChangingPassword || isUpdatingProfile;

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: '' },
  });

  const profileNameField = registerProfile('name');

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      const currentName = user?.name ?? '';

      setProfileName(currentName);
      resetProfile({ name: currentName });
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, resetProfile, user?.name]);

  useEffect(
    () => () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    },
    [avatarPreview],
  );

  const handleClose = () => {
    if (isPending) return;

    resetPassword();
    setProfileName(user?.name ?? '');
    resetProfile({ name: user?.name ?? '' });
    setActiveTab('profile');
    setShowPassword(false);
    setSelectedAvatar(undefined);
    setAvatarPreview(null);
    onClose();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!allowedAvatarTypes.has(file.type)) {
      toast.error('Avatar must be a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > maxAvatarSize) {
      toast.error('Avatar must be smaller than 5 MB');
      return;
    }

    setSelectedAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmitProfile = ({ name }: UpdateProfileFormData) => {
    updateProfileMutation(
      {
        name: name.trim(),
        avatar: selectedAvatar,
      },
      {
        onSuccess: (updatedUser) => {
          setUser(updatedUser);
          toast.success('Profile updated successfully');
          handleClose();
        },
        onError: () => {
          toast.error('Failed to update profile');
        },
      },
    );
  };

  const onSubmitPassword = ({
    currentPassword,
    newPassword,
  }: ChangePasswordFormData) => {
    changePasswordMutation(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success('Password changed successfully');
          handleClose();
        },
      },
    );
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeTab === 'profile') {
      void handleProfileSubmit(onSubmitProfile)(event);
      return;
    }

    void handlePasswordSubmit(onSubmitPassword)(event);
  };

  const handleTabChange = (_: unknown, value: ProfileTab) => {
    setActiveTab(value);
  };

  const passwordFieldProps = {
    type: showPassword ? 'text' : 'password',
    fullWidth: true,
    size: 'small' as const,
    slotProps: {
      input: {
        sx: {
          '& input': {
            py: 1.35,
          },
        },
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlined sx={{ color: 'grey.500', fontSize: 20 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <VisibilityOutlined />
              )}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  };

  const profileAvatar = avatarPreview ?? user?.avatar_url ?? undefined;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
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
        onSubmit={handleFormSubmit}
        autoComplete="off"
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
          Profile settings
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            disabled={isPending}
            sx={{ color: 'grey.500', ml: 'auto' }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>

        <Tabs
          aria-label="Profile settings"
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mx: { xs: 2.5, sm: 4 },
            minHeight: 44,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              bgcolor: 'primary.main',
              height: 2,
            },
          }}
        >
          <Tab
            disableRipple
            label="Profile"
            value="profile"
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              fontWeight: 500,
              minHeight: 44,
              textTransform: 'none',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          />
          <Tab
            disableRipple
            label="Password"
            value="password"
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              fontWeight: 500,
              minHeight: 44,
              textTransform: 'none',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          />
        </Tabs>

        <DialogContent
          key={activeTab}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.75,
            minHeight: { xs: 250, sm: 270 },
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
          }}
        >
          {activeTab === 'profile' ? (
            <>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: { xs: 1.5, sm: 2 },
                  mb: 0.5,
                }}
              >
                <Avatar
                  src={profileAvatar}
                  alt={user?.name ?? 'User avatar'}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    fontSize: 24,
                    fontWeight: 700,
                    height: { xs: 76, sm: 88 },
                    width: { xs: 76, sm: 88 },
                  }}
                >
                  {getInitials(user?.name)}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      color: 'text.primary',
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    Profile photo
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: 13,
                      mt: 0.5,
                    }}
                  >
                    JPG, PNG or WebP · max 5 MB
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    startIcon={<PhotoCameraOutlined />}
                    disabled={isPending}
                    sx={{ mt: 1.25 }}
                  >
                    Choose photo
                    <input
                      ref={avatarInputRef}
                      hidden
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatarChange}
                    />
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography
                  component="label"
                  htmlFor="profile-name"
                  sx={{
                    color: 'text.primary',
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 700,
                    mb: 0.75,
                  }}
                >
                  Name
                </Typography>
                <TextField
                  id="profile-name"
                  placeholder="Enter your name"
                  {...profileNameField}
                  value={profileName}
                  onChange={(event) => {
                    void profileNameField.onChange(event);
                    setProfileName(event.target.value);
                  }}
                  error={Boolean(profileErrors.name)}
                  helperText={profileErrors.name?.message || ' '}
                  fullWidth
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineRounded
                            sx={{ color: 'grey.500', fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    },
                    htmlInput: {
                      autoComplete: 'name',
                    },
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Typography
                  component="label"
                  htmlFor="current-password"
                  sx={{
                    color: 'text.primary',
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 700,
                    mb: 0.75,
                  }}
                >
                  Current password
                </Typography>
                <TextField
                  id="current-password"
                  placeholder="Enter current password"
                  {...registerPassword('currentPassword')}
                  error={Boolean(passwordErrors.currentPassword)}
                  helperText={passwordErrors.currentPassword?.message || ' '}
                  {...passwordFieldProps}
                  slotProps={{
                    ...passwordFieldProps.slotProps,
                    htmlInput: {
                      autoComplete: 'current-password',
                      name: 'currentPassword',
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  component="label"
                  htmlFor="new-password"
                  sx={{
                    color: 'text.primary',
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 700,
                    mb: 0.75,
                  }}
                >
                  New password
                </Typography>
                <TextField
                  id="new-password"
                  placeholder="Enter new password"
                  {...registerPassword('newPassword')}
                  error={Boolean(passwordErrors.newPassword)}
                  helperText={
                    passwordErrors.newPassword?.message ??
                    'At least 8 characters with a number or symbol'
                  }
                  {...passwordFieldProps}
                  slotProps={{
                    ...passwordFieldProps.slotProps,
                    htmlInput: {
                      autoComplete: 'new-password',
                      name: 'newPassword',
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  component="label"
                  htmlFor="confirm-password"
                  sx={{
                    color: 'text.primary',
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 700,
                    mb: 0.75,
                  }}
                >
                  Confirm password
                </Typography>
                <TextField
                  id="confirm-password"
                  placeholder="Repeat new password"
                  {...registerPassword('confirmPassword')}
                  error={Boolean(passwordErrors.confirmPassword)}
                  helperText={passwordErrors.confirmPassword?.message || ' '}
                  {...passwordFieldProps}
                  slotProps={{
                    ...passwordFieldProps.slotProps,
                    htmlInput: {
                      autoComplete: 'new-password',
                      name: 'confirmPassword',
                    },
                  }}
                />
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            gap: 1.25,
            px: { xs: 2.5, sm: 4 },
            pb: { xs: 2.5, sm: 3.5 },
            pt: 0,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isPending}
            sx={{ flex: 1, minHeight: 42 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            sx={{ flex: 1, minHeight: 42 }}
          >
            {activeTab === 'profile' ? 'Save changes' : 'Update password'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
