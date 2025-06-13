"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Image, Text, RoundedBox } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three'; 
// --- PERBAIKAN IMPORT ---
// Hooks diimpor dari 'framer-motion', motion component dari 'framer-motion-3d'
import { useMotionValue, useSpring } from 'framer-motion'; 
import { motion as motion3d } from 'framer-motion-3d';

import type { Project } from '@/lib/types';

// Internal component to handle the 3D content and interaction logic
const Card3DContent = ({ project }: { project: Project }) => {
  const meshRef = useRef<THREE.Group>(null!);
  
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springX = useSpring(motionX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(motionY, { stiffness: 300, damping: 30, mass: 0.5 });
  
  // --- PERBAIKAN TIPE 'ANY' ---
  // Memberikan tipe yang benar untuk mouse event
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    motionX.set(x * 0.05);
    motionY.set(y * -0.05); // Invert Y for natural feel
  };

  const handleMouseLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <div 
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <motion3d.group ref={meshRef} rotation-x={springY} rotation-y={springX}>
          <RoundedBox args={[4, 5, 0.1]} radius={0.1}>
            <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.2} />
          </RoundedBox>
          <Image url={project.imageUrl} alt={project.title} scale={[3.6, 2.2, 1]} position={[0, 1.3, 0.1]} />
          <Text position={[0, -0.3, 0.1]} color="white" fontSize={0.25} maxWidth={3.5} textAlign="center">
            {project.title}
          </Text>
          <Text position={[0, -0.7, 0.1]} color="#9CA3AF" fontSize={0.14} maxWidth={3.2} textAlign="center" anchorY="top" lineHeight={1.4}>
            {project.description}
          </Text>
        </motion3d.group>
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

/**
 * Renders a 3D interactive card for a project with a tilt effect on hover.
 */
export const ProjectCard3D = ({ project }: { project: Project }) => {
  return (
    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="block relative group">
       <div 
         className="absolute inset-0 bg-gray-800/50 border border-gray-700 rounded-xl transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
       ></div>
       <div 
         className="relative w-full h-[400px] md:h-[500px]"
         data-cursor-hover="true"
        >
         <Card3DContent project={project} />
       </div>
    </a>
  );
};