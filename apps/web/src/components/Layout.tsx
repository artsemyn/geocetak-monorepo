import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@geocetak/shared-logic';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            style={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            GeoCetak
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button color="inherit" onClick={() => navigate('/3d-test')}>
              3D Test
            </Button>
            <Typography variant="body1">
              {user?.name || user?.email}
            </Typography>
            <Avatar style={{ width: 32, height: 32 }}>
              {user?.name?.[0] || user?.email?.[0]}
            </Avatar>
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <main style={{ padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}