import React, { lazy, Suspense } from 'react';
import ArticleCard from '../components/ArticleCard';
import Gallery from '../components/Gallery';
import ActionChecklist from '../components/ActionChecklist';
import LoadingFallback from '../components/LoadingFallback';
import { BarChart3, MapPin, BookOpen, Camera, CheckSquare } from 'lucide-react';

const HotspotChart = lazy(() => import('../components/HotspotChart'));
const HotspotMap = lazy(() => import('../components/HotspotMap'));

const artikelData = [
  {
    kategori: "Kesehatan Publik",
    judul: "Ancaman Halus Partikulat PM2.5: Lonjakan Kasus ISPA pada Anak dan Lansia",
    ringkasan: "Pembakaran bahan organik gambut menghasilkan partikel aerosol berukuran di bawah 2,5 mikrometer yang mampu menembus alveolus paru hingga peredaran darah. Selama periode kabut asap Agustus–September 2026, puskesmas di Kalimantan dan Sumatera mencatat peningkatan kunjungan ISPA lebih dari 140%.",
    bacaMenit: 4,
    tanggal: "Oktober 2026",
    sumberRujukan: "Dinas Kesehatan Provinsi & Kemenkes RI",
    poinKunci: "Partikel PM2.5 asap gambut mengandung polisiklik aromatik hidrokarbon (PAH) dengan risiko iritasi mukosa kronis.",
  },
  {
    kategori: "Sosio-Ekonomi & Pendidikan",
    judul: "Lumpuhnya Produktivitas Daerah: Kerugian Ekonomi dan Hari Belajar yang Hilang",
    ringkasan: "Studi CELIOS 2026 mengestimasi kerugian makro karhutla mencapai Rp39,3 T hingga Rp123,1 triliun. Angka ini mencakup biaya pengobatan darurat, kompensasi gangguan penerbangan komersial, hilangnya jam kerja buruh harian lepas, serta penutupan tatap muka di ratusan sekolah dasar.",
    bacaMenit: 5,
    tanggal: "Oktober 2026",
    sumberRujukan: "Center of Economic and Law Studies (CELIOS)",
    poinKunci: "Kalimantan Barat menanggung beban ekonomi lokal tertinggi dengan estimasi dampak sekitar Rp5,7 triliun.",
  },
  {
    kategori: "Pemulihan & Sains Gambut",
    judul: "Dari Water-Bombing ke Restorasi: Kenapa Penyekatan Kanal Menjadi Kunci Permanen",
    ringkasan: "Operasi helikopter water-bombing menghabiskan puluhan miliar rupiah per musim namun sering kali hanya membasahi kanopi. Pakar hidrologi gambut menekankan prinsip 3R BRGM (Rewetting, Revegetation, Revitalization) melalui ribuan sekat kanal untuk mengembalikan sifat basah alami rawa gambut.",
    bacaMenit: 4,
    tanggal: "November 2026",
    sumberRujukan: "Badan Restorasi Gambut dan Mangrove (BRGM)",
    poinKunci: "Tinggi muka air tanah harus dijaga maksimal -40 cm agar lapisan atas gambut tidak mengalami dehidrasi eksplosif.",
  },
];

export default function Konten() {
  return (
    <div className="w-full min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arang/70 border border-kabut/20 text-kabut text-xs uppercase tracking-wider font-mono">
          <BarChart3 className="w-3.5 h-3.5 text-bara" />
          <span>Arsip Data & Dokumentasi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-bricolage text-white tracking-tight">
          Eksplorasi Data, Dampak, dan Solusi
        </h1>
        <p className="text-sm sm:text-base text-kabut-light/85 max-w-prose-70 mx-auto font-light leading-relaxed">
          Semua analisis didasarkan pada laporan satelit pemantauan karhutla resmi, evaluasi dampak sosio-ekonomi independen, dan kesaksian di lapangan.
        </p>
      </section>

      {/* 1. VISUALISASI DATA: GRAFIK & PETA */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Suspense fallback={<LoadingFallback message="Menyiapkan grafik serial waktu..." />}>
            <HotspotChart />
          </Suspense>

          <Suspense fallback={<LoadingFallback message="Memuat peta geospasial provinsi..." />}>
            <HotspotMap />
          </Suspense>
        </div>
      </section>

      {/* 2. TIGA ARTIKEL RINGKAS TEMA KARHUTLA */}
      <section className="space-y-8">
        <div className="border-b border-arang/70 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-bara font-semibold">
            Telaah Mendalam
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-white mt-1">
            Tiga Dimensi Krisis: Kesehatan, Ekonomi, dan Ekologi
          </h2>
          <p className="text-xs sm:text-sm text-kabut-dark max-w-prose-70 mt-1">
            Ulasan terstruktur yang dapat disunting untuk kebutuhan materi presentasi dan edukasi publik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artikelData.map((art, idx) => (
            <ArticleCard key={idx} {...art} />
          ))}
        </div>
      </section>

      {/* 3. GALERI FOTO */}
      <section className="space-y-8">
        <Gallery />
      </section>

      {/* 4. AKSI NYATA CHECKLIST */}
      <section className="space-y-8">
        <ActionChecklist />
      </section>
    </div>
  );
}
