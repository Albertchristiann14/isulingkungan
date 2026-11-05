import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Heart, Mail, Compass } from 'lucide-react';
import { daftarSumber, profilTim } from '../data/sources';

export default function Footer() {
  return (
    <footer className="w-full bg-[#100D0B] border-t border-arang/70 text-kabut pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Brand & Official Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gambut border border-bara/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-bara" />
              </div>
              <span className="font-bricolage text-xl font-bold text-white tracking-tight">
                Langit Kelabu
              </span>
            </div>

            <p className="text-sm italic text-kabut-light/90 font-serif">
              “Saat hutan terbakar, langit yang menjawab.”
            </p>

            <p className="text-xs text-kabut-dark leading-relaxed max-w-prose-70">
              Platform visualisasi data dan literasi publik mengenai kebakaran hutan dan lahan (karhutla) serta lahan gambut di Indonesia. Didesain secara tenang, objektif, dan berpijak pada data terverifikasi.
            </p>

            <div className="pt-2 text-xs text-kabut-dark flex items-center gap-2">
              <span className="text-tunas font-medium">Krevia Digital</span>
              <span>•</span>
              <span>Inisiatif Lingkungan 2026</span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Jelajahi Platform
            </h4>
            <ul className="space-y-2 text-xs text-kabut-light/80">
              <li>
                <Link to="/" className="hover:text-bara transition">Beranda & Simulasi Waktu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-bara transition">Tentang Karhutla & Gambut</Link>
              </li>
              <li>
                <Link to="/konten" className="hover:text-bara transition">Grafik Tren, Peta & Artikel</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-bara transition">Aksi Nyata, Lapor & Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Kanal Pelaporan Resmi Pemerintah */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-tunas" />
              <span>Kanal Pelaporan Resmi</span>
            </h4>
            <p className="text-xs text-kabut-dark leading-relaxed">
              Jika menemukan titik kebakaran di sekitar Anda, segera laporkan ke kanal penanganan bencana negara:
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a 
                  href="https://sipongi.menlhk.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-kabut-light hover:text-white group"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>SiPongi+ (Kementerian Kehutanan RI)</span>
                  <ExternalLink className="w-3 h-3 text-kabut-dark" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.lapor.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-kabut-light hover:text-white group"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>SP4N LAPOR! Pengaduan Nasional</span>
                  <ExternalLink className="w-3 h-3 text-kabut-dark" />
                </a>
              </li>
              <li>
                <a 
                  href="https://bnpb.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-kabut-light hover:text-white group"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>BNPB (Pusdalops Penanggulangan Bencana)</span>
                  <ExternalLink className="w-3 h-3 text-kabut-dark" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Data Sources Citation Block */}
        <div className="pt-8 border-t border-arang/40 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Transparansi Sumber Data & Metodologi
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {daftarSumber.map((sumber, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-arang/30 border border-arang/50 space-y-1 text-kabut-dark"
              >
                <div className="text-[10px] text-bara font-mono uppercase tracking-wider">
                  {sumber.kategori}
                </div>
                <div className="text-kabut-light font-medium">{sumber.nama}</div>
                <div className="text-[11px] leading-relaxed">{sumber.catatan}</div>
                <div className="text-[10px] text-kabut-dark pt-1 font-mono">
                  Akses data: {sumber.diaksesPada}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Team attribution */}
        <div className="pt-6 border-t border-arang/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-kabut-dark">
          <p>
            © 2026 <strong>Langit Kelabu</strong>. Seluruh hak cipta dilindungi. Dibuat oleh <strong className="text-kabut-light">Krevia Digital</strong>.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-kabut-dark">Media: <strong className="text-kabut-light font-mono">@kreviadigital</strong></span>
            <span>•</span>
            <span className="text-tunas flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tunas inline-block" />
              <span>Dirancang untuk Lomba Web Lingkungan 2026</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

