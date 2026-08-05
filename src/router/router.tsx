import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from '@/router/PublicRoute.tsx';
import { LoginPage } from '@/pages/Auth/LoginPage.tsx';
import { ForgotPasswordPage } from '@/pages/Auth/ForgotPasswordPage.tsx';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import { TasksPage } from '@/pages/Tasks/TasksPage.tsx';
import AppLayout from '@/router/AppLayout.tsx';
import { SignUpPage } from '@/pages/Auth/SignUpPage.tsx';
import { CheckEmailPage } from '@/pages/Auth/CheckEmailPage.tsx';
import { EmailVerifiedPage } from '@/pages/Auth/EmailVerifiedPage.tsx';
import { ResetPasswordPage } from '@/pages/Auth/ResetPasswordPage.tsx';
import { PasswordUpdatedPage } from '@/pages/Auth/PasswordUpdatedPage.tsx';

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
          {
            path: 'check-email',
            element: <CheckEmailPage />,
          },
          {
            path: 'verify-email',
            element: <EmailVerifiedPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
          {
            path: 'password-reset-success',
            element: <PasswordUpdatedPage />,
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
