import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// 3D Bangladesh River Horizon with floating emerald lotus, water ripples and particles
function RiverMistParticles({ count = 40 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 4 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i] * delta * 0.6;
      if (array[i * 3 + 1] > 2.5) {
        array[i * 3 + 1] = -2;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#34d399"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Traditional Boat Silhouette in the Auth Background
function MiniatureAuthBoat() {
  const boatRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (!boatRef.current) return;
    const t = state.clock.getElapsedTime();
    boatRef.current.position.y = -1.2 + Math.sin(t * 1.5) * 0.08;
    boatRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
    boatRef.current.rotation.y = -0.3 + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={boatRef} position={[1.4, -1.2, -0.5]} scale={[0.85, 0.85, 0.85]}>
      {/* Water reflection ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[0.8, 1.8, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.25, 2.8, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Canopy */}
      <mesh position={[0, 0.35, -0.2]}>
        <cylinderGeometry args={[0.42, 0.42, 1.2, 12, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#064e3b" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Mast & Glowing Lantern */}
      <mesh position={[0, 0.9, 0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 1.6, 6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Lantern Light */}
      <mesh position={[0, 1.3, 0.45]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={2.0} />
      </mesh>
      <pointLight position={[0, 1.3, 0.45]} color="#fbbf24" intensity={2.5} distance={4} />
    </group>
  );
}

// 3D Luminous Emblem of Bangladesh
function FloatingLotusEmblem() {
  const emblemRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!emblemRef.current) return;
    const t = state.clock.getElapsedTime();
    emblemRef.current.position.y = 0.9 + Math.sin(t * 1.8) * 0.1;
    emblemRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={emblemRef} position={[-1.2, 0.9, 0]} scale={[0.7, 0.7, 0.7]}>
      {/* Central Gem */}
      <mesh rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Halo */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.1, 0.025, 12, 48]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export const Auth3DBackground: React.FC = () => {
  const hasWebGL = isWebGLAvailable();
  const reducedMotion = prefersReducedMotion();

  if (!hasWebGL || reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.4} color="#064e3b" />
        <directionalLight position={[4, 5, 3]} intensity={1.2} color="#10b981" />
        <pointLight position={[-3, 2, 2]} intensity={1.5} color="#34d399" />

        <RiverMistParticles count={45} />
        <MiniatureAuthBoat />
        <FloatingLotusEmblem />
      </Canvas>

      {/* Dark Navy / Emerald Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
    </div>
  );
};
