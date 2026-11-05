import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Konten from './pages/Konten';
import Contact from './pages/Contact';
import { useMotionSettings } from './context/MotionContext';

export default function App() {
  const location = useLocation();
  const { animationsEnabled } = useMotionSettings();
  const [showNavbar, setShowNavbar] = useState(false);
  const mainContentRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!animationsEnabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [animationsEnabled]);

  // CRITICAL FIX: Reset scroll to top on every route/tab change!
  // Ensures Lenis and native browser scroll reset to 0 immediately
  useEffect(() => {
    // 1. Reset Lenis scroll engine if active
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    // 2. Reset native browser window and document elements
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Move accessibility focus to main without scrolling
    if (mainContentRef.current && location.pathname !== '/') {
      try {
        mainContentRef.current.focus({ preventScroll: true });
      } catch (e) {
        // Fallback for older browsers
        mainContentRef.current.focus();
      }
    }
  }, [location.pathname]);

  // Navbar visibility logic:
  // On Home ("/"): hidden during intro, appears once user scrolls past 350px
  // On other pages ("/about", "/konten", "/contact"): always visible
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowNavbar(true);
      return;
    }

    const checkScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#14110F] text-[#E7E2DB] selection:bg-bara selection:text-white">
      {/* Accessibility: Skip to Content Link (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] px-4 py-2.5 bg-bara text-white text-xs font-semibold rounded-xl shadow-2xl border border-white/20 transition-all"
      >
        Lewati langsung ke konten utama
      </a>

      {/* Persistent / Cinematic Navbar */}
      <Navbar showNavbar={showNavbar} />

      {/* Main Content Area with Route Animation */}
      <div 
        id="main-content" 
        ref={mainContentRef} 
        tabIndex={-1} 
        className="flex-1 w-full focus:outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationsEnabled ? 0.28 : 0 }}
            className="w-full"
          >
            <Routes location={location}>
              <Route 
                path="/" 
                element={<Home onIntroPassed={() => setShowNavbar(true)} />} 
              />
              <Route path="/about" element={<About />} />
              <Route path="/konten" element={<Konten />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
