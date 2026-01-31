'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useReducedMotion } from 'framer-motion';

function RotatingCube({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current && !shouldReduceMotion) {
      // Reduce animation speed for performance or completely stop if reduced motion
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4f46e5" />
    </mesh>
  );
}

export default function ThreeScene() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent initial render on mobile

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance Guard:
  // 1. Don't render on mobile devices
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-30 pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        frameloop={shouldReduceMotion ? 'demand' : 'always'} // Stop loop if reduced motion
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RotatingCube shouldReduceMotion={!!shouldReduceMotion} />
      </Canvas>
    </div>
  );
}
