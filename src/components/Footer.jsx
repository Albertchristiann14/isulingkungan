import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Heart, Mail } from 'lucide-react';
import { daftarSumber, profilTim } from '../data/sources';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F2EDE4] border-t border-[#E2DAD0] text-[#495057] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Brand & Official Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gambut border border-bara/40 flex items-center justify-center shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-bara" />
              </div>
              <span className="font-bricolage text-2xl font-bold text-[#181C1F] tracking-tight">
                Langit Kelabu
              </span>
            </div>

            <p className="text-sm italic text-gambut font-serif font-medium">
              “Saat hutan terbakar, langit yang menjawab.”
            </p>

            <p className="text-xs text-[#5C646D] leading-relaxed max-w-prose-70">
              Platform visualisasi data dan literasi publik mengenai kebakaran hutan dan lahan (karhutla) serta lahan gambut di Indonesia. Didesain secara tenang, objektif, dan berpijak pada data terverifikasi.
            </p>

            <div className="pt-2 text-xs text-gambut-muted flex items-center gap-2">
              <span className="text-tunas font-bold">Krevia Digital</span>
              <span>•</span>
              <span>Inisiatif Lingkungan 2026</span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#181C1F] font-bold">
              Jelajahi Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#495057]">
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
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#181C1F] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-tunas" />
              <span>Kanal Pelaporan Resmi</span>
            </h4>
            <p className="text-xs text-[#5C646D] leading-relaxed">
              Jika menemukan titik kebakaran di sekitar Anda, segera laporkan ke kanal penanganan bencana negara:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://sipongi.menlhk.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#333A40] hover:text-bara group font-medium"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>SiPongi+ (Kementerian Kehutanan RI)</span>
                  <ExternalLink className="w-3 h-3 text-gambut-muted" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.lapor.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#333A40] hover:text-bara group font-medium"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>SP4N LAPOR! Pengaduan Nasional</span>
                  <ExternalLink className="w-3 h-3 text-gambut-muted" />
                </a>
              </li>
              <li>
                <a 
                  href="https://bnpb.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#333A40] hover:text-bara group font-medium"
                >
                  <span className="text-bara group-hover:translate-x-0.5 transition-transform">›</span>
                  <span>BNPB (Pusdalops Kebencanaan)</span>
                  <ExternalLink className="w-3 h-3 text-gambut-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Data Sources Citation Block */}
        <div className="pt-8 border-t border-[#E2DAD0] space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#181C1F] font-bold">
            Transparansi Sumber Data & Metodologi
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {daftarSumber.map((sumber, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border border-[#E6E0D6] space-y-1 text-[#5C646D] shadow-2xs"
              >
                <div className="text-[10px] text-bara font-mono uppercase tracking-wider font-bold">
                  {sumber.kategori}
                </div>
                <div className="text-[#181C1F] font-bold text-xs">{sumber.nama}</div>
                <div className="text-[11px] leading-relaxed">{sumber.catatan}</div>
                <div className="text-[10px] text-gambut-muted pt-1 font-mono">
                  Akses data: {sumber.diaksesPada}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Team attribution */}
        <div className="pt-6 border-t border-[#E2DAD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C646D]">
          <p>
            © 2026 <strong>Langit Kelabu</strong>. Seluruh hak cipta dilindungi. Dibuat oleh <strong className="text-[#181C1F]">Krevia Digital</strong>.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[#5C646D]">Media: <strong className="text-[#181C1F] font-mono">@kreviadigital</strong></span>
            <span>•</span>
            <span className="text-tunas font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tunas inline-block" />
              <span>Lomba Website Isu Global 2026</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
