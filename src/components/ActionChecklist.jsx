import React, { useState } from 'react';
import { 
  Wind, 
  ShieldAlert, 
  Flame, 
  PhoneCall, 
  Sprout, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Sparkles,
  HelpCircle,
  ChevronDown,
  RotateCcw,
  Check,
  Zap,
  Heart
} from 'lucide-react';

const aksiList = [
  {
    id: 1,
    icon: Wind,
    kategori: "Kesehatan Diri",
    judul: "Pantau Indeks Kualitas Udara (ISPU)",
    durasi: "1 Menit",
    dampak: "Sangat Tinggi",
    biaya: "Gratis",
    ringkasan: "Ketahui kondisi udara sebelum melangkah keluar rumah.",
    detail: "Partikel asap gambut PM2.5 tidak selalu terlihat kasat mata di siang hari. Pantau aplikasi resmi ISPU Net KLHK atau IQAir setiap pagi. Jika angka menunjukkan kategori 'Tidak Sehat' (kuning/merah), batasi aktivitas fisik berat di luar ruangan.",
    tips: "Tutup ventilasi jendela saat angin membawa asap masuk dan gunakan air purifier sederhana bila memungkinkan.",
    link: "https://ispu.menlhk.go.id/",
    linkText: "Buka ISPU Net KLHK",
  },
  {
    id: 2,
    icon: ShieldAlert,
    kategori: "Kesehatan Diri",
    judul: "Gunakan Masker Partikulat N95 / KN95",
    durasi: "Seketika",
    dampak: "Perlindungan 95%",
    biaya: "Terjangkau",
    ringkasan: "Masker kain biasa tidak mampu menyaring aerosol PM2.5.",
    detail: "Partikulat asap gambut berukuran mikroskopis (<2.5 mikron) dan mengandung senyawa karsinogenik PAH. Masker kain atau masker bedah biasa memiliki pori terlalu besar. Hanya respirator bersertifikat N95, KN95, atau KF94 dengan kerapatan tepi wajah (*fit test*) yang dapat melindungi alveolus paru-paru.",
    tips: "Pastikan kawat hidung ditekan rapat agar tidak ada celah udara bocor dari samping hidung.",
    link: null,
    linkText: null,
  },
  {
    id: 3,
    icon: Flame,
    kategori: "Aksi Lingkungan",
    judul: "Hentikan Praktik Pembakaran Lahan & Sampah",
    durasi: "Komitmen Nyata",
    dampak: "Pencegahan Total",
    biaya: "Gratis",
    ringkasan: "Satu puntung rokok atau sampah bakar dapat membakar hektaran gambut.",
    detail: "Metode Pembukaan Lahan Tanpa Bakar (PLTB) memanfaatkan perajangan vegetasi secara mekanis menjadi pupuk kompos alami. Di musim kemarau, jangan pernah membakar serasah daun atau sampah di halaman, karena tanah gambut kering di bawahnya bisa terbakar diam-diam.",
    tips: "Buat lubang biopori atau wadah kompos daun daripada membakarnya.",
    link: null,
    linkText: null,
  },
  {
    id: 4,
    icon: PhoneCall,
    kategori: "Pelaporan",
    judul: "Laporkan Titik Api ke Satgas & Posko Resmi",
    durasi: "3 Menit",
    dampak: "Respon Cepat",
    biaya: "Bebas Pulsa",
    ringkasan: "Deteksi dini mencegah bara merayap ke bawah tanah.",
    detail: "Menemukan kepulan asap atau api liar di sekitar Anda? Ambil foto, catat patokan lokasi, dan hubungi call center darurat kebencanaan 112, posko Manggala Agni, atau aplikasi pengaduan nasional SP4N LAPOR! 1708.",
    tips: "Semakin cepat laporan masuk dalam 1–2 jam pertama, semakin besar peluang api dipadamkan sebelum menjadi kebakaran bawah tanah.",
    link: "https://www.lapor.go.id/",
    linkText: "Lapor via SP4N-LAPOR!",
  },
  {
    id: 5,
    icon: Sprout,
    kategori: "Aksi Lingkungan",
    judul: "Dukung Restorasi & Penyekatan Kanal Gambut",
    durasi: "Jangka Panjang",
    dampak: "Solusi Permanen",
    biaya: "Donasi / Edukasi",
    ringkasan: "Kembalikan kodrat basah alami rawa gambut Indonesia.",
    detail: "Sains hidrologi membuktikan bahwa gambut yang basah tidak bisa terbakar. Dukung program 3R BRGM (Rewetting, Revegetation, Revitalization) dan kelompok relawan masyarakat peduli api dalam membangun ribuan sekat kanal penahan air.",
    tips: "Bagikan infografik edukasi sains gambut di media sosial untuk membangun kesadaran kolektif.",
    link: "https://brgm.go.id/",
    linkText: "Pelajari Program BRGM RI",
  },
];

