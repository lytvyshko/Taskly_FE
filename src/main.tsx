import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './auth/AuthProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GlobalLoader } from '@/components/GlobalLoader.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalLoader />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>,
);
