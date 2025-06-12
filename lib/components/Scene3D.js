import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sphere } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedSphere() {
    const meshRef = useRef();
    useFrame((state, delta) => {
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