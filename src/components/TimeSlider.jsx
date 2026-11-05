import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Play, Pause, AlertTriangle, Calendar, Info, RefreshCw, Table as TableIcon, Sparkles } from 'lucide-react';
import { hotspotHarian, catatanWajib } from '../data/hotspot';

const SmokeScene = lazy(() => import('./SmokeScene'));
const FireEmberScene = lazy(() => import('./FireEmberScene'));

const skyThemes = [
  // 0: 3 Jun (467)
  {
    skyBg: 'linear-gradient(to bottom, #2C353F 0%, #3D3A36 60%, #1F1915 100%)',
    sunColor: '#F5E4B5',
    sunGlow: '0 0 25px rgba(245, 228, 181, 0.5)',
    sunOpacity: 0.85,
    smokeDensity: 0.2,
    smokeColor: '#C9C2B8',
    emberIntensity: 0.15,
    statusLabel: 'Kondisi Awal Musim Kemarau',
    statusColor: 'text-kabut-light',
  },
  // 1: 15 Jun (414)
  {
    skyBg: 'linear-gradient(to bottom, #2B333B 0%, #3D3934 60%, #1E1713 100%)',
    sunColor: '#F3DFC0',
    sunGlow: '0 0 25px rgba(243, 223, 192, 0.45)',
    sunOpacity: 0.82,
    smokeDensity: 0.22,
    smokeColor: '#C9C2B8',
    emberIntensity: 0.18,
    statusLabel: 'Titik Panas Terkonsentrasi Rendah',
    statusColor: 'text-kabut-light',
  },
  // 2: 26 Jun (660)
  {
    skyBg: 'linear-gradient(to bottom, #383633 0%, #483A2E 60%, #221A15 100%)',
    sunColor: '#EBC399',
    sunGlow: '0 0 30px rgba(235, 195, 153, 0.45)',
    sunOpacity: 0.78,
    smokeDensity: 0.3,
    smokeColor: '#BDB3A6',
    emberIntensity: 0.25,
    statusLabel: 'Peningkatan Aktivitas Lahan',
    statusColor: 'text-kabut-light',
  },
  // 3: 10 Jul (1458)
  {
    skyBg: 'linear-gradient(to bottom, #443528 0%, #563923 60%, #261A13 100%)',
    sunColor: '#EAA06D',
    sunGlow: '0 0 35px rgba(234, 160, 109, 0.4)',
    sunOpacity: 0.72,
    smokeDensity: 0.45,
    smokeColor: '#B09E8C',
    emberIntensity: 0.4,
    statusLabel: 'Kabut Mulai Terasa di Wilayah Sekitar',
    statusColor: 'text-yellow-400',
  },
  // 4: 26 Jul (3670)
  {
    skyBg: 'linear-gradient(to bottom, #503120 0%, #633318 60%, #2B160E 100%)',
    sunColor: '#E87D4E',
    sunGlow: '0 0 40px rgba(232, 125, 78, 0.4)',
    sunOpacity: 0.65,
    smokeDensity: 0.6,
    smokeColor: '#9C8572',
    emberIntensity: 0.55,
    statusLabel: 'Kekeringan Gambut Mempercepat Sebaran',
    statusColor: 'text-yellow-500',
  },
  // 5: 6 Agu (1762)
  {
    skyBg: 'linear-gradient(to bottom, #4A3022 0%, #5C321B 60%, #28160E 100%)',
    sunColor: '#EA8C59',
    sunGlow: '0 0 35px rgba(234, 140, 89, 0.35)',
    sunOpacity: 0.68,
    smokeDensity: 0.5,
    smokeColor: '#A89481',
    emberIntensity: 0.45,
    statusLabel: 'Fluktuasi Cuaca & Upaya Pemadaman Awal',
    statusColor: 'text-yellow-400',
  },
  // 6: 3 Sep (14581) - PEAK
  {
    skyBg: 'linear-gradient(to bottom, #5A1910 0%, #701F12 50%, #300E07 100%)',
    sunColor: '#D8432B',
    sunGlow: '0 0 50px rgba(216, 67, 43, 0.7), 0 0 90px rgba(216, 67, 43, 0.35)',
    sunOpacity: 0.55,
    smokeDensity: 0.95,
    smokeColor: '#805D52',
    emberIntensity: 1.0, // Maximum fiery sparks
    statusLabel: 'PUNCAK KRISIS: Langit Merah & Asap Pekat Ekstrem',
    statusColor: 'text-bara font-bold',
  },
  // 7: 5 Sep (14567)
  {
    skyBg: 'linear-gradient(to bottom, #561810 0%, #6B1D12 50%, #2D0D07 100%)',
    sunColor: '#D43F28',
    sunGlow: '0 0 50px rgba(212, 63, 40, 0.65)',
    sunOpacity: 0.56,
    smokeDensity: 0.92,
    smokeColor: '#825F54',
    emberIntensity: 0.95,
    statusLabel: 'Status Darurat: Indeks Kualitas Udara Berbahaya',
    statusColor: 'text-bara font-bold',
  },
  // 8: 11 Sep (12062)
  {
    skyBg: 'linear-gradient(to bottom, #4E1B15 0%, #602217 50%, #29100B 100%)',
    sunColor: '#CF4C34',
    sunGlow: '0 0 45px rgba(207, 76, 52, 0.55)',
    sunOpacity: 0.58,
    smokeDensity: 0.85,
    smokeColor: '#8A685D',
    emberIntensity: 0.85,
    statusLabel: 'Titik Panas Masih Sangat Tinggi di Atas 12 Ribu',
    statusColor: 'text-bara',
  },
];

