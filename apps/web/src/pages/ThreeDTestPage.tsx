import { Canvas } from '@react-three/fiber';
import { Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InteractiveCylinder, InteractiveCone, InteractiveSphere } from '../components/InteractiveShapes';
import CameraControls from '../components/CameraControls';

export default function ThreeDTestPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/')} style={{ marginBottom: '16px' }}>
        ← Back to Dashboard
      </Button>
      
      <Typography variant="h4" style={{ marginBottom: '24px' }}>
        Interactive 3D Shapes Test
      </Typography>

      <Paper style={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" style={{ marginBottom: '16px' }}>
          GeoCetak 3D Shapes
        </Typography>
        <Typography style={{ marginBottom: '16px' }}>
          <strong>Hover:</strong> Scale up and change color<br/>
          <strong>Click:</strong> Toggle fast rotation<br/>
          <strong>Drag:</strong> Orbit camera | <strong>Scroll:</strong> Zoom
        </Typography>
        
        <div style={{ 
          height: '500px', 
          width: '100%', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          cursor: 'grab',
          overflow: 'hidden'  // Add this to contain scroll events
        }}>
          <Canvas camera={{ position: [6, 4, 6] }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            <CameraControls />
            
            <InteractiveCylinder 
              position={[-2.5, 0, 0]} 
              color="#4A90E2" 
              hoverColor="#FF6B6B" 
            />
            <InteractiveCone 
              position={[0, 0, 0]} 
              color="#FF6B6B" 
              hoverColor="#4CAF50" 
            />
            <InteractiveSphere 
              position={[2.5, 0, 0]} 
              color="#4CAF50" 
              hoverColor="#4A90E2" 
            />
            
            {/* Grid */}
            <gridHelper args={[10, 10]} />
          </Canvas>
        </div>
      </Paper>

      <Paper style={{ padding: '24px' }}>
        <Typography variant="h6" style={{ marginBottom: '16px' }}>
          Debug Info
        </Typography>
        <Typography style={{ fontSize: '14px', color: '#666' }}>
          Open browser console (F12) to see click events logged.
          Each shape should log when clicked and show rotation speed change.
        </Typography>
      </Paper>
    </div>
  );
}