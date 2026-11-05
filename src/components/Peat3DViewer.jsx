import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Flame, Layers, Eye, Info, RotateCcw, Droplets, Sprout, AlertTriangle } from 'lucide-react';
import { useMotionSettings } from '../context/MotionContext';

// 3D Peatland Cross-Section with distinct layers
function PeatCrossSection({ activeLayer, isSmoldering = true }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const sparkPointsRef = useRef();

  // Procedural rising spark particles from subterranean fissures
  const sparkData = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = Math.random() * 1.6 - 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (coreRef.current) {
      // Pulsing subterranean smolder
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 3.5) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (sparkPointsRef.current) {
      const pos = sparkPointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 35; i++) {
        pos[i * 3 + 1] += delta * 0.6;
        if (pos[i * 3 + 1] > 2.0) {
          pos[i * 3 + 1] = -0.4;
        }
      }
      sparkPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. TOP VEGETATION LAYER (Rumput Hijau Sehat vs Tanah Hangus Terbakar) */}
      {/* Healthy Green Grass Side (Left) */}
      <mesh position={[-0.6, 1.1, 0]}>
        <boxGeometry args={[1.2, 0.22, 2.4]} />
        <meshStandardMaterial 
          color={activeLayer === 'permukaan' ? '#66BB6A' : '#4CAF50'} 
          roughness={0.65} 
        />
      </mesh>
      {/* Charred Burned Peat Side (Right) */}
      <mesh position={[0.6, 1.08, 0]}>
        <boxGeometry args={[1.2, 0.18, 2.4]} />
        <meshStandardMaterial color="#2B2622" roughness={0.9} />
      </mesh>

      {/* 3D Trees & Plants on the Green Grass Surface */}
      {/* Living Tree 1 */}
      <mesh position={[-0.8, 1.45, 0.4]}>
        <cylinderGeometry args={[0.05, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      <mesh position={[-0.8, 1.8, 0.4]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.6} />
      </mesh>
      {/* Living Tree 2 */}
      <mesh position={[-0.4, 1.35, -0.5]}>
        <cylinderGeometry args={[0.04, 0.07, 0.4, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      <mesh position={[-0.4, 1.65, -0.5]}>
        <coneGeometry args={[0.25, 0.5, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.6} />
      </mesh>
      {/* Burned Tree Stumps on Charred Side */}
      <mesh position={[0.5, 1.3, 0.3]}>
        <cylinderGeometry args={[0.08, 0.11, 0.4, 8]} />
        <meshStandardMaterial color="#1C1815" roughness={1.0} />
      </mesh>
      <mesh position={[0.7, 1.25, -0.4]}>
        <cylinderGeometry args={[0.06, 0.09, 0.35, 8]} />
        <meshStandardMaterial color="#14110F" roughness={1.0} />
      </mesh>

      {/* 2. FIBROUS DRY PEAT LAYER (Gambut Mengering: 30 - 150 cm) */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.4, 0.95, 2.4]} />
        <meshStandardMaterial
          color={activeLayer === 'gambut' ? '#9E745A' : '#7D5844'}
          roughness={0.95}
        />
      </mesh>
      {/* Visual Peat Strata Lines */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.42, 0.04, 2.42]} />
        <meshStandardMaterial color="#5A3D2F" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.42, 0.04, 2.42]} />
        <meshStandardMaterial color="#5A3D2F" roughness={0.9} />
      </mesh>

      {/* 3. SUBTERRANEAN SMOLDERING CORE (Kantong Bara Gambut: 150 - 400 cm) */}
      <mesh ref={coreRef} position={[0.3, -0.15, 0]}>
        <boxGeometry args={[1.5, 0.75, 1.5]} />
        <meshStandardMaterial
          color="#D8432B"
          emissive="#FF3D00"
          emissiveIntensity={isSmoldering ? 3.0 : 0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Rising Embers from Underground Core */}
      <points ref={sparkPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={35}
            array={sparkData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#FFD54F"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. GROUNDWATER TABLE / SATURATED BASE (Muka Air Tanah & Gambut Basah Alami) */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[2.4, 0.65, 2.4]} />
        <meshStandardMaterial
          color={activeLayer === 'air' ? '#3B596A' : '#2C3E50'}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Glowing Water Table Boundary Line (Batas Kritis -40 cm) */}
      <mesh position={[0, -0.52, 0]}>
        <boxGeometry args={[2.44, 0.04, 2.44]} />
        <meshStandardMaterial color="#00BCD4" emissive="#00ACC1" emissiveIntensity={0.8} />
      </mesh>

      {/* Point Light from Fire Core */}
      <pointLight position={[0.3, -0.15, 0]} color="#FF5722" intensity={4.5} distance={3.8} />
    </group>
  );
}

