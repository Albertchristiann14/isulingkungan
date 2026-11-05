import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Flame, Layers, AlertCircle, Users, Sprout, ShieldAlert, Award } from 'lucide-react';
import { luasPerProvinsiJanJun } from '../data/hotspot';
import { profilTim } from '../data/sources';
import LoadingFallback from '../components/LoadingFallback';

const Peat3DViewer = lazy(() => import('../components/Peat3DViewer'));

export default function About() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE4] border border-[#DDD5C7] text-gambut text-xs uppercase tracking-wider font-mono font-bold">
          <Layers className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
          <span>Konsep & Latar Belakang</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bricolage text-[#181C1F] tracking-tight">
          Memahami Anatomi Krisis Karhutla & Lahan Gambut
        </h1>
        <p className="text-sm sm:text-base text-[#495057] max-w-prose-70 mx-auto font-normal leading-relaxed">
          Mengapa kebakaran di Indonesia memiliki karakter unik yang berbeda dari kebakaran hutan subtropis di belahan bumi lain? Jawabannya terletak di bawah tanah: ekosistem rawa gambut.
        </p>
      </section>

      {/* Grid: Karakter Fisik & Mekanisme Bawah Tanah */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E0D6] space-y-4 flex flex-col justify-between shadow-soft">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-bara font-bold">
              Karakter Fisik
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
              Apa Itu Karhutla?
            </h2>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              Kebakaran Hutan dan Lahan (Karhutla) adalah peristiwa terbakarnya vegetasi di kawasan hutan maupun lahan budidaya. Di Indonesia, fenomena ini didominasi oleh kebakaran di atas tanah organik gambut (*peatland fire*) yang menghasilkan emisi partikulat pekat dan gas rumah kaca dalam skala masif.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] text-xs text-gambut-muted">
            <strong className="text-[#181C1F] font-bold block mb-1">Ciri Khas Indonesia:</strong>
            Kebakaran bukan semata-mata api tajuk daun kering, melainkan bara bawah permukaan (*ground fire*) yang melepaskan senyawa hidrokarbon tak terbakar sempurna.
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E0D6] space-y-4 flex flex-col justify-between shadow-soft">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
              Mekanisme Bawah Tanah
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
              Kenapa Gambut Membuat Api Sulit Padam?
            </h2>
            <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
              Gambut yang telah dikeringkan oleh kanal-kanal buatan kehilangan daya ikat airnya dan berubah menjadi spons hidrokarbon kering. Api merambat lambat di kedalaman 1 hingga 4 meter tanpa nyala api yang terlihat (*smoldering*). Satu hembusan angin atau celah oksigen mikro dapat mengaktifkan kembali bara yang telah tertidur berminggu-minggu.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] text-xs text-gambut-muted">
            <strong className="text-amber-800 font-bold block mb-1">Tantangan Lapangan:</strong>
            Penyiraman permukaan sering menguap sebelum menyentuh kantong bara aktif. Pemadaman membutuhkan jarum suntik gambut khusus dengan ribuan liter air per titik.
          </div>
        </div>
      </section>

      {/* 3D INTERACTIVE PEAT CORE SIMULATOR (Bright Studio Mode) */}
      <section className="space-y-4">
        <Suspense fallback={<LoadingFallback message="Menyiapkan simulasi 3D penampang gambut..." />}>
          <Peat3DViewer />
        </Suspense>
      </section>

      {/* Penyebab & Siapa yang Terdampak */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E6E0D6] space-y-8 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-bara font-bold">
              Faktor Pemicu
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
              Penyebab Utama Karhutla 2026
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#495057]">
              <li className="flex items-start gap-2.5">
                <span className="text-bara font-bold">•</span>
                <span><strong>Pembukaan Lahan Murah:</strong> Metode tebas-bakar (*slash and burn*) masih dipilih sejumlah pihak karena menelan biaya hanya sekitar 10–20% dibandingkan pembersihan mekanis menggunakan alat berat.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-bara font-bold">•</span>
                <span><strong>Kemarau Panjang & Anomali Iklim:</strong> Suhu rata-rata yang lebih tinggi dan penurunan curah hujan mempercepat penurunan tinggi muka air tanah gambut melewati batas kritis 40 cm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-bara font-bold">•</span>
                <span><strong>Kanalisasi Tak Terkendali:</strong> Pembuatan parit pembuangan air di sekitar konsesi menyebabkan kubah gambut terkuras dan kering kerontang.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-tunas font-bold">
              Dampak Kemanusiaan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
              Siapa yang Menanggung Dampaknya?
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#495057]">
              <li className="flex items-start gap-2.5">
                <span className="text-tunas font-bold">•</span>
                <span><strong>Kelompok Rentan:</strong> Anak-anak usia dini, ibu hamil, dan lansia mengalami lonjakan infeksi saluran pernapasan akut (ISPA) dengan ancaman gangguan fungsi paru jangka panjang.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-tunas font-bold">•</span>
                <span><strong>Siswa & Dunia Pendidikan:</strong> Sekolah di kota-kota terdampak terpaksa diliburkan atau beralih ke pembelajaran jarak jauh saat indeks polusi udara melampaui ambang batas berbahaya.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-tunas font-bold">•</span>
                <span><strong>Perekonomian Lokal:</strong> Pembatalan penerbangan, terganggunya jalur pelayaran sungai, serta mandeknya pasar tradisional menurunkan roda ekonomi mikro daerah.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Resmi Kemenhut 2026 */}
      <section className="space-y-6">
        <div className="border-b border-[#E6E0D6] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-bara font-bold">
            Rekam Data Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-[#181C1F] mt-1">
            Data Karhutla Indonesia Januari–Juni 2026
          </h2>
          <p className="text-xs sm:text-sm text-gambut-muted max-w-prose-70 mt-1">
            Kementerian Kehutanan mencatat 107.465 hektare terbakar pada Januari–Juni 2026. Kalimantan Barat menempati urutan terluas, disusul Riau. Per awal November 2026, Kalimantan Tengah menjadi fokus operasi pemadaman terpadu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {luasPerProvinsiJanJun.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E6E0D6] text-center space-y-1 shadow-soft hover:border-bara/40 transition">
              <span className="text-xs text-gambut-muted block font-medium truncate">{item.provinsi}</span>
              <span className="text-xl font-bold font-bricolage text-[#181C1F] block tabular-nums">
                {Math.round(item.hektare).toLocaleString('id-ID')} ha
              </span>
              <span className="text-[11px] text-bara font-mono font-semibold">
                {item.persentase}% dari total
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Profil Tim Krevia Digital & Misi Website */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-white to-[#F2EDE4] border border-[#E6E0D6] space-y-6 shadow-soft">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Karya Lomba Web Lingkungan 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-bricolage text-[#181C1F]">
            Tentang Krevia Digital & Misi Website
          </h2>

          <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
            {profilTim.deskripsi}
          </p>

          <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
            <strong>Misi Website Ini:</strong> Memberikan ruang hening bagi masyarakat untuk merenungi dampak kebakaran hutan secara mendalam tanpa sensasionalisme. Dengan menyajikan visualisasi atmosfer berbasis sains satelit, kami percaya empati yang lahir dari data terpercaya akan menggerakkan aksi nyata yang berkelanjutan.
          </p>
        </div>
      </section>
    </div>
  );
}
