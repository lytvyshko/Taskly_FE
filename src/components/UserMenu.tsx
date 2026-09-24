import { useState } from 'react';
import {
  KeyboardArrowUpRounded,
  LogoutRounded,
  PersonOutlineRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useAuth } from '@/auth/useAuth.ts';
import { useLogout } from '@/hooks/useLogout.ts';
import { ProfileSettingsDialog } from '@/components/ProfileSettingsDialog.tsx';

const getInitials = (name?: string | null) =>
  name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

interface UserMenuProps {
  compact?: boolean;
}

export const UserMenu = ({ compact = false }: UserMenuProps) => {
  const { user } = useAuth();
  const { mutate: logoutMutation } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] =
    useState(false);

  const isOpen = Boolean(anchorEl);
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ position: 'relative', width: compact ? 'auto' : '100%' }}>
      <Box
        component="button"
        type="button"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label={compact ? 'Open user menu' : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        sx={{
          alignItems: 'center',
          bgcolor: isOpen ? 'primary.light' : 'background.paper',
          border: '1px solid',
          borderColor: isOpen ? 'primary.main' : 'divider',
          borderRadius: compact ? '50%' : 2,
          color: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          gap: compact ? 0 : 1.25,
          p: compact ? 0.25 : 1.25,
          textAlign: 'left',
          transition: 'border-color .2s, background-color .2s',
          width: compact ? 'auto' : '100%',
          '&:hover': {
            bgcolor: 'primary.light',
            borderColor: 'primary.main',
          },
        }}
      >
        <Avatar
          src={user?.avatar_url ?? undefined}
          alt={userName}
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.main',
            fontSize: 13,
            fontWeight: 700,
            height: compact ? 34 : 38,
            width: compact ? 34 : 38,
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        {!compact && (
          <>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 13,
                  fontWeight: 700,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userName}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: 10.5,
                  mt: 0.25,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userEmail}
              </Typography>
            </Box>
            <KeyboardArrowUpRounded
              sx={{
                color: 'grey.500',
                fontSize: 20,
                transform: isOpen ? 'none' : 'rotate(180deg)',
                transition: 'transform .2s',
              }}
            />
          </>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: compact ? 'bottom' : 'top',
          horizontal: compact ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: compact ? 'top' : 'bottom',
          horizontal: compact ? 'right' : 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              minWidth: 204,
              overflow: 'visible',
              transform: compact
                ? 'translateY(10px) !important'
                : 'translateY(-10px) !important',
              '&::before': {
                bgcolor: 'divider',
                ...(compact ? { top: -10 } : { bottom: -10 }),
                clipPath: compact
                  ? 'polygon(50% 0, 100% 100%, 0 100%)'
                  : 'polygon(0 0, 100% 0, 50% 100%)',
                content: '""',
                height: 10,
                left: compact ? 'auto' : '50%',
                position: 'absolute',
                right: compact ? 18 : 'auto',
                transform: compact ? 'none' : 'translateX(-50%)',
                width: 20,
              },
              '&::after': {
                bgcolor: 'background.paper',
                ...(compact ? { top: -8 } : { bottom: -8 }),
                clipPath: compact
                  ? 'polygon(50% 0, 100% 100%, 0 100%)'
                  : 'polygon(0 0, 100% 0, 50% 100%)',
                content: '""',
                height: 8,
                left: compact ? 'auto' : '50%',
                position: 'absolute',
                right: compact ? 20 : 'auto',
                transform: compact ? 'none' : 'translateX(-50%)',
                width: 16,
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsProfileSettingsOpen(true);
          }}
          sx={{ minHeight: 52, px: 1.75 }}
        >
          <ListItemIcon sx={{ color: 'text.primary', minWidth: 36 }}>
            <PersonOutlineRounded fontSize="small" />
          </ListItemIcon>
          <Typography
            sx={{ color: 'text.primary', fontSize: 14, fontWeight: 500 }}
          >
            Profile
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logoutMutation();
          }}
          sx={{ minHeight: 52, px: 1.75 }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 36 }}>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <Typography
            sx={{ color: 'error.main', fontSize: 14, fontWeight: 500 }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>

      <ProfileSettingsDialog
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />
    </Box>
  );
};