const mitosFaktaList = [
  {
    pertanyaan: "Apakah masker bedah atau kain biasa sudah cukup untuk kabut asap karhutla?",
    jawabanBenar: false,
    fakta: "SALAH! Partikel asap gambut PM2.5 berukuran hingga 30x lebih kecil dari sehelai rambut. Masker kain hanya menyaring debu kasar, sedangkan partikel PM2.5 tetap lolos masuk ke kantong udara paru-paru. Anda memerlukan masker standar partikulat N95/KN95.",
  },
  {
    pertanyaan: "Apakah siraman air helikopter (water-bombing) bisa memadamkan api gambut hingga tuntas?",
    jawabanBenar: false,
    fakta: "MITOS! Siraman ribuan liter air dari helikopter hanya membasahi lapisan luar kanopi dan permukaan. Di lahan gambut, bara api bersuhu 500°C merayap di kedalaman 1–4 meter. Pemadaman membutuhkan jarum suntik bertekanan tinggi langsung ke dalam tanah.",
  },
  {
    pertanyaan: "Apakah tanah gambut Indonesia menyimpan salah satu cadangan karbon terbesar di dunia?",
    jawabanBenar: true,
    fakta: "BENAR! Rawa gambut tropis Indonesia menyimpan lebih dari 57 gigaton karbon—setara 20x lipat cadangan karbon hutan mineral biasa. Saat terbakar, cadangan karbon purba yang terperangkap ribuan tahun terlepas ke atmosfer dalam bentuk emisi gas rumah kaca.",
  },
  {
    pertanyaan: "Apakah mayoritas kebakaran hutan di Indonesia terjadi murni karena faktor alamiah kemarau?",
    jawabanBenar: false,
    fakta: "SALAH! Catatan kepolisian dan Kementerian Kehutanan menunjukkan lebih dari 90% kebakaran dipicu aktivitas pembukaan lahan oleh manusia menggunakan api murah, yang kemudian tak terkendali akibat kondisi kemarau panjang.",
  },
];

