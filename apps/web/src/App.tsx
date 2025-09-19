import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@geocetak/shared-logic';
import { CircularProgress } from '@mui/material';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ThreeDTestPage from './pages/ThreeDTestPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import Layout from './components/Layout';

function App() {
  const { user, loading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/3d-test" element={<ThreeDTestPage />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/lessons/:lessonId" element={<div>Lesson View (Coming Soon)</div>} />
      </Routes>
    </Layout>
  );
}

export default App;