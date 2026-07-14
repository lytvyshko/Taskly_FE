import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Container
      maxWidth={false}
      sx={{
        px: {
          xs: 2.5, // 20px mobile
          md: 5, // 40px desktop
        },
      }}
    >
      <Outlet />
    </Container>
  );
}
