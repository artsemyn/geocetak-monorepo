import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import { useModuleStore } from '@geocetak/shared-logic';

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { currentModule, currentLessons, loading, setCurrentModule } = useModuleStore();

  useEffect(() => {
    if (moduleId) {
      setCurrentModule(moduleId);
    }
  }, [moduleId, setCurrentModule]);

  const handleBack = () => {
    navigate('/');
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`);
  };

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

  if (!currentModule) {
    return (
      <div>
        <Typography variant="h5" color="error">
          Modul tidak ditemukan
        </Typography>
        <Button onClick={handleBack}>
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Button onClick={handleBack} style={{ marginBottom: '16px' }}>
        ← Kembali ke Dashboard
      </Button>

      {/* Module Header */}
      <Typography variant="h3" style={{ marginBottom: '16px' }}>
        {currentModule.name}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '32px', color: '#666' }}>
        {currentModule.description}
      </Typography>

      {/* Lessons List */}
      <Paper style={{ padding: '24px' }}>
        <Typography variant="h5" style={{ marginBottom: '24px' }}>
          Daftar Pelajaran
        </Typography>
        
        {currentLessons.length === 0 ? (
          <Typography color="textSecondary">
            Belum ada pelajaran tersedia untuk modul ini.
          </Typography>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentLessons.map((lesson, index) => (
              <Paper 
                key={lesson.id}
                style={{ 
                  padding: '16px',
                  border: '1px solid #e0e0e0',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ marginBottom: '8px' }}>
                      {index + 1}. {lesson.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {lesson.description}
                    </Typography>
                    <div style={{ 
                      marginTop: '8px',
                      padding: '4px 8px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                      display: 'inline-block',
                      fontSize: '12px'
                    }}>
                      {lesson.content_type}
                    </div>
                  </div>
                  
                  <Button
                    variant="contained"
                    onClick={() => handleStartLesson(lesson.id)}
                    style={{ marginLeft: '16px' }}
                  >
                    Mulai
                  </Button>
                </div>
              </Paper>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
}