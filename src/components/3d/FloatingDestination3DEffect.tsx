import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// 3D Floating Destination Badge: Realistic 3D curved pedestal + ambient glowing ring + spinning Bangladesh compass rose
function FloatingDestinationPedestal() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerCompassRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating bobbing motion
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
    if (innerCompassRef.current) {
      innerCompassRef.current.rotation.y -= delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Luminous Emerald Aura Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.1, 32]} />
        <meshStandardMaterial
          color="#064e3b"
          emissive="#10b981"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Concentric Orbiting Energy Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2.3, 0.2, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[2.1, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 3. 3D Beveled Emerald Core Beacon */}
      <group ref={innerCompassRef} position={[0, 0.35, 0]}>
        {/* Floating Diamond Octahedron */}
        <mesh position={[0, 0.3, 0]} rotation={[0.4, 0.4, 0.4]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.85}
            wireframe={false}
          />
        </mesh>

        {/* 4 Cardinal Beacons */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.25, 0.1, Math.sin(angle) * 1.25]}
            rotation={[0, angle, 0]}
          >
            <coneGeometry args={[0.12, 0.45, 8]} />
            <meshStandardMaterial
              color="#6ee7b7"
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export const FloatingDestination3DEffect: React.FC = () => {
  const hasWebGL = isWebGLAvailable();
  const reducedMotion = prefersReducedMotion();

  if (!hasWebGL || reducedMotion) {
    return null;
  }

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 1.8, 4.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#6ee7b7" />
        <pointLight position={[-2, -1, 2]} intensity={1.8} color="#10b981" />
        <FloatingDestinationPedestal />
      </Canvas>
    </div>
  );
};