export default function TimeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);

  const currentData = hotspotHarian[currentIndex];
  const currentTheme = skyThemes[currentIndex] || skyThemes[0];

  // Auto-play timelapse
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= hotspotHarian.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSliderChange = (e) => {
    setCurrentIndex(Number(e.target.value));
  };

  const togglePlay = () => {
    if (currentIndex >= hotspotHarian.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-arang/70 border border-kabut/20 text-kabut text-xs uppercase tracking-wider font-mono">
          <Calendar className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
          <span>Simulasi Kronologis 2026</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-bricolage text-white tracking-tight">
          Rentang Waktu: <span className="text-kabut-light">Transformasi Langit Kelabu</span>
        </h2>
        
        <p className="text-kabut-light/85 text-sm sm:text-base max-w-prose-70 mx-auto leading-relaxed">
          Geser poros waktu dari Juni hingga September 2026 untuk menyaksikan bagaimana kabut asap perlahan menyelimuti cakrawala, bara api melayang di udara, dan anomali suhu melonjak tajam.
        </p>
      </div>

      {/* Atmospheric Horizon Simulation Box */}
      <div 
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-arang/80 transition-all duration-700 ease-out"
        style={{
          background: currentTheme.skyBg,
        }}
        role="region"
        aria-label={`Visualisasi atmosfer langit pada ${currentData.label} 2026`}
      >
        {/* Sun Disc */}
        <div 
          className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-36 sm:h-36 rounded-full transition-all duration-700 ease-out pointer-events-none"
          style={{
            backgroundColor: currentTheme.sunColor,
            boxShadow: currentTheme.sunGlow,
            opacity: currentTheme.sunOpacity,
          }}
          aria-hidden="true"
        >
          <div className="absolute -inset-4 rounded-full border border-white/20 filter blur-sm pointer-events-none" />
        </div>

        {/* 3D Smoke Particle Layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <SmokeScene 
              density={currentTheme.smokeDensity} 
              tintColor={currentTheme.smokeColor} 
            />
          </Suspense>
        </div>

        {/* 3D Glowing Fire Embers & Sparks System */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <FireEmberScene
              intensity={currentTheme.emberIntensity}
              speedFactor={1.2}
            />
          </Suspense>
        </div>

        {/* Horizon Tree Silhouette Vector at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 opacity-90" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#14110F]">
            <path d="M0,120 L0,85 C40,82 60,65 90,80 C130,55 160,88 210,70 C250,52 280,75 320,60 C370,80 410,50 450,72 C500,45 540,85 590,65 C640,48 680,78 730,58 C770,75 810,48 860,68 C900,55 940,82 990,64 C1040,50 1080,76 1130,62 C1160,78 1180,82 1200,85 L1200,120 Z" />
          </svg>
        </div>

        {/* Floating Data Badge over the Sky */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-col gap-1.5 backdrop-blur-md bg-[#14110F]/85 p-3.5 sm:p-5 rounded-2xl border border-kabut/20 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-kabut-dark font-mono font-medium">
              Tanggal Pantau
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-arang text-white font-mono font-semibold">
              {currentData.label} 2026
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-0.5">
            <Flame className="w-5 h-5 text-bara animate-pulse shrink-0" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentData.jumlah}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-2xl sm:text-4xl font-extrabold font-bricolage text-white tabular-nums tracking-tight"
              >
                {currentData.jumlah.toLocaleString('id-ID')}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs sm:text-sm text-kabut font-medium">titik panas / 24 jam</span>
          </div>

          <div className="text-xs pt-0.5">
            <span className={currentTheme.statusColor}>{currentTheme.statusLabel}</span>
          </div>
        </div>

        {/* Comparison Callout Note */}
        <div className="absolute bottom-3 right-4 sm:right-6 z-20 hidden sm:flex items-center gap-2 text-xs text-kabut-light/80 backdrop-blur-md bg-[#14110F]/70 px-3.5 py-2 rounded-xl border border-kabut/15 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
          <span>Puncak 3 Sep naik &gt;31× dibanding 3 Juni (467 titik)</span>
        </div>
      </div>

      {/* Interactive Controls & Timeline Scrubber */}
      <div className="bg-[#14110F]/90 border border-arang rounded-2xl p-5 sm:p-8 backdrop-blur-sm space-y-6 shadow-xl">
        {/* Scrubber Header & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-bara to-bara-dark hover:from-bara-dark hover:to-bara text-white font-semibold text-xs sm:text-sm transition min-h-[44px] shadow-lg shadow-bara/25 focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              aria-label={isPlaying ? "Jeda animasi rentang waktu" : "Putar otomatis simulasi perubahan langit"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" aria-hidden="true" />
                  <span>Jeda Timelapse</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Putar Timelapse</span>
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              onClick={() => setCurrentIndex(0)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-arang/70 hover:bg-arang text-kabut hover:text-white border border-kabut/15 transition active:scale-95 focus-visible:ring-2 focus-visible:ring-bara"
              title="Reset ke awal (3 Juni)"
              aria-label="Kembali ke awal timeline (3 Juni)"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Toggle Accessible Table Button */}
            <button
              onClick={() => setShowDataTable(!showDataTable)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition min-h-[44px] active:scale-95 ${
                showDataTable
                  ? 'bg-arang text-white border-kabut/40'
                  : 'bg-arang/40 text-kabut-light border-kabut/15 hover:bg-arang'
              }`}
              aria-label="Buka tabel data alternatif untuk pembaca layar"
              aria-expanded={showDataTable}
            >
              <TableIcon className="w-3.5 h-3.5 text-kabut" aria-hidden="true" />
              <span>{showDataTable ? 'Tutup Tabel Data' : 'Lihat Tabel Data'}</span>
            </button>
          </div>

          {/* Current Selection Position Indicator */}
          <div className="text-right">
            <span className="text-[11px] text-kabut-dark uppercase tracking-wider block font-mono">Posisi Terpilih</span>
            <span className="text-sm sm:text-base font-bold font-bricolage text-white">
              {currentData.label} 2026 ({currentData.jumlah.toLocaleString('id-ID')} Hotspot)
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <label htmlFor="hotspot-slider" className="sr-only">
            Pilih tanggal pantau titik panas karhutla Juni sampai September 2026
          </label>
          <div className="relative flex items-center py-2">
            <input
              id="hotspot-slider"
              type="range"
              min={0}
              max={hotspotHarian.length - 1}
              step={1}
              value={currentIndex}
              onChange={handleSliderChange}
              aria-valuemin={0}
              aria-valuemax={hotspotHarian.length - 1}
              aria-valuenow={currentIndex}
              aria-valuetext={`${currentData.label} 2026, ${currentData.jumlah} titik panas`}
              className="w-full h-3 bg-arang rounded-lg appearance-none cursor-pointer accent-bara focus:outline-none focus-visible:ring-2 focus-visible:ring-bara"
            />
          </div>

          {/* Date Ticks Grid */}
          <div className="grid grid-cols-9 gap-1 text-center select-none pt-1" role="tablist" aria-label="Titik tanggal timeline">
            {hotspotHarian.map((item, idx) => (
              <button
                key={item.tanggal}
                role="tab"
                aria-selected={idx === currentIndex}
                onClick={() => setCurrentIndex(idx)}
                className={`flex flex-col items-center group transition py-2 rounded-xl min-h-[44px] justify-center ${
                  idx === currentIndex
                    ? 'text-white font-bold bg-arang/50'
                    : 'text-kabut-dark hover:text-kabut hover:bg-arang/20'
                }`}
              >
                <div 
                  className={`w-3 h-3 rounded-full mb-1 transition-all ${
                    idx === currentIndex 
                      ? 'bg-bara scale-125 ring-2 ring-bara/50' 
                      : 'bg-arang group-hover:bg-kabut-dark'
                  }`} 
                  aria-hidden="true"
                />
                <span className="text-[11px] sm:text-xs font-mono">{item.label}</span>
                <span className="hidden md:inline text-[10px] text-kabut-dark tabular-nums">
                  {item.jumlah > 9999 ? `${(item.jumlah / 1000).toFixed(1)}k` : item.jumlah}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Accessible Data Table View */}
        {showDataTable && (
          <div className="p-4 rounded-xl bg-arang/40 border border-arang/70 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-kabut-light font-semibold">
              Tabel Serial Waktu Titik Panas Harian 2026 (Sumber: SiPongi / Databoks)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-arang text-kabut-dark font-mono">
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Bulan</th>
                    <th className="py-2 px-3 text-right">Jumlah Hotspot (24 Jam)</th>
                    <th className="py-2 px-3">Status Lingkungan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arang/40 text-kabut-light">
                  {hotspotHarian.map((item, idx) => (
                    <tr 
                      key={item.tanggal}
                      className={idx === currentIndex ? 'bg-bara/15 font-semibold text-white' : 'hover:bg-arang/20'}
                    >
                      <td className="py-2 px-3 font-mono">{item.label} 2026</td>
                      <td className="py-2 px-3">{item.bulan}</td>
                      <td className="py-2 px-3 text-right tabular-nums text-bara font-bold">
                        {item.jumlah.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-3 text-[11px] text-kabut-dark">
                        {skyThemes[idx].statusLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Catatan Wajib: Banner Klarifikasi Metodologi Satelit */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-arang/45 border border-yellow-700/40 text-kabut-light text-xs sm:text-sm leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-yellow-400 font-semibold">Peringatan interpretasi data: </strong>
            {catatanWajib}
          </p>
        </div>
      </div>
    </div>
  );
}
