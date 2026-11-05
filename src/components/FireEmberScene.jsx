import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotionSettings } from '../context/MotionContext';

// 3D Fiery Embers & Sparks System
function EmberParticles({ count = 180, intensity = 0.5, speedFactor = 1.0 }) {
  const pointsRef = useRef();

  // Procedural glowing spark texture
  const sparkTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    // Super-hot white core
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    // Fiery golden yellow
    gradient.addColorStop(0.2, 'rgba(255, 200, 50, 0.9)');
    // Vibrant fire orange
    gradient.addColorStop(0.45, 'rgba(255, 87, 34, 0.7)');
    // Deep crimson ember
    gradient.addColorStop(0.75, 'rgba(216, 67, 43, 0.3)');
    // Soft transparent edge
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Geometry attributes
  const { positions, scales, velocities, phases, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count * 2); // [phase, frequency]
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#FFFFFF'), // White hot
      new THREE.Color('#FFD54F'), // Bright gold
      new THREE.Color('#FF7043'), // Vivid flame orange
      new THREE.Color('#D8432B'), // Signature Bara
      new THREE.Color('#FF3D00'), // Hot ember
    ];

    for (let i = 0; i < count; i++) {
      // Disperse across volume
      pos[i * 3] = (Math.random() - 0.5) * 12;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;  // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;  // z

      // Spark size variation
      sc[i] = Math.random() * 1.8 + 0.6;

      // Velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.008; // drift x
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.012; // upward rise y
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006; // drift z

      // Flicker timing
      ph[i * 2] = Math.random() * Math.PI * 2;
      ph[i * 2 + 1] = Math.random() * 3.0 + 1.5;

      // Assign tint
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return {
      positions: pos,
      scales: sc,
      velocities: vel,
      phases: ph,
      colors: col,
    };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const posArray = posAttr.array;
    const t = state.clock.elapsedTime;

    const currentSpeed = (0.8 + intensity * 1.2) * speedFactor;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const phIdx = i * 2;

      // Rise upwards with heat buoyancy
      posArray[idx + 1] += velocities[idx + 1] * currentSpeed;

      // Heat wave horizontal wobble
      posArray[idx] += Math.sin(t * 1.5 + phases[phIdx]) * 0.007 + velocities[idx];
      posArray[idx + 2] += Math.cos(t * 1.2 + phases[phIdx]) * 0.005 + velocities[idx + 2];

      // Respawn at bottom when exceeding upper ceiling
      if (posArray[idx + 1] > 5.0) {
        posArray[idx + 1] = -5.0;
        posArray[idx] = (Math.random() - 0.5) * 12;
        posArray[idx + 2] = (Math.random() - 0.5) * 5;
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2.2 + intensity * 1.6}
        map={sparkTexture}
        vertexColors
        transparent
        opacity={Math.min(0.35 + intensity * 0.5, 0.95)}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function FireEmberScene({
  intensity = 0.5,
  count,
  speedFactor = 1.0,
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

  const emberCount = count !== undefined 
    ? count 
    : isMobile 
      ? Math.floor(70 + intensity * 60) 
      : Math.floor(140 + intensity * 130);

  // Fallback when WebGL or motion is disabled
  if (!webGLSupported || !animationsEnabled) {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 90%, rgba(216, 67, 43, 0.25) 0%, transparent 65%)',
            opacity: 0.3 + intensity * 0.4
          }}
        />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
      >
        <EmberParticles count={emberCount} intensity={intensity} speedFactor={speedFactor} />
      </Canvas>
    </div>
  );
}

