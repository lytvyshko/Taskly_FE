import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from '@/theme/components.ts';

export const theme = createTheme({
  palette,
  typography,
  components,
});
