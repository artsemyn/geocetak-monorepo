import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShapeProps {
  position?: [number, number, number];
  color?: string;
}

export function Cylinder({ position = [0, 0, 0], color = '#4A90E2' }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color={hovered ? '#FF6B6B' : color} />
    </mesh>
  );
}

export function Cone({ position = [3, 0, 0], color = '#FF6B6B' }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color={hovered ? '#4A90E2' : color} />
    </mesh>
  );
}

export function Sphere({ position = [-3, 0, 0], color = '#4CAF50' }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={hovered ? '#FF6B6B' : color} />
    </mesh>
  );
}