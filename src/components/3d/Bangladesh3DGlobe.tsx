import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DIVISIONS } from '../../data/bangladeshData';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// Spherical coordinates conversion
function latLonToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

// Bangladesh Divisions coordinates
const DIVISION_PINS = [
  { id: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka', lat: 23.81, lon: 90.41 },
  { id: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', lat: 22.35, lon: 91.78 },
  { id: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi', lat: 24.37, lon: 88.60 },
  { id: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna', lat: 22.84, lon: 89.54 },
  { id: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal', lat: 22.70, lon: 90.36 },
  { id: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet', lat: 24.89, lon: 91.87 },
  { id: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur', lat: 25.74, lon: 89.27 },
  { id: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', lat: 24.75, lon: 90.40 },
];

function InteractiveGlobeScene({
  selectedDivisionId,
  onSelectDivision,
}: {
  selectedDivisionId: string;
  onSelectDivision: (id: string) => void;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Globe Radius
  const radius = 2.6;

  // Auto rotation with damping
  useFrame((_, delta) => {
    if (!globeGroupRef.current) return;
    // Slow down rotation on hover
    const speed = hoveredPin ? 0.02 : 0.12;
    globeGroupRef.current.rotation.y += speed * delta;
  });

  // Longitude and latitude wireframe rings
  const rings = useMemo(() => {
    const list = [];
    // Latitude parallels
    for (let lat = -60; lat <= 60; lat += 30) {
      const r = radius * Math.cos((lat * Math.PI) / 180);
      const y = radius * Math.sin((lat * Math.PI) / 180);
      list.push({ r, y, type: 'lat' });
    }
    return list;
  }, [radius]);

  return (
    <group ref={globeGroupRef} rotation={[0.3, 3.8, 0]}>
      {/* 1. Core Sphere: Deep Navy / Emerald holographic body */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color="#06192a"
          roughness={0.4}
          metalness={0.7}
          emissive="#021f1d"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 2. Outer Atmospheric Glow Shell */}
      <mesh>
        <sphereGeometry args={[radius * 1.08, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Wireframe Latitude Rings */}
      {rings.map((ring, idx) => (
        <mesh key={idx} position={[0, ring.y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.r - 0.008, ring.r + 0.008, 48]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.25} />
        </mesh>
      ))}

      {/* 4. Division 3D Pins & Beacon Beams */}
      {DIVISION_PINS.map(pin => {
        const [x, y, z] = latLonToVector3(pin.lat, pin.lon, radius);
        const isSelected = selectedDivisionId === pin.id;
        const isHovered = hoveredPin === pin.id;

        // Normal vector pointing outward from sphere
        const dir = new THREE.Vector3(x, y, z).normalize();
        const beamLength = isSelected ? 0.9 : 0.5;
        const beamEnd = dir.clone().multiplyScalar(radius + beamLength);

        return (
          <group key={pin.id}>
            {/* Glowing Surface Pin Marker */}
            <mesh
              position={[x, y, z]}
              onClick={e => {
                e.stopPropagation();
                onSelectDivision(pin.id);
              }}
              onPointerOver={e => {
                e.stopPropagation();
                setHoveredPin(pin.id);
              }}
              onPointerOut={() => setHoveredPin(null)}
            >
              <sphereGeometry args={[isSelected ? 0.12 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#34d399' : isHovered ? '#6ee7b7' : '#10b981'}
                emissive={isSelected ? '#10b981' : '#047857'}
                emissiveIntensity={isSelected ? 1.8 : 0.8}
              />
            </mesh>

            {/* Pulsing Beacon Light Beam into Space */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([x, y, z, beamEnd.x, beamEnd.y, beamEnd.z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={isSelected ? '#6ee7b7' : '#10b981'}
                transparent
                opacity={isSelected ? 0.9 : 0.5}
                linewidth={2}
              />
            </line>

            {/* Glowing Crown on Selected Pin */}
            {isSelected && (
              <mesh position={[beamEnd.x, beamEnd.y, beamEnd.z]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#a7f3d0" />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

interface Bangladesh3DGlobeProps {
  selectedDivisionId: string;
  onSelectDivision: (id: string) => void;
  language: 'bn' | 'en';
}

export const Bangladesh3DGlobe: React.FC<Bangladesh3DGlobeProps> = ({
  selectedDivisionId,
  onSelectDivision,
  language,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    setReducedMotion(prefersReducedMotion());
  }, []);

  const activeDivision = DIVISIONS.find(d => d.id === selectedDivisionId) || DIVISIONS[0];

  if (!hasWebGL || reducedMotion) {
    // 2D Elegant Fallback
    return (
      <div className="relative w-full h-80 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-6 text-center">
        <div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            BD
          </div>
          <div className="text-sm font-bold text-white">
            {language === 'bn' ? 'বাংলাদেশ ভৌগোলিক অবস্থান' : 'Bangladesh Geographic Location'}
          </div>
          <div className="text-xs text-slate-400 mt-1">23.6850° N, 90.3563° E · 8 Divisions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-slate-950/80 border border-slate-800/80 shadow-2xl flex items-center justify-center">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -3, -4]} intensity={0.8} color="#059669" />

        <InteractiveGlobeScene
          selectedDivisionId={selectedDivisionId}
          onSelectDivision={onSelectDivision}
        />
      </Canvas>

      {/* Floating HUD: Selected Division Hologram */}
      <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-emerald-500/30 shadow-xl max-w-[210px] pointer-events-none">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>GEO: 23° 41' N, 90° 22' E</span>
        </div>
        <div className="text-sm font-bold text-white">
          {language === 'bn' ? `${activeDivision.nameBn} বিভাগ` : `${activeDivision.nameEn} Division`}
        </div>
        <div className="text-[11px] text-slate-300 mt-0.5">
          {language === 'bn'
            ? `${activeDivision.districtCount} জেলা · ${activeDivision.populationMillions}M মানুষ`
            : `${activeDivision.districtCount} Districts · ${activeDivision.populationMillions}M Pop`}
        </div>
      </div>

      {/* Floating Interactive 8-Division Quick Pill Selector */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
        {DIVISION_PINS.map(pin => {
          const isSelected = selectedDivisionId === pin.id;
          return (
            <button
              key={pin.id}
              onClick={() => onSelectDivision(pin.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? pin.nameBn : pin.nameEn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
