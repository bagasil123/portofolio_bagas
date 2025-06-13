"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/lib/types';

/**
 * Renders a 3D card for a skill, featuring a floating logo.
 */
export const SkillCard3D = ({ skill }: { skill: Skill }) => {
  return (
    <div 
        className="w-full h-32 md:h-40 bg-gray-800/50 rounded-xl backdrop-blur-md border border-gray-700 transition-all duration-300 hover:bg-gray-700/70 hover:border-orange-500 relative" 
        data-cursor-hover="true"
    >
        <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Float speed={5} rotationIntensity={1} floatIntensity={1}>
            <Image
              url={skill.logoUrl}
              alt={skill.name}
              scale={1.5}
              transparent
              opacity={0.9}
            >
               <meshStandardMaterial side={THREE.DoubleSide} transparent />
            </Image>
          </Float>
        </Canvas>
        <p className="absolute bottom-2 left-0 right-0 text-center font-medium text-gray-300 text-sm pointer-events-none">
          {skill.name}
        </p>
    </div>
  );
};
