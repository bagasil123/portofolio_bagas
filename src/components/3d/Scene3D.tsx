// src/components/3d/Scene3D.tsx

"use client"; // <-- TAMBAHKAN BARIS INI DI PALING ATAS

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere } from '@react-three/drei';
import { Mesh } from 'three'; // Kita impor tipe 'Mesh' untuk TypeScript

function AnimatedSphere() {
    // Memberikan tipe pada ref untuk keamanan dan auto-completion
    const meshRef = useRef<Mesh>(null!);

    useFrame((state, delta) => {
        // Rotasi animasi
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <Sphere ref={meshRef} args={[1, 32, 32]}>
            <meshStandardMaterial color="royalblue" wireframe />
        </Sphere>
    )
}

export default function Scene3D() {
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Canvas>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} />
                <Stars />
                <AnimatedSphere />
            </Canvas>
        </div>
    )
}