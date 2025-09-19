import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  hoverColor: string;
}

export function InteractiveCylinder({ position, color, hoverColor }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (clicked ? 3 : 0.5);
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(targetScale);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(!clicked);
    console.log('Cylinder clicked!', !clicked);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={handleClick}
    >
      <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />
      <meshStandardMaterial color={hovered ? hoverColor : color} />
    </mesh>
  );
}

export function InteractiveCone({ position, color, hoverColor }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (clicked ? 3 : 0.5);
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(targetScale);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(!clicked);
    console.log('Cone clicked!', !clicked);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={handleClick}
    >
      <coneGeometry args={[0.8, 1.5, 32]} />
      <meshStandardMaterial color={hovered ? hoverColor : color} />
    </mesh>
  );
}

export function InteractiveSphere({ position, color, hoverColor }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (clicked ? 3 : 0.3);
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(targetScale);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(!clicked);
    console.log('Sphere clicked!', !clicked);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color={hovered ? hoverColor : color} />
    </mesh>
  );
}