import { Paper, Typography, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Module } from '@geocetak/shared-logic';

interface ModuleCardProps {
  module: Module;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
}

const getModuleIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'tabung': return '🥤';
    case 'kerucut': return '🍦';
    case 'bola': return '⚽';
    default: return '📐';
  }
};

const getModuleColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'tabung': return '#4A90E2';
    case 'kerucut': return '#FF6B6B';
    case 'bola': return '#4CAF50';
    default: return '#9E9E9E';
  }
};

export default function ModuleCard({ 
  module, 
  progress = 0, 
  completedLessons = 0, 
  totalLessons = 0 
}: ModuleCardProps) {
  const navigate = useNavigate();

  const handleStartModule = () => {
    navigate(`/modules/${module.id}`);
  };

  return (
    <Paper style={{ 
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h2" style={{ marginRight: '16px' }}>
          {getModuleIcon(module.name)}
        </Typography>
        <div>
          <Typography variant="h5" style={{ marginBottom: '8px' }}>
            {module.name}
          </Typography>
          <div style={{
            backgroundColor: getModuleColor(module.name),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'inline-block'
          }}>
            Modul {module.order_index}
          </div>
        </div>
      </div>
      
      <Typography variant="body2" style={{ 
        color: '#666', 
        marginBottom: '16px',
        flexGrow: 1
      }}>
        {module.description}
      </Typography>
      
      {totalLessons > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '8px' 
          }}>
            <Typography variant="body2">
              Progress: {completedLessons}/{totalLessons} pelajaran
            </Typography>
            <Typography variant="body2" style={{ color: getModuleColor(module.name) }}>
              {Math.round(progress)}%
            </Typography>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            style={{ 
              height: '8px', 
              borderRadius: '4px',
              backgroundColor: '#e0e0e0'
            }}
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: getModuleColor(module.name)
              }
            }}
          />
        </div>
      )}
      
      <Button 
        variant="contained" 
        fullWidth
        onClick={handleStartModule}
        style={{ 
          backgroundColor: getModuleColor(module.name),
          color: 'white'
        }}
      >
        {progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
      </Button>
    </Paper>
  );
}