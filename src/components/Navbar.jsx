import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, EyeOff, Eye, Flame } from 'lucide-react';
import { useMotionSettings } from '../context/MotionContext';

export default function Navbar({ showNavbar = true }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { animationsEnabled, toggleAnimations } = useMotionSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Karhutla', path: '/about' },
    { name: 'Data & Dampak', path: '/konten' },
    { name: 'Aksi & Kontak', path: '/contact' },
  ];

  if (!showNavbar) {
    return null;
  }

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#14110F]/90 backdrop-blur-md border-b border-arang/80 py-2.5 shadow-xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with 44px min hit area */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-bara rounded-xl p-1 min-h-[44px] transition-transform active:scale-95"
          aria-label="Langit Kelabu beranda - Krevia Digital"
        >
          {/* Logo Icon */}
          <div className="relative w-8 h-8 rounded-lg bg-gambut border border-bara/40 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-bara transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-bara group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-tr from-bara/25 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <span className="font-bricolage text-base sm:text-lg font-bold text-white tracking-tight leading-tight flex items-center gap-1.5">
              Langit Kelabu
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-kabut-dark">
              Krevia Digital
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-arang/40 p-1 rounded-full border border-arang/60 backdrop-blur-sm" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-150 min-h-[38px] flex items-center ${
                  isActive
                    ? 'bg-bara text-white font-semibold shadow-md shadow-bara/25'
                    : 'text-kabut-light/80 hover:text-white hover:bg-gambut/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Action: Animation Switch & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Accessibility: Toggle Animation button (44px target) */}
          <button
            onClick={toggleAnimations}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-arang/70 hover:bg-arang border border-kabut/20 text-kabut-light text-xs font-medium transition min-h-[44px] focus-visible:ring-2 focus-visible:ring-bara active:scale-95"
            title={animationsEnabled ? "Matikan animasi visual (ramah vestibular)" : "Nyalakan animasi visual"}
            aria-label={animationsEnabled ? "Matikan animasi visual" : "Nyalakan animasi visual"}
            aria-pressed={animationsEnabled}
          >
            {animationsEnabled ? (
              <>
                <Eye className="w-3.5 h-3.5 text-tunas" aria-hidden="true" />
                <span className="hidden sm:inline text-[11px] font-medium">Animasi Aktif</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
                <span className="hidden sm:inline text-[11px] font-medium">Animasi Diam</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button (44px target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-arang/70 text-kabut hover:text-white border border-kabut/20 transition active:scale-95 focus-visible:ring-2 focus-visible:ring-bara"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden bg-[#14110F] border-b border-arang px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-bara text-white font-semibold'
                    : 'text-kabut-light hover:bg-arang/50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-arang/60 text-xs text-kabut-dark flex items-center justify-between">
            <span>Krevia Digital • Lomba Web Lingkungan 2026</span>
            <span className="text-tunas text-[11px] font-mono">#LangitKelabu</span>
          </div>
        </div>
      )}
    </header>
  );
}
