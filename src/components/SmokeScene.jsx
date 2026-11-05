import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotionSettings } from '../context/MotionContext';

// Smoke Particle System inside R3F Canvas
function SmokeParticles({ count = 400, density = 0.5, tintColor = '#C9C2B8' }) {
  const pointsRef = useRef();
  
  // Create particle attributes
  const { positions, scales, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const rnd = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread across wide area
      pos[i * 3] = (Math.random() - 0.5) * 14;      // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;  // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;   // z

      sc[i] = Math.random() * 2.5 + 1.0;
      rnd[i * 3] = Math.random() * 0.005 + 0.002;   // speed y
      rnd[i * 3 + 1] = Math.random() * Math.PI * 2; // initial phase
      rnd[i * 3 + 2] = Math.random() * 0.003 + 0.001;// drift x
    }

    return {
      positions: pos,
      scales: sc,
      randoms: rnd,
    };
  }, [count]);

  // Generate circular soft smoke texture programmatically
  const smokeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.3, 'rgba(230, 220, 210, 0.45)');
    gradient.addColorStop(0.7, 'rgba(180, 170, 160, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const colorObject = useMemo(() => new THREE.Color(tintColor), [tintColor]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    const effectiveSpeed = 0.6 + density * 0.8;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Drift upwards
      array[idx + 1] += randoms[idx] * effectiveSpeed;
      // Drift horizontally with soft sine wave
      array[idx] += Math.sin(state.clock.elapsedTime * 0.4 + randoms[idx + 1]) * randoms[idx + 2];

      // Reset when particle goes above ceiling
      if (array[idx + 1] > 5.5) {
        array[idx + 1] = -5.5;
        array[idx] = (Math.random() - 0.5) * 14;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3.8 + density * 1.5}
        map={smokeTexture}
        transparent
        opacity={Math.min(0.2 + density * 0.45, 0.8)}
        color={colorObject}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export default function SmokeScene({
  density = 0.4,
  tintColor = '#C9C2B8',
  className = '',
}) {
  const { animationsEnabled, webGLSupported } = useMotionSettings();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance constraints: max 300 on mobile, 800 on desktop
  const particleCount = isMobile ? Math.floor(150 + density * 150) : Math.floor(350 + density * 400);

  // Fallback when WebGL is unavailable or animation is disabled
  if (!webGLSupported || !animationsEnabled) {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${tintColor}33 0%, rgba(20,17,15,0.7) 70%, transparent 100%)`,
            opacity: 0.3 + density * 0.4
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)} // Keep performant
      >
        <ambientLight intensity={0.5} />
        <SmokeParticles
          count={particleCount}
          density={density}
          tintColor={tintColor}
        />
      </Canvas>
    </div>
  );
}

