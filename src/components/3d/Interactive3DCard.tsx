import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, Eye, RotateCw } from 'lucide-react';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// 3D Monument: Jatiya Smriti Soudho (জাতীয় স্মৃতিসৌধ) 7 Cascading Triangular Spires
function Memorial3DModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  // 7 pairs of triangular prism walls soaring upwards
  const walls = [
    { height: 3.6, width: 0.9, z: 0.0, color: '#f5f5f5' },
    { height: 3.1, width: 1.2, z: 0.25, color: '#e0e0e0' },
    { height: 2.6, width: 1.5, z: 0.5, color: '#d6d6d6' },
    { height: 2.1, width: 1.8, z: 0.75, color: '#cccccc' },
    { height: 1.6, width: 2.1, z: 1.0, color: '#bdbdbd' },
    { height: 1.1, width: 2.4, z: 1.25, color: '#b0b0b0' },
    { height: 0.6, width: 2.7, z: 1.5, color: '#9e9e9e' },
  ];

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Reflecting Pool Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.1, 32]} />
        <meshStandardMaterial color="#0f2b38" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Red Brick Paved Plinth */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.2, 16]} />
        <meshStandardMaterial color="#8d2b1f" roughness={0.8} />
      </mesh>

      {/* 7 Cascading Pairs of Spires */}
      {walls.map((w, idx) => (
        <group key={idx}>
          {/* Front Left Wall */}
          <mesh position={[-w.width * 0.2, w.height * 0.5, -w.z]}>
            <coneGeometry args={[w.width * 0.35, w.height, 3]} />
            <meshStandardMaterial color={w.color} roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Front Right Wall */}
          <mesh position={[w.width * 0.2, w.height * 0.5, w.z]}>
            <coneGeometry args={[w.width * 0.35, w.height, 3]} />
            <meshStandardMaterial color={w.color} roughness={0.4} metalness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Central Soaring Spire Pinnacle */}
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[0.2, 4.2, 4]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
      </mesh>
    </group>
  );
}

// 3D Miniature Model: Traditional Bangladeshi Wooden Boat
function MiniBoat3DModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.position.y = -0.4 + Math.sin(t * 2.0) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      {/* Water disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
        <meshStandardMaterial color="#0e3c45" roughness={0.15} metalness={0.85} />
      </mesh>

      {/* Hull */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 3.2, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#4e342e" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Bamboo Canopy */}
      <mesh position={[0, 0.4, -0.2]}>
        <cylinderGeometry args={[0.48, 0.48, 1.3, 12, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Mast & Sail */}
      <mesh position={[0, 1.2, 0.6]}>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <mesh position={[0, 1.5, 0.65]} rotation={[0, 0.1, 0]}>
        <planeGeometry args={[1.5, 1.4]} />
        <meshStandardMaterial color="#fffde7" side={THREE.DoubleSide} roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Ancient Citadel / Terracotta Ruin
function AncientCitadel3DModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* Grass mound base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.3, 24]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
      </mesh>

      {/* Terracotta stepped rampart */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.4, 0.5, 2.4]} />
        <meshStandardMaterial color="#a9442a" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.8, 0.5, 1.8]} />
        <meshStandardMaterial color="#8d3822" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial color="#702c1b" roughness={0.85} />
      </mesh>

      {/* Central Stupa/Spire */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.5, 0.9, 8]} />
        <meshStandardMaterial color="#b35439" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Rolling Tea Gardens Hilltop
function TeaGardens3DModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {/* Tiered rolling tea terraces */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[1.8, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.3, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#40916c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.8, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#52b788" roughness={0.75} />
      </mesh>

      {/* Miniature shade tree */}
      <group position={[0.4, 1.2, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.8, 6]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#1b4332" />
        </mesh>
      </group>
    </group>
  );
}

interface Interactive3DCardProps {
  modelType: 'memorial' | 'boat' | 'citadel' | 'tea';
  title: string;
  subtitle: string;
  imageUrl: string;
  onClickDetails: () => void;
  language: 'bn' | 'en';
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  modelType,
  title,
  subtitle,
  imageUrl,
  onClickDetails,
  language,
}) => {
  const [is3DMode, setIs3DMode] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const render3DModel = () => {
    switch (modelType) {
      case 'memorial':
        return <Memorial3DModel />;
      case 'boat':
        return <MiniBoat3DModel />;
      case 'citadel':
        return <AncientCitadel3DModel />;
      case 'tea':
        return <TeaGardens3DModel />;
      default:
        return <MiniBoat3DModel />;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mouseTilt.y * 0.4}deg) rotateY(${mouseTilt.x * 0.4}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative bg-slate-900 border border-slate-800/90 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 transition-all flex flex-col justify-between"
    >
      {/* Card Header Media: Switch between 2D Photo and 3D Interactive Model */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-950">
        {is3DMode ? (
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 1.5, 4.2], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[4, 5, 4]} intensity={1.5} color="#fff" />
              <pointLight position={[-3, -2, -3]} color="#10b981" intensity={1.2} />
              {render3DModel()}
            </Canvas>

            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
              <RotateCw className="w-3 h-3 animate-spin-slow text-emerald-400" />
              <span>{language === 'bn' ? 'সরাসরি ৩ডি মডেল' : 'Live 3D Model'}</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
        )}

        {/* 3D / 2D Toggle Switch Button on Top Right */}
        <button
          onClick={e => {
            e.stopPropagation();
            setIs3DMode(!is3DMode);
          }}
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg backdrop-blur-md ${
            is3DMode
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40'
              : 'bg-slate-950/80 hover:bg-emerald-950 text-slate-200 hover:text-emerald-300 border border-slate-700/80'
          }`}
          title={is3DMode ? 'Switch to Photo' : 'Interact with 3D Model'}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{is3DMode ? (language === 'bn' ? 'ছবি দেখুন' : 'View Photo') : (language === 'bn' ? '৩ডি দেখুন' : '3D View')}</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClickDetails}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ গাইড পড়ুন' : 'View Full Guide'}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
