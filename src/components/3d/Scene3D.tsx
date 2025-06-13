"use client";

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';

// --- PERBAIKAN TIPE 'ANY' ---
// Memberikan tipe yang benar untuk props untuk lolos dari aturan ESLint
type StarfieldProps = React.ComponentProps<typeof Points>;

const Starfield = (props: StarfieldProps) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/**
 * Renders the main 3D background scene with multiple star layers for a parallax effect.
 */
export const Scene3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-neutral-900">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <Starfield />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}