export default function ActionChecklist() {
  const [completedIds, setCompletedIds] = useState([1]);
  const [activeTab, setActiveTab] = useState('Semua');
  const [openCardId, setOpenCardId] = useState(1);
  const [revealedQuiz, setRevealedQuiz] = useState({});

  const toggleAction = (id) => {
    setCompletedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const progressPercent = Math.round((completedIds.length / aksiList.length) * 100);

  const getScoreBadge = () => {
    const count = completedIds.length;
    if (count === 5) return { title: "Pahlawan Langit Biru! 🏆", desc: "Luar biasa! Anda siap melindungi diri dan berkontribusi penuh bagi kelestarian udara.", color: "bg-emerald-500 text-white" };
    if (count >= 3) return { title: "Penjaga Udara Aktif! 🥈", desc: "Keren! Anda telah mengambil langkah penting mengurangi risiko karhutla.", color: "bg-bara text-white" };
    if (count >= 1) return { title: "Langkah Awal Siaga! 🥉", desc: "Awal yang bagus! Yuk centang aksi lainnya untuk perlindungan maksimal.", color: "bg-amber-500 text-white" };
    return { title: "Mulai Aksimu Hari Ini", desc: "Centang aksi di bawah yang siap Anda jalankan!", color: "bg-[#2B2F33] text-white" };
  };

  const badge = getScoreBadge();

  const filteredAksi = activeTab === 'Semua' 
    ? aksiList 
    : aksiList.filter(a => a.kategori === activeTab);

  return (
    <div className="w-full space-y-12">
      {/* 1. INTERACTIVE READINESS SCOREBOARD */}
      <div className="bg-white border border-[#E6E0D6] rounded-3xl p-6 sm:p-10 shadow-soft-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFECE6] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>Tantangan Interaktif Warga Siaga</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-bricolage text-[#181C1F]">
              Seberapa Siap Kamu Menghadapi Dampak Karhutla?
            </h3>
            <p className="text-xs sm:text-sm text-gambut-muted">
              Centang langkah-langkah di bawah yang telah atau siap kamu jalankan untuk menaikkan skor kesiapanmu!
            </p>
          </div>

          {/* Gamified Score Pill */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] shrink-0">
            <div className="w-12 h-12 rounded-xl bg-bara/10 border border-bara/30 flex items-center justify-center text-bara">
              <Award className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-gambut-muted uppercase block">Kesiapan Pribadi</span>
              <span className="text-xl font-bold font-bricolage text-[#181C1F] tabular-nums">
                {completedIds.length} <span className="text-xs font-normal text-gambut-muted">dari 5 Aksi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Progress Bar with feedback */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${badge.color}`}>
              {badge.title}
            </span>
            <span className="text-gambut-muted font-mono font-bold tabular-nums">
              {progressPercent}% Siap
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#EFECE6] overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-bara via-amber-500 to-[#3D7845] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-xs text-[#5C646D] leading-relaxed">
            {badge.desc}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {['Semua', 'Kesehatan Diri', 'Aksi Lingkungan', 'Pelaporan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition min-h-[38px] ${
                activeTab === cat
                  ? 'bg-bara text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#5C646D] border border-[#E6E0D6] hover:bg-[#F2EDE4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {filteredAksi.map((item) => {
            const Icon = item.icon;
            const isCompleted = completedIds.includes(item.id);
            const isOpen = openCardId === item.id;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-sm' 
                    : 'bg-[#FAF8F5] border-[#E6E0D6] hover:border-bara/40 hover:bg-white'
                }`}
              >
                <div className="space-y-4">
                  {/* Top info row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white border border-[#E6E0D6] text-gambut-muted">
                      {item.kategori}
                    </span>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#5C646D]">
                      <span>{item.durasi}</span>
                      <span>•</span>
                      <span className="font-semibold text-bara">{item.dampak}</span>
                    </div>
                  </div>

                  {/* Title & Check trigger */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleAction(item.id)}
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isCompleted
                          ? 'bg-[#3D7845] border-[#3D7845] text-white shadow-sm'
                          : 'bg-white border-[#C9C2B8] hover:border-bara text-transparent'
                      }`}
                      aria-label={isCompleted ? `Tandai belum: ${item.judul}` : `Tandai sudah: ${item.judul}`}
                      aria-pressed={isCompleted}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="flex-1">
                      <h4 className={`text-base font-bold font-bricolage leading-snug ${
                        isCompleted ? 'text-emerald-950 line-through decoration-emerald-500/60' : 'text-[#181C1F]'
                      }`}>
                        {item.judul}
                      </h4>
                      <p className="text-xs text-[#5C646D] mt-1 leading-relaxed">
                        {item.ringkasan}
                      </p>
                    </div>
                  </div>

                  {/* Expandable detail */}
                  {isOpen && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#E6E0D6] text-xs text-[#495057] space-y-2 animate-in fade-in duration-200">
                      <p className="leading-relaxed">{item.detail}</p>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-900 text-[11px]">
                        <strong>💡 Tips Praktis: </strong>{item.tips}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer action buttons */}
                <div className="pt-4 mt-4 border-t border-[#EFECE6] flex items-center justify-between text-xs">
                  <button
                    onClick={() => setOpenCardId(isOpen ? null : item.id)}
                    className="flex items-center gap-1 text-[#5C646D] hover:text-[#181C1F] font-semibold py-1"
                  >
                    <span>{isOpen ? 'Tutup Detail' : 'Baca Penjelasan Lengkap'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-bara hover:text-bara-dark font-bold group"
                    >
                      <span>{item.linkText}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. PLAYFUL MINI QUIZ: MITOS VS FAKTA KARHUTLA */}
      <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
            <span>Kuis Edukatif Interaktif</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-bricolage text-[#181C1F]">
            Mitos vs Fakta Seputar Karhutla & Gambut
          </h3>
          <p className="text-xs sm:text-sm text-gambut-muted">
            Klik kartu di bawah untuk membuka fakta sains sesungguhnya di balik kesalahpahaman umum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mitosFaktaList.map((quiz, i) => {
            const isRevealed = revealedQuiz[i];

            return (
              <div
                key={i}
                onClick={() => setRevealedQuiz(prev => ({ ...prev, [i]: !prev[i] }))}
                className="cursor-pointer p-5 rounded-2xl bg-white border border-[#E6E0D6] hover:border-bara/50 transition-all duration-200 space-y-3 shadow-2xs hover:shadow-soft"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setRevealedQuiz(prev => ({ ...prev, [i]: !prev[i] }));
                  }
                }}
                aria-expanded={isRevealed}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-gambut-muted font-bold">Pernyataan #{i + 1}</span>
                  <span className="text-bara font-semibold flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    <span>{isRevealed ? 'Klik untuk tutup' : 'Klik untuk lihat fakta'}</span>
                  </span>
                </div>

                <p className="text-sm font-bold font-bricolage text-[#181C1F] leading-snug">
                  “{quiz.pertanyaan}”
                </p>

                {isRevealed ? (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed animate-in fade-in duration-200 ${
                    quiz.jawabanBenar 
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' 
                      : 'bg-red-50 text-red-950 border border-red-200'
                  }`}>
                    {quiz.fakta}
                  </div>
                ) : (
                  <div className="text-[11px] text-[#5C646D] italic flex items-center gap-1">
                    <span>Sentuh untuk menguji wawasanmu...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
