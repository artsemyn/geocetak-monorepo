import { useEffect } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useModuleStore, useAuthStore } from '@geocetak/shared-logic';
import ModuleCard from '../components/ModuleCard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { modules, loading, fetchModules, getUserProgress } = useModuleStore();

  useEffect(() => {
    fetchModules();
    if (user) {
      getUserProgress(user.id);
    }
  }, [fetchModules, getUserProgress, user]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: '16px' }}>
        Selamat Datang di GeoCetak!
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '32px', color: '#666' }}>
        Platform pembelajaran geometri 3D interaktif
      </Typography>

      {/* Development Tools */}
      <div style={{ 
        marginBottom: '32px', 
        padding: '16px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <Typography variant="h6" style={{ marginBottom: '16px' }}>
          Development Tools
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/3d-test')}
          style={{ marginRight: '16px' }}
        >
          Test 3D Rendering
        </Button>
      </div>

      {/* Learning Modules */}
      <Typography variant="h4" style={{ marginBottom: '16px' }}>
        Modul Pembelajaran
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '24px', color: '#666' }}>
        Pilih modul geometri untuk memulai pembelajaran interaktif
      </Typography>
      
      {modules.length === 0 ? (
        <div style={{ 
          padding: '24px', 
          textAlign: 'center', 
          border: '1px solid #ddd', 
          borderRadius: '8px' 
        }}>
          <Typography color="textSecondary">
            Belum ada modul tersedia. Pastikan database sudah terisi dengan data modul.
          </Typography>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {modules.map((module) => (
            <ModuleCard 
              key={module.id}
              module={module}
              progress={0} // TODO: Calculate from user progress
              completedLessons={0} // TODO: Calculate from user progress
              totalLessons={5} // TODO: Get from lessons count
            />
          ))}
        </div>
      )}
    </div>
  );
}