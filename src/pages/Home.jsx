import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Flame, 
  Layers, 
  Wind, 
  AlertCircle, 
  Compass, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import IntroVideo from '../components/IntroVideo';
import TimeSlider from '../components/TimeSlider';
import StatCard from '../components/StatCard';
import { angkaKunci } from '../data/hotspot';

export default function Home({ onIntroPassed }) {
  const contentRef = useRef(null);

  const handleEnterContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (onIntroPassed) onIntroPassed();
  };

  return (
    <div className="w-full min-h-screen bg-[#14110F] text-[#E7E2DB]">
      {/* 1) INTRO SINEMATIK: Full-screen video + 3D smoke + 3D fire embers */}
      <IntroVideo onEnterContent={handleEnterContent} />

      {/* 2) MAIN HOME CONTENT */}
      <main id="beranda-konten" ref={contentRef} className="relative z-30 pt-16 pb-24">
        {/* Narrative Opener */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-arang/80 border border-kabut/20 text-kabut text-xs uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-tunas inline-block" aria-hidden="true" />
              <span>Krisis Ekologis & Kemanusiaan</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bricolage text-white tracking-tight leading-tight max-w-prose-70 mx-auto">
              Ketika api merayap di bawah tanah, jutaan napas terhenti di permukaan.
            </h2>

            <p className="text-base sm:text-lg text-kabut-light/85 max-w-prose-70 mx-auto font-light leading-relaxed">
              Kebakaran hutan dan lahan di Indonesia bukan sekadar kobaran tajuk pohon. Di atas hamparan gambut tropis yang mengering, api menyusup ke kedalaman bermeter-meter—membakar senyawa karbon purba tanpa nyala api terbuka, namun melepas kabut asap tebal beracun yang mengurung kota berpekan-pekan.
            </p>
          </motion.div>
        </section>

        {/* TIME SLIDER: Interactive atmospheric chronology with 3D smoke & embers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
          <TimeSlider />
        </section>

        {/* 3 KEY NUMBERS & IMPACT SUMMARY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-arang/70 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-bara font-bold">
                Skala Krisis 2026
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-bricolage text-white">
                Tiga Angka yang Menjelaskan Keparahan Situasi
              </h2>
              <p className="text-xs sm:text-sm text-kabut-dark max-w-prose-70">
                Data resmi dihimpun dari laporan satelit SiPongi Kementerian Kehutanan dan evaluasi dampak ekonomi CELIOS 2026.
              </p>
            </div>

            {/* CTA Button to Full Data & Impact */}
            <Link
              to="/konten"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-bara to-bara-dark hover:from-bara-dark hover:to-bara text-white text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-bara/30 transition group shrink-0 min-h-[44px] active:scale-95"
            >
              <span>Lihat Dampaknya Secara Lengkap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* 3 Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {angkaKunci.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Contextual Teaser: Mengapa Gambut Sangat Rentan? */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#1C1510] via-[#16120F] to-[#2B2F33]/40 p-6 sm:p-10 border border-arang/80 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-tunas font-semibold">
                  Akar Persoalan
                </span>
                <h3 className="text-xl sm:text-3xl font-bold font-bricolage text-white">
                  Mengapa Lahan Gambut Membuat Api Sulit Dipadamkan?
                </h3>
                <p className="text-xs sm:text-sm text-kabut-light/85 leading-relaxed max-w-prose-70">
                  Lahan gambut terbentuk dari tumpukan bahan organik selama ribuan tahun dengan ketebalan mencapai belasan meter. Ketika kanal buatan mengeringkannya, gambut berubah menjadi bahan bakar padat. Api tidak hanya membakar di permukaan, tetapi membara di bawah tanah tanpa oksigen bebas (smoldering fire)—membuat siraman helikopter water-bombing sering kali hanya membasahi lapisan luar sementara bara di bawah tetap hidup.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-arang hover:bg-arang-light border border-kabut/20 text-white text-xs sm:text-sm font-semibold transition min-h-[44px] active:scale-95"
                >
                  <Layers className="w-4 h-4 text-bara" aria-hidden="true" />
                  <span>Pelajari Anatomi 3D Gambut</span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-tunas/20 hover:bg-tunas/30 border border-tunas/40 text-tunas-light text-xs sm:text-sm font-semibold transition min-h-[44px] active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-tunas" aria-hidden="true" />
                  <span>5 Aksi Nyata Lindungi Udara</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
