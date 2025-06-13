// src/components/3d/Scene3D.tsx (VERSI FINAL TERAKHIR)
"use client";

import { useState, useRef, ComponentProps } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';

export default function Scene3D() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <Starfield />
      </Canvas>
    </div>
  );
}

// --- PERBAIKAN UTAMA DI SINI ---
// Kita "mengeluarkan" (destructure) `positions` dari props untuk menghindari konflik.
function Starfield({...props}: ComponentProps<typeof Points>) { 
  const ref = useRef<THREE.Points>(null!);
  
  // Generate sphere positions
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}