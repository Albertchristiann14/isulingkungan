import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Flame, Layers, Eye, Info, RotateCcw } from 'lucide-react';
import { useMotionSettings } from '../context/MotionContext';

// 3D Peat Soil Model
function PeatModel({ isSmoldering = true }) {
  const meshRef = useRef();
  const coreRef = useRef();
  const emberPointsRef = useRef();

  // Embers rising from underground cracks
  const sparkGeo = React.useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.8;
      pos[i * 3 + 1] = Math.random() * 1.4 - 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (coreRef.current) {
      // Pulsating subterranean smolder glow
      const s = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
    if (emberPointsRef.current) {
      const positions = emberPointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 40; i++) {
        positions[i * 3 + 1] += delta * 0.5;
        if (positions[i * 3 + 1] > 1.8) {
          positions[i * 3 + 1] = -0.5;
        }
      }
      emberPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 1. Top Vegetative Surface Layer (Charred ground) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.4, 0.2, 2.4]} />
        <meshStandardMaterial color="#2B2622" roughness={0.9} />
      </mesh>

      {/* Burned Tree Stumps on Surface */}
      <mesh position={[-0.5, 1.2, 0.4]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 8]} />
        <meshStandardMaterial color="#1C1815" roughness={1} />
      </mesh>
      <mesh position={[0.6, 1.15, -0.3]}>
        <cylinderGeometry args={[0.06, 0.1, 0.4, 8]} />
        <meshStandardMaterial color="#181512" roughness={1} />
      </mesh>

      {/* 2. Dry Fibrous Peat Middle Layer (Gambut Mengering) */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.36, 0.9, 2.36]} />
        <meshStandardMaterial color="#3B2A20" roughness={0.95} />
      </mesh>

      {/* 3. Deep Underground Smoldering Peat Core (Bara Api Bawah Tanah) */}
      <mesh ref={coreRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[1.6, 0.7, 1.6]} />
        <meshStandardMaterial
          color="#D8432B"
          emissive="#FF3D00"
          emissiveIntensity={isSmoldering ? 2.2 : 0.4}
          roughness={0.7}
        />
      </mesh>

      {/* 4. Deep Compact Saturated Peat Bottom */}
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[2.36, 0.6, 2.36]} />
        <meshStandardMaterial color="#1C1510" roughness={1.0} />
      </mesh>

      {/* Rising Embers from Underground Fissures */}
      <points ref={emberPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={40}
            array={sparkGeo}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FFA726"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subterranean Point Light */}
      <pointLight position={[0, -0.2, 0]} color="#FF5722" intensity={isSmoldering ? 3.5 : 0.5} distance={3.5} />
    </group>
  );
}

export default function Peat3DViewer() {
  const { animationsEnabled, webGLSupported } = useMotionSettings();
  const [activeLayer, setActiveLayer] = useState('bara');

  const layerInfo = {
    permukaan: {
      judul: "Lapisan Permukaan (0 – 30 cm)",
      deskripsi: "Vegetasi pakis, semak, dan tajuk pohon yang terbakar cepat. Sering kali tampak padam di permukaan setelah disiram, padahal saluran oksigen telah terbuka ke bawah.",
      suhu: "150°C – 300°C",
      status: "Bahaya Api Permukaan",
    },
    gambut: {
      judul: "Lapisan Gambut Mengering (30 – 150 cm)",
      deskripsi: "Biomassa organik kaya karbon purba. Saat kanalisasi menguras air, pori-pori gambut terisi udara, menyediakan jalur lambat namun mematikan bagi perambatan api.",
      suhu: "300°C – 450°C",
      status: "Bahan Bakar Padat Alami",
    },
    bara: {
      judul: "Kantong Bara Smoldering (150 – 400 cm)",
      deskripsi: "Zona pembakaran lambat tanpa nyala api bebas (smoldering fire). Api dapat merayap puluhan meter di bawah tanah selama berminggu-minggu tanpa terdeteksi dari atas.",
      suhu: "450°C – 600°C",
      status: "Fokus Injeksi Air Bertekanan",
    },
  };

  return (
    <div className="w-full bg-[#181411] border border-arang rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-arang/70 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bara/20 border border-bara/40 text-bara text-xs uppercase font-mono tracking-wider mb-1">
            <Flame className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Simulasi 3D Sains Gambut</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-bricolage text-white">
            Anatomi Penampang 3D: Mengapa Api Gambut Sulit Padam?
          </h3>
          <p className="text-xs text-kabut-dark">
            Gunakan kursor atau sentuhan untuk memutar model potongan lapisan lahan gambut di bawah ini.
          </p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-arang/70 rounded-xl" role="tablist">
          <button
            onClick={() => setActiveLayer('permukaan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeLayer === 'permukaan' ? 'bg-bara text-white' : 'text-kabut-light hover:text-white'
            }`}
          >
            Permukaan
          </button>
          <button
            onClick={() => setActiveLayer('gambut')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeLayer === 'gambut' ? 'bg-bara text-white' : 'text-kabut-light hover:text-white'
            }`}
          >
            Gambut Kering
          </button>
          <button
            onClick={() => setActiveLayer('bara')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeLayer === 'bara' ? 'bg-bara text-white' : 'text-kabut-light hover:text-white'
            }`}
          >
            Bara Bawah Tanah
          </button>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Canvas area */}
        <div className="lg:col-span-7 h-[300px] sm:h-[360px] rounded-xl overflow-hidden bg-gradient-to-b from-[#110E0C] to-[#1A1512] border border-arang/70 relative">
          {(!webGLSupported || !animationsEnabled) ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-kabut">
              <Layers className="w-12 h-12 text-bara mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-white">Visualisasi 2D Statis Lapisan Gambut</p>
              <p className="text-xs text-kabut-dark mt-1">Bara membara di kedalaman 1–4 meter di bawah permukaan.</p>
            </div>
          ) : (
            <>
              <Canvas camera={{ position: [2.8, 2.2, 3.2], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} />
                <Suspense fallback={null}>
                  <PeatModel isSmoldering={true} />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={false} maxPolarAngle={Math.PI / 2 + 0.1} />
              </Canvas>

              {/* Interaction Hint */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] text-kabut-light pointer-events-none">
                <RotateCcw className="w-3 h-3 text-bara" />
                <span>Klik & geser untuk memutar 3D</span>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Context Card based on active layer */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-arang/40 border border-arang space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-bara font-bold">
              {layerInfo[activeLayer].status}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-bara/20 text-bara font-mono font-semibold">
              Suhu: {layerInfo[activeLayer].suhu}
            </span>
          </div>

          <h4 className="text-lg font-bold font-bricolage text-white">
            {layerInfo[activeLayer].judul}
          </h4>

          <p className="text-xs sm:text-sm text-kabut-light/85 leading-relaxed">
            {layerInfo[activeLayer].deskripsi}
          </p>

          <div className="pt-3 border-t border-arang/60 text-[11px] text-kabut-dark leading-tight flex items-start gap-2">
            <Info className="w-4 h-4 text-tunas shrink-0 mt-0.5" />
            <span>Kunci penanganan: Operasi pemadaman gambut memerlukan pembasahan total (rewetting) hingga kedalaman bara, bukan sekadar memadamkan asap luar.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