export default function Peat3DViewer() {
  const { animationsEnabled, webGLSupported } = useMotionSettings();
  const [activeLayer, setActiveLayer] = useState('bara');

  const layerData = {
    permukaan: {
      tag: "Zona 1 • 0 – 30 cm",
      judul: "Tajuk Hutan & Permukaan Gambut",
      karakter: "Rumput pakis hijau alami (kiri) vs abu hitam hangus terbakar (kanan).",
      deskripsi: "Di lahan gambut yang sehat dan basah, hamparan rumput dan kanopi pohon menjaga tanah tetap lembap. Ketika terbakar, lapisan daun kering hangus dengan cepat, membuka celah oksigen bagi api untuk menyusup ke bawah.",
      indikator: "Api Permukaan (Flash Fire)",
      suhu: "150°C – 250°C",
      warnaBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: Sprout,
    },
    gambut: {
      tag: "Zona 2 • 30 – 150 cm",
      judul: "Lapisan Gambut Kering Berserat",
      karakter: "Tanah cokelat kaya bahan organik purba dan karbon padat.",
      deskripsi: "Kanal buatan menguras air di kubah gambut, mengubahnya menjadi bahan bakar padat berpori. Api merambat perlahan melalui serabut akar purba tanpa nyala api yang terlihat dari atas.",
      indikator: "Bahan Bakar Padat Alami",
      suhu: "300°C – 450°C",
      warnaBadge: "bg-amber-100 text-amber-900 border-amber-300",
      icon: Layers,
    },
    bara: {
      tag: "Zona 3 • 150 – 400 cm",
      judul: "Kantong Bara Api Smoldering",
      karakter: "Zona pembakaran tanpa nyala api bebas, bersuhu tinggi.",
      deskripsi: "Pusat bara yang membara di kedalaman tanah selama berpekan-pekan. Siraman helikopter water-bombing hanya membasahi lapisan luar, sementara bara di bawah tanah tetap aktif dan terus melepaskan asap tebal beracun PM2.5.",
      indikator: "Fokus Suntik Air Bertekanan",
      suhu: "450°C – 600°C",
      warnaBadge: "bg-red-100 text-red-800 border-red-300",
      icon: Flame,
    },
    air: {
      tag: "Zona 4 • Di Bawah -40 cm",
      judul: "Batas Muka Air Tanah Kritis",
      karakter: "Gambut jenuh air berwarna gelap dengan daya tahan api alami.",
      deskripsi: "Batas hidrologi krusial! Regulasi menetapkan tinggi muka air tanah gambut tidak boleh lebih rendah dari -40 cm. Restorasi dengan sekat kanal mengembalikan genangan air agar api tidak dapat merayap ke bawah.",
      indikator: "Target Restorasi Sekat Kanal",
      suhu: "Suhu Normal Tanah (26°C – 30°C)",
      warnaBadge: "bg-cyan-100 text-cyan-900 border-cyan-300",
      icon: Droplets,
    },
  };

  const current = layerData[activeLayer];
  const IconComponent = current.icon;

  return (
    <div className="w-full bg-white border border-[#E6E0D6] rounded-3xl p-6 sm:p-10 space-y-8 shadow-soft-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EFECE6] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bara/10 border border-bara/30 text-bara text-xs uppercase font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
            <span>Simulasi 3D Sains Gambut</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-bricolage text-[#181C1F]">
            Anatomi Penampang 3D: Mengapa Api Gambut Sulit Padam?
          </h3>
          <p className="text-xs sm:text-sm text-gambut-muted">
            Model penampang vertikal tanah gambut. Putar 360° untuk melihat perbedaan vegetasi hijau, tanah kering, bara aktif, dan muka air tanah.
          </p>
        </div>

        {/* Layer Selector Interactive Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF8F5] rounded-2xl border border-[#E6E0D6]">
          <button
            onClick={() => setActiveLayer('permukaan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeLayer === 'permukaan' ? 'bg-[#3D7845] text-white shadow-sm' : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            1. Rumput & Tajuk
          </button>
          <button
            onClick={() => setActiveLayer('gambut')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeLayer === 'gambut' ? 'bg-[#7D5844] text-white shadow-sm' : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            2. Gambut Kering
          </button>
          <button
            onClick={() => setActiveLayer('bara')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeLayer === 'bara' ? 'bg-bara text-white shadow-sm' : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            3. Bara Api Bawah
          </button>
          <button
            onClick={() => setActiveLayer('air')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeLayer === 'air' ? 'bg-[#00838F] text-white shadow-sm' : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            4. Muka Air Tanah
          </button>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Canvas Container */}
        <div className="lg:col-span-7 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7F4EF] via-[#FAF8F5] to-[#EFECE6] border border-[#E2DAD0] relative shadow-inner">
          {(!webGLSupported || !animationsEnabled) ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#5C646D]">
              <Layers className="w-12 h-12 text-bara mb-3 animate-pulse" />
              <p className="text-base font-bold text-[#181C1F]">Penampang Lapisan Tanah Gambut</p>
              <p className="text-xs text-gambut-muted mt-1 max-w-sm">
                Bara membara di kedalaman 1–4 meter di bawah permukaan yang tampak padam.
              </p>
            </div>
          ) : (
            <>
              {/* Studio Bright Lighting Setup */}
              <Canvas camera={{ position: [3.2, 2.4, 3.4], fov: 45 }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[6, 12, 6]} intensity={1.8} castShadow />
                <directionalLight position={[-6, 6, -6]} intensity={0.8} />
                <pointLight position={[0, 4, 0]} intensity={1.0} />
                <Suspense fallback={null}>
                  <PeatCrossSection activeLayer={activeLayer} isSmoldering={true} />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={false} maxPolarAngle={Math.PI / 2 + 0.15} />
              </Canvas>

              {/* Interaction Hint Pill */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD5C7] text-xs font-medium text-[#2B2F33] shadow-sm pointer-events-none">
                <RotateCcw className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
                <span>Klik & putar model 3D 360°</span>
              </div>

              {/* Legend overlay */}
              <div className="absolute top-3 right-3 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-white/85 backdrop-blur-sm border border-[#E2DAD0] text-[11px] text-[#495057] shadow-sm pointer-events-none font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#4CAF50] inline-block" /> Rumput Sehat
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#7D5844] inline-block" /> Gambut Kering
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-bara inline-block" /> Bara Api 450°C
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#00ACC1] inline-block" /> Air Tanah (-40cm)
                </span>
              </div>
            </>
          )}
        </div>

        {/* Informative Layer Explanation Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] space-y-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${current.warnaBadge}`}>
              <IconComponent className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{current.tag}</span>
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E6E0D6] text-bara font-mono font-bold shadow-2xs">
              {current.suhu}
            </span>
          </div>

          <div>
            <h4 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
              {current.judul}
            </h4>
            <p className="text-xs font-semibold text-gambut-muted mt-0.5">
              {current.karakter}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
            {current.deskripsi}
          </p>

          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0D6] space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gambut-muted font-bold block">
              Peran Strategis di Lapangan:
            </span>
            <p className="text-xs font-semibold text-[#181C1F]">
              {current.indikator}
            </p>
          </div>

          <div className="pt-3 border-t border-[#EFECE6] text-xs text-[#5C646D] flex items-start gap-2">
            <Info className="w-4 h-4 text-tunas shrink-0 mt-0.5" aria-hidden="true" />
            <span>Kunci sains: Menjaga gambut tetap basah melalui sekat kanal adalah satu-satunya pencegahan permanen agar bara tidak tercipta.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
