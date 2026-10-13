import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// Traditional Bangladeshi Wooden Boat (দেশী নৌকা)
function TraditionalBoat({ position = [0, 0, 0] as [number, number, number] }) {
  const boatRef = useRef<THREE.Group>(null);
  const sailRef = useRef<THREE.Mesh>(null);

  // Bobbing and rolling animation in water
  useFrame(state => {
    if (!boatRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle water sway
    boatRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.08;
    boatRef.current.rotation.z = Math.sin(t * 1.4) * 0.04;
    boatRef.current.rotation.x = Math.cos(t * 1.2) * 0.03;
    boatRef.current.position.x = position[0] + Math.sin(t * 0.5) * 0.15;

    // Wind billowing on the cloth sail
    if (sailRef.current) {
      sailRef.current.rotation.y = Math.sin(t * 2.2) * 0.06;
    }
  });

  return (
    <group ref={boatRef} position={position} scale={[1.3, 1.3, 1.3]}>
      {/* Hull: Wooden Boat Body */}
      {/* Keel / Main Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.4, 4.2, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#3e2716" roughness={0.7} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Pointed Bow (Front) */}
      <mesh position={[0, 0.2, 2.3]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <coneGeometry args={[0.55, 1.2, 12, 1, true]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Curved Stern (Back) */}
      <mesh position={[0, 0.35, -2.3]} rotation={[-Math.PI / 5, 0, 0]} castShadow>
        <coneGeometry args={[0.55, 1.3, 12, 1, true]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Interior Wood Deck Planks */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.1, 3.8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} />
      </mesh>

      {/* Traditional Bamboo Canopy (ছই / Choi) */}
      <mesh position={[0, 0.55, -0.3]} castShadow>
        <cylinderGeometry args={[0.65, 0.65, 1.8, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#a1887f" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Canopy Ribs */}
      {[-0.8, -0.3, 0.2, 0.7].map((z, idx) => (
        <mesh key={idx} position={[0, 0.55, z]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.66, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#4e342e" roughness={0.6} />
        </mesh>
      ))}

      {/* Wooden Mast (মাস্তুল) */}
      <mesh position={[0, 1.8, 0.8]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 3.2, 8]} />
        <meshStandardMaterial color="#4e342e" roughness={0.7} />
      </mesh>

      {/* Cross Spar */}
      <mesh position={[0, 3.1, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.2, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.7} />
      </mesh>

      {/* Traditional Square/Trapezoid Cloth Sail (পাল) */}
      <mesh ref={sailRef} position={[0, 2.2, 0.85]} rotation={[0, 0.1, 0]} castShadow>
        <planeGeometry args={[2.0, 1.8, 8, 8]} />
        <meshStandardMaterial
          color="#fdfbf7"
          roughness={0.9}
          metalness={0.05}
          side={THREE.DoubleSide}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Traditional Wooden Oar (বৈঠা) */}
      <group position={[0.6, 0.3, 1.2]} rotation={[0.4, 0.3, -0.6]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
          <meshStandardMaterial color="#3e2716" />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.16, 0.45, 0.02]} />
          <meshStandardMaterial color="#5c381e" />
        </mesh>
      </group>

      {/* Warm Brass Lantern on Bow with Glowing Point Light */}
      <group position={[0, 0.85, 2.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.18, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
        </mesh>
        <pointLight color="#ffab40" intensity={1.8} distance={5} decay={2} />
      </group>
    </group>
  );
}

// Procedural Dynamic River Water with Waves
function ProceduralRiverWater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  // Store original grid vertices
  const originalPositions = useMemo(() => {
    const geom = new THREE.PlaneGeometry(70, 70, 64, 64);
    return geom.attributes.position.array.slice();
  }, []);

  useFrame(state => {
    if (!geomRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = geomRef.current.attributes.position;
    const array = pos.array as Float32Array;

    for (let i = 0; i < pos.count; i++) {
      const u = originalPositions[i * 3];
      const v = originalPositions[i * 3 + 1];

      // Undulating gentle river wave formula
      const wave =
        Math.sin(u * 0.35 + t * 1.5) * 0.18 +
        Math.cos(v * 0.28 + t * 1.2) * 0.14 +
        Math.sin((u + v) * 0.2 + t * 2.0) * 0.08;

      array[i * 3 + 2] = wave;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
      <planeGeometry ref={geomRef} args={[70, 70, 64, 64]} />
      <meshStandardMaterial
        color="#0b3036"
        roughness={0.12}
        metalness={0.88}
        flatShading={false}
      />
    </mesh>
  );
}

// Lush Riverbanks with Palm Silhouettes
function Riverbanks() {
  return (
    <group>
      {/* Left Lush Bank */}
      <group position={[-16, -0.1, -5]}>
        {/* Terrain Hills */}
        <mesh receiveShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[14, 1.5, 55]} />
          <meshStandardMaterial color="#1b4332" roughness={0.9} />
        </mesh>
        <mesh receiveShadow position={[2, 0.9, -6]}>
          <boxGeometry args={[10, 1.8, 35]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.85} />
        </mesh>

        {/* Clustered Palm & Mangrove Trees */}
        {[-18, -12, -7, -2, 4, 10, 16].map((z, idx) => (
          <group key={idx} position={[Math.sin(idx) * 2, 1.2, z]}>
            {/* Trunk */}
            <mesh position={[0, 1.8, 0]}>
              <cylinderGeometry args={[0.1, 0.18, 3.6, 6]} />
              <meshStandardMaterial color="#3e2723" roughness={0.9} />
            </mesh>
            {/* Canopy */}
            <mesh position={[0, 3.7, 0]}>
              <sphereGeometry args={[1.3, 8, 8]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#1b4332' : '#2d6a4f'} roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right Lush Bank */}
      <group position={[16, -0.1, -5]}>
        <mesh receiveShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[14, 1.5, 55]} />
          <meshStandardMaterial color="#1b4332" roughness={0.9} />
        </mesh>
        <mesh receiveShadow position={[-2, 0.9, -4]}>
          <boxGeometry args={[10, 1.8, 35]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.85} />
        </mesh>

        {/* Trees */}
        {[-20, -14, -8, -1, 6, 12, 18].map((z, idx) => (
          <group key={idx} position={[-Math.cos(idx) * 2, 1.2, z]}>
            <mesh position={[0, 1.9, 0]}>
              <cylinderGeometry args={[0.1, 0.18, 3.8, 6]} />
              <meshStandardMaterial color="#3e2723" roughness={0.9} />
            </mesh>
            <mesh position={[0, 3.9, 0]}>
              <sphereGeometry args={[1.4, 8, 8]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#2d6a4f' : '#40916c'} roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// Glowing Sunset Orb & Golden Horizon Reflection
function GoldenSunsetSun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(state => {
    const t = state.clock.getElapsedTime();
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 4.5, -34]}>
      {/* Sun Orb */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="#ff9800" />
      </mesh>

      {/* Sun Atmospheric Corona Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshBasicMaterial color="#ffb74d" transparent opacity={0.35} />
      </mesh>

      {/* Outer Golden Aura */}
      <mesh>
        <sphereGeometry args={[8.5, 24, 24]} />
        <meshBasicMaterial color="#ffcc80" transparent opacity={0.12} />
      </mesh>

      {/* Sunlight Beam Directional Source */}
      <directionalLight
        color="#ffb300"
        intensity={3.2}
        position={[0, 6, 10]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
}

// Floating River Fireflies / Golden Mists
function RiverFireflies({ count = 90 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = Math.random() * 4.5 + 0.2;
      const z = (Math.random() - 0.5) * 45;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }
    return [pos, init];
  }, [count]);

  useFrame(state => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx] = initialPositions[idx] + Math.sin(t * 0.8 + i) * 0.6;
      arr[idx + 1] = initialPositions[idx + 1] + Math.sin(t * 1.4 + i * 2) * 0.4;
      arr[idx + 2] = initialPositions[idx + 2] + Math.cos(t * 0.7 + i) * 0.6;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#81c784"
        size={0.16}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive Parallax Camera Controller
function CameraParallax({ mousePos }: { mousePos: { x: number; y: number } }) {
  useFrame(state => {
    // Smooth lerp camera position for parallax
    const targetX = mousePos.x * 2.2;
    const targetY = 3.6 + mousePos.y * 0.8;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 1.8, -10);
  });

  return null;
}

interface RiverSunset3DHeroProps {
  onCanvasReady?: () => void;
}

export const RiverSunset3DHero: React.FC<RiverSunset3DHeroProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    setReducedMotion(prefersReducedMotion());

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Graceful fallback for devices without WebGL or preferring reduced motion
  if (!hasWebGL || reducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 3.6, 9.5], fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => {
          // Atmospheric deep navy & golden fog
          scene.fog = new THREE.FogExp2('#070f22', 0.024);
        }}
      >
        {/* Ambient Lights: Deep navy fill + warm golden skylight */}
        <ambientLight intensity={0.55} color="#0c1f38" />
        <hemisphereLight args={['#ff9e43', '#061727', 0.8]} />

        {/* Rim Light for Dramatic Contour on Traditional Boat */}
        <directionalLight color="#10b981" intensity={0.9} position={[12, 8, 4]} />

        {/* 3D Elements */}
        <GoldenSunsetSun />
        <ProceduralRiverWater />
        <TraditionalBoat position={[0.8, -0.15, 0.5]} />
        <Riverbanks />
        <RiverFireflies count={100} />

        {/* Interactive Mouse Parallax */}
        <CameraParallax mousePos={mousePos} />
      </Canvas>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70 pointer-events-none" />
    </div>
  );
};
