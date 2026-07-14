import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from '@/router/PublicRoute.tsx';
import { LoginPage } from '@/pages/Auth/LoginPage.tsx';
import { ForgotPasswordPage } from '@/pages/Auth/ForgotPasswordPage.tsx';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import { TasksPage } from '@/pages/Tasks/TasksPage.tsx';
import AppLayout from '@/router/AppLayout.tsx';
import { SignUpPage } from '@/pages/Auth/SignUpPage.tsx';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'sign-up',
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <TasksPage />,
          },
        ],
      },
    ],
  },
]);
