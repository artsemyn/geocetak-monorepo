import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function CameraControls() {
  const { camera, gl } = useThree();
  const isMouseDown = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cameraTarget = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    camera.lookAt(cameraTarget.current);
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown.current = true;
      mousePos.current = { x: event.clientX, y: event.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      canvas.style.cursor = 'grab';
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return;

      const deltaX = event.clientX - mousePos.current.x;
      const deltaY = event.clientY - mousePos.current.y;

      // Rotate camera around the target
      const spherical = {
        radius: camera.position.length(),
        theta: Math.atan2(camera.position.x, camera.position.z) - deltaX * 0.01,
        phi: Math.acos(camera.position.y / camera.position.length()) + deltaY * 0.01
      };

      // Limit phi to avoid flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      camera.position.set(
        spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
        spherical.radius * Math.cos(spherical.phi),
        spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
      );

      mousePos.current = { x: event.clientX, y: event.clientY };
    };

    const handleWheel = (event: WheelEvent) => {
      // Prevent page scrolling
      event.preventDefault();
      event.stopPropagation();

      const distance = camera.position.length();
      const newDistance = distance + event.deltaY * 0.01;
      const clampedDistance = Math.max(2, Math.min(20, newDistance));
      
      camera.position.normalize().multiplyScalar(clampedDistance);
    };

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup function
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [camera, gl]);

  return null;
}