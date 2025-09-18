import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface ThreeDViewportProps {
  children?: ReactNode;
  height?: string;
}

export default function ThreeDViewport({ children, height = '400px' }: ThreeDViewportProps) {
  return (
    <Box sx={{ height, width: '100%', border: '1px solid #ccc', borderRadius: 1 }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: '#f5f5f5' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Grid helper */}
        <Grid args={[10, 10]} />
        
        {/* Camera controls */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        {/* 3D content */}
        {children}
        
        {/* Navigation helper */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        </GizmoHelper>
      </Canvas>
    </Box>
  );
}