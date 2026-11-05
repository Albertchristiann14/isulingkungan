import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, SkipForward, Flame } from 'lucide-react';
import introMp4 from '../assets/intro.mp4';
import introWebm from '../assets/intro.webm';
import introPoster from '../assets/intro-poster.jpg';

const SmokeScene = lazy(() => import('./SmokeScene'));
const FireEmberScene = lazy(() => import('./FireEmberScene'));

export default function IntroVideo({ onEnterContent }) {
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef(null);

  // Monitor scroll for the "fade to kabut" smoke clearing transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToContent = () => {
    if (onEnterContent) {
      onEnterContent();
    } else {
      const target = document.getElementById('beranda-konten');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      id="intro-sinematik"
      className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#14110F]"
      aria-label="Pengantar sinematik kabut asap karhutla Kalimantan"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={introPoster}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.85] contrast-[1.1]"
        >
          <source src={introWebm} type="video/webm" />
          <source src={introMp4} type="video/mp4" />
          Browser Anda tidak mendukung pemutar video HTML5.
        </video>
      </div>

      {/* 3D Smoke Particles Scene */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <SmokeScene density={0.45} tintColor="#C9C2B8" />
        </Suspense>
      </div>

      {/* 3D Fiery Embers & Sparks Rising over the Fire */}
      <div className="absolute inset-0 z-15 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <FireEmberScene intensity={0.65} count={140} speedFactor={1.1} />
        </Suspense>
      </div>

      {/* Vignette & Contrast Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#14110F] via-black/45 to-black/75 pointer-events-none" aria-hidden="true" />

      {/* Fade into Kabut Overlay as user scrolls (asap menipis sensasi) */}
      <div 
        className="absolute inset-0 z-25 pointer-events-none transition-colors duration-150"
        style={{
          backgroundColor: '#C9C2B8',
          opacity: scrollProgress * 0.94,
        }}
        aria-hidden="true"
      />

      {/* Top Header Bar: Skip & Audio Controls */}
      <header className="relative z-30 w-full px-5 py-5 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-bara animate-pulse" aria-hidden="true" />
          <span className="text-xs tracking-widest uppercase text-kabut-light/90 font-mono font-medium">
            Langit Kelabu • Rekam Visual
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute/Unmute Toggle (44px min touch target) */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-arang/80 hover:bg-arang border border-kabut/25 text-kabut-light text-xs font-medium transition backdrop-blur-md min-h-[44px] focus-visible:ring-2 focus-visible:ring-bara active:scale-95"
            aria-label={isMuted ? "Aktifkan suara video latar" : "Bisukan suara video latar"}
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-kabut" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-bara" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isMuted ? "Bisu" : "Suara Aktif"}</span>
          </button>

          {/* Lewati / Skip Button (44px min touch target) */}
          <button
            onClick={handleScrollToContent}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gambut/90 hover:bg-gambut border border-kabut/30 text-white text-xs font-semibold tracking-wide transition backdrop-blur-md min-h-[44px] focus-visible:ring-2 focus-visible:ring-bara shadow-md active:scale-95"
          >
            <span>Lewati Intro</span>
            <SkipForward className="w-3.5 h-3.5 text-kabut-light" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Center Cinematic Headline */}
      <div className="relative z-30 max-w-4xl mx-auto px-5 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bara/25 border border-bara/50 text-white text-xs font-semibold tracking-wider uppercase mb-1">
            <Flame className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
            <span>Dokumentasi Karhutla Indonesia 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-bricolage text-white tracking-tight leading-[1.12] text-glow-bara max-w-prose-70 mx-auto">
            “Saat hutan terbakar, langit yang menjawab.”
          </h1>

          <p className="text-xs sm:text-sm text-kabut-light/90 tracking-wide font-normal max-w-xl mx-auto pt-2 bg-black/35 backdrop-blur-sm p-2 rounded-xl border border-white/10">
            Kalimantan Barat, Agustus 2026 • Dokumentasi visual kabut asap pekat karhutla lahan gambut oleh Krevia Digital
          </p>
        </motion.div>
      </div>

      {/* Bottom Action Area: Lanjutkan & Scroll Prompt */}
      <div className="relative z-30 w-full pb-8 px-6 flex flex-col items-center justify-center gap-3">
        <button
          onClick={handleScrollToContent}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-bara to-bara-dark hover:from-bara-dark hover:to-bara text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-bara/30 transition-all border border-bara-glow/30 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white active:scale-95"
        >
          <span>Lanjutkan ke Penelusuran</span>
          <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
        </button>

        {/* Accessible Scroll Indicator */}
        <button 
          onClick={handleScrollToContent} 
          className="flex items-center gap-2 text-xs text-kabut-light/75 hover:text-white transition select-none pt-1 min-h-[36px] focus-visible:ring-1 focus-visible:ring-kabut"
          aria-label="Gulir ke konten utama"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-kabut animate-bounce" aria-hidden="true" />
          <span>Gulir ke bawah untuk melihat data</span>
        </button>
      </div>
    </section>
  );
}
