import { useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckRounded,
  InboxOutlined,
  SellOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { UserMenu } from '@/components/UserMenu.tsx';

type NavigationItem = {
  label: string;
  mobileLabel: string;
  icon: ReactNode;
  path?: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: 'My Tasks',
    mobileLabel: 'Tasks',
    icon: <InboxOutlined />,
    path: '/',
  },
  {
    label: 'Tags',
    mobileLabel: 'Tags',
    icon: <SellOutlined />,
    path: '/tags',
  },
  {
    label: 'Settings',
    mobileLabel: 'Settings',
    icon: <SettingsOutlined />,
  },
];

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('My Tasks');

  const handleNavigation = (item: NavigationItem) => {
    setActiveItem(item.label);

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <Box
        component="aside"
        aria-label="Main navigation"
        sx={{
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderRightColor: 'divider',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          flexShrink: 0,
          px: 2.25,
          py: 3,
          width: 248,
        }}
      >
        <ButtonBase
          onClick={() => navigate('/?tab=planned')}
          sx={{
            alignItems: 'center',
            borderRadius: 1.5,
            display: 'flex',
            gap: 1.25,
            mb: 4,
            px: 1,
            width: 'fit-content',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'primary.main',
              borderRadius: 1.5,
              color: 'common.white',
              display: 'flex',
              height: 32,
              justifyContent: 'center',
              width: 32,
            }}
          >
            <CheckRounded />
          </Box>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            Taskly
          </Typography>
        </ButtonBase>

        <Typography
          sx={{
            color: 'grey.400',
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1.25,
            px: 1,
            textTransform: 'uppercase',
          }}
        >
          Workspace
        </Typography>

        <List disablePadding>
          {navigationItems.map((item) => {
            const isActive = item.path
              ? location.pathname === item.path
              : activeItem === item.label;

            return (
              <ListItem disablePadding key={item.label} sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item)}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    minHeight: 44,
                    px: 1.25,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: 36,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: 'inherit',
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <UserMenu />
      </Box>

      <Box
        component="nav"
        aria-label="Mobile navigation"
        sx={{
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderTopColor: 'divider',
          bottom: 0,
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-around',
          left: 0,
          minHeight: 68,
          px: 0.75,
          position: 'fixed',
          right: 0,
          zIndex: 10,
        }}
      >
        {navigationItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path
            : activeItem === item.label;

          return (
            <IconButton
              key={item.label}
              onClick={() => handleNavigation(item)}
              aria-label={item.mobileLabel}
              sx={{
                alignItems: 'center',
                borderRadius: 2,
                color: isActive ? 'primary.main' : 'grey.500',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
                minWidth: 64,
                py: 0.75,
              }}
            >
              <Box sx={{ display: 'flex' }}>{item.icon}</Box>
              <Typography
                sx={{
                  color: 'inherit',
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: 1.2,
                }}
              >
                {item.mobileLabel}
              </Typography>
            </IconButton>
          );
        })}
      </Box>
    </>
  );
};
