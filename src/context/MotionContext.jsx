import React, { createContext, useContext, useState, useEffect } from 'react';

const MotionContext = createContext();

export const MotionProvider = ({ children }) => {
  // Check system prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Media query listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setAnimationsEnabled(false);
    }

    const handleChange = (e) => {
      setReducedMotion(e.matches);
      if (e.matches) setAnimationsEnabled(false);
    };

    mediaQuery.addEventListener('change', handleChange);

    // WebGL capability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(Boolean(gl));
    } catch (e) {
      setWebGLSupported(false);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <MotionContext.Provider
      value={{
        animationsEnabled,
        toggleAnimations,
        reducedMotion,
        webGLSupported,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useMotionSettings = () => useContext(MotionContext);

