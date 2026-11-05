import React from 'react';
import { 
  Wind, 
  ShieldAlert, 
  Flame, 
  PhoneCall, 
  Sprout, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

const daftarAksi = [
  {
    icon: Wind,
    judul: "Pantau Kualitas Udara Secara Berkala",
    deskripsi: "Cek indeks standar pencemar udara (ISPU Net KLHK atau IQAir) setiap pagi sebelum beraktivitas di luar ruangan. Hindari olahraga luar ruangan saat ISPU masuk kategori Tidak Sehat (kuning/merah).",
    langkah: "Pasang aplikasi ISPU Net resmi Kementerian Lingkungan Hidup dan Kehutanan.",
    link: "https://ispu.menlhk.go.id/",
    linkText: "Buka ISPU Net KLHK",
  },
  {
    icon: ShieldAlert,
    judul: "Gunakan Masker Partikulat N95 / KN95",
    deskripsi: "Masker kain biasa dan masker bedah bedah tidak mampu menyaring partikel mikroskopis PM2.5 yang terkandung dalam asap pembakaran gambut. Pastikan masker menempel rapat (seal test) pada wajah.",
    langkah: "Sediakan cadangan masker standar N95/FFP2 terutama bagi anak, lansia, dan penderita asma.",
    link: null,
    linkText: null,
  },
  {
    icon: Flame,
    judul: "Hentikan Praktik Pembakaran Lahan & Sampah",
    deskripsi: "Pembakaran sekecil apa pun di musim kemarau di atas lahan organik dapat memicu kobaran yang tak terkendali. Terapkan metode Pembukaan Lahan Tanpa Bakar (PLTB) dengan perajangan biomassa menjadi pupuk kompos alami.",
    langkah: "Tolak dan ingatkan siapa pun yang membakar sampah daun kering di lingkungan pemukiman.",
    link: null,
    linkText: null,
  },
  {
    icon: PhoneCall,
    judul: "Laporkan Titik Api ke Satgas & Kanal Resmi",
    deskripsi: "Jangan menunda. Laporkan segera koordinat lokasi atau patokan fisik kebakaran terdekat kepada posko Manggala Agni, BPBD setempat, atau call center darurat kebencanaan 112 / SP4N LAPOR!.",
    langkah: "Hubungi posko pemadam kebakaran setempat atau lapor via aplikasi LAPOR! 1708.",
    link: "https://www.lapor.go.id/",
    linkText: "Lapor via SP4N-LAPOR!",
  },
  {
    icon: Sprout,
    judul: "Dukung Restorasi & Penyekatan Kanal Gambut",
    deskripsi: "Solusi permanen karhutla adalah mengembalikan air ke lahan gambut (rewetting). Dukung inisiatif Badan Restorasi Gambut dan Mangrove (BRGM) serta kelompok masyarakat peduli api dalam pembangunan sekat kanal.",
    langkah: "Sebarkan informasi edukasi sains gambut dan dukung pendanaan restorasi bentang alam rawa gambut.",
    link: "https://brgm.go.id/",
    linkText: "Ketahui Program BRGM RI",
  },
];

export default function ActionChecklist() {
  return (
    <div className="w-full bg-gambut-deep border border-arang rounded-2xl p-6 sm:p-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-tunas font-semibold">
          Langkah Partisipasi
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-bricolage text-white">
          5 Aksi Nyata yang Dapat Kita Lakukan Hari Ini
        </h3>
        <p className="text-xs sm:text-sm text-kabut-light/80 max-w-prose-70 mx-auto">
          Penanganan krisis karhutla membutuhkan kolaborasi antara penegakan regulasi, kesiapan medis warga, dan pemulihan ekosistem jangka panjang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daftarAksi.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-arang/30 border border-arang/70 hover:border-tunas/50 transition duration-300 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-arang flex items-center justify-center text-tunas border border-kabut/10">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-kabut-dark">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="text-base font-bold font-bricolage text-white">
                  {item.judul}
                </h4>

                <p className="text-xs text-kabut-light/80 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-arang/50 space-y-2">
                <div className="flex items-start gap-1.5 text-xs text-kabut">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tunas shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight text-kabut-light/90">{item.langkah}</span>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-tunas-light hover:text-white font-medium pt-1 group"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {/* Highlight Card: Harapan Bersama */}
        <div className="flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-gradient-to-br from-gambut to-tunas/20 border border-tunas/40 space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-tunas-light font-bold">
              Simbol Harapan
            </span>
            <h4 className="text-lg font-bold font-bricolage text-white">
              Menjaga Gambut Basah, Mengembalikan Langit Biru
            </h4>
            <p className="text-xs text-kabut-light/85 leading-relaxed">
              Gambut tropis Indonesia menyimpan lebih dari 57 gigaton karbon. Memulihkan kebasahannya adalah salah satu kontribusi iklim terbesar yang dapat diwariskan generasi ini untuk bumi.
            </p>
          </div>

          <div className="pt-3 border-t border-tunas/30 text-xs text-tunas-light font-medium">
            #LangitKelabuKembaliBiru • Krevia Digital
          </div>
        </div>
      </div>
    </div>
  );
}

