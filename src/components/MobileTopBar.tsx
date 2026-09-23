import { CheckRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu.tsx';


interface Props {
  page: 'tags' | 'tasks';
  searchInput: string;
  onSearchChange: (value: string) => void;
}

export const MobileTopBar = ({ page, searchInput, onSearchChange }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      component="header"
      sx={{
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: { xs: 'flex', md: 'none' },
        gap: 1.25,
        height: 68,
        px: 2,
        width: '100%',
      }}
    >
      <ButtonBase
        onClick={() => navigate('/?tab=planned')}
        sx={{
          alignItems: 'center',
          borderRadius: 1.25,
          display: 'flex',
          flexShrink: 0,
          gap: 0.75,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'primary.main',
            borderRadius: 1.25,
            color: 'common.white',
            display: 'flex',
            height: 28,
            justifyContent: 'center',
            width: 28,
          }}
        >
          <CheckRounded sx={{ fontSize: 19 }} />
        </Box>
        <Typography
          sx={{ color: 'text.primary', fontSize: 17, fontWeight: 800 }}
        >
          Taskly
        </Typography>
      </ButtonBase>

      {page === 'tasks' && (
        <TextField
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          hiddenLabel
          placeholder="Search tasks..."
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: 'grey.500', fontSize: 19 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.default',
              borderRadius: 2,
              fontSize: 12,
              height: 38,
            },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
            minWidth: 0,
          }}
        />
      )}

      <Box sx={{ marginLeft: 'auto' }}>
        <UserMenu compact />
      </Box>
    </Box>
  );
};
