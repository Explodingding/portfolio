"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Vector3, Mesh } from 'three';

// Animated sphere component with distortion effect
const AnimatedSphere = () => {
  const sphereRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere
      ref={sphereRef}
      args={[1, 100, 100]} // Radius, width segments, height segments
      position={new Vector3(0, 0, 0)}
    >
      <MeshDistortMaterial
        color="#f0141e"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.5}
        metalness={0.2}
      />
    </Sphere>
  );
};

interface Scene3DProps {
  className?: string;
}

// Main 3D scene component
export const Scene3D = ({ className = '' }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}; 