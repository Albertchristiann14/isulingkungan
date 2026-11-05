import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'chart-vendor': ['recharts'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'motion-vendor': ['framer-motion', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
