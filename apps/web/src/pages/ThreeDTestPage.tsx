import { Typography, Box, Paper } from '@mui/material';
import ThreeDViewport from '../components/3d/ThreeDViewport';
import { Cylinder, Cone, Sphere } from '../components/3d/BasicShapes';

export default function ThreeDTestPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GeoCetak 3D Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Interactive 3D Shapes
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Hover over shapes to change color. Use mouse to orbit, zoom, and pan.
        </Typography>
        
        <ThreeDViewport height="500px">
          <Cylinder />
          <Cone />
          <Sphere />
        </ThreeDViewport>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Controls
        </Typography>
        <Typography variant="body2">
          • Left mouse: Rotate camera<br/>
          • Right mouse: Pan camera<br/>
          • Scroll: Zoom in/out<br/>
          • Hover: Interactive highlight
        </Typography>
      </Paper>
    </Box>
  );
}