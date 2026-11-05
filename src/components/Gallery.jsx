import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, X } from 'lucide-react';

const galeriItems = [
  {
    id: 1,
    judul: "Asap Mengurung Kota Pontianak",
    lokasi: "Pontianak, Kalimantan Barat",
    tanggal: "Agustus 2026",
    kredit: "Dokumentasi Krevia Digital / Relawan Karhutla",
    keterangan: "Jarak pandang mendatar menyusut di bawah 300 meter pada pagi hari akibat asap kebakaran gambut yang terbawa angin darat.",
    kategori: "Kualitas Udara",
  },
  {
    id: 2,
    judul: "Manggala Agni Menembus Bara Gambut",
    lokasi: "Palangka Raya, Kalimantan Tengah",
    tanggal: "September 2026",
    kredit: "Satgas Karhutla Kemenhut / Antara",
    keterangan: "Petugas menggunakan nosel suntik gambut bertekanan tinggi untuk menginjeksi air sedalam 2 meter ke kantong bara bawah tanah.",
    kategori: "Pemadaman Lapangan",
  },
  {
    id: 3,
    judul: "Sekat Kanal Penjaga Kelembapan Lahan",
    lokasi: "Kabupaten Siak, Riau",
    tanggal: "Juli 2026",
    kredit: "Badan Restorasi Gambut & Mangrove (BRGM)",
    keterangan: "Konstruksi sekat kanal kayu untuk menahan air di kubah gambut agar muka air tanah tetap terjaga di atas batas kritis -40 cm.",
    kategori: "Restorasi Gambut",
  },
  {
    id: 4,
    judul: "Pembagian Masker N95 di Sekolah",
    lokasi: "Sampit, Kotawaringin Timur",
    tanggal: "September 2026",
    kredit: "Inisiatif Masyarakat & Relawan Medis",
    keterangan: "Distribusi masker partikulat bagi anak-anak sekolah sebelum aktivitas belajar mengajar dipindahkan ke pembelajaran daring.",
    kategori: "Kesehatan Publik",
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-arang/70 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-bricolage text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-bara" aria-hidden="true" />
            <span>Dokumentasi Visual Lapangan</span>
          </h3>
          <p className="text-xs text-kabut-dark">
            Rekaman visual situasi nyata penanganan kabut asap dan upaya restorasi di garis depan.
          </p>
        </div>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {galeriItems.map((item) => (
          <div
            key={item.id}
            tabIndex={0}
            role="button"
            aria-label={`Buka pratinjau foto: ${item.judul}`}
            onClick={() => setSelectedPhoto(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPhoto(item);
              }
            }}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#14110F] border border-arang hover:border-bara/50 transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-bara active:scale-[0.98]"
          >
            {/* Visual Box Placeholder */}
            <div className="relative aspect-video w-full bg-gradient-to-tr from-[#121416] via-[#3B2A20] to-[#2B2F33] flex items-center justify-center p-4 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D8432B_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />
              
              <div className="relative z-10 text-center space-y-1">
                <span className="inline-block px-2.5 py-1 rounded-full bg-black/65 text-[10px] font-mono text-kabut-light border border-kabut/20">
                  {item.kategori}
                </span>
                <p className="text-xs font-semibold text-white/90 group-hover:text-bara transition-colors">
                  [Foto: {item.judul}]
                </p>
              </div>

              <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-kabut opacity-0 group-hover:opacity-100 transition" aria-hidden="true">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Photo Metadata & Caption */}
            <div className="p-4 space-y-2 text-xs flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm font-bricolage group-hover:text-bara transition-colors">
                  {item.judul}
                </h4>
                <p className="text-kabut-dark text-[11px] font-mono mt-0.5">
                  {item.lokasi} • {item.tanggal}
                </p>
                <p className="text-kabut-light/75 text-xs mt-2 line-clamp-2">
                  {item.keterangan}
                </p>
              </div>

              <div className="pt-2 border-t border-arang/50 text-[10px] text-kabut-dark truncate">
                Kredit: {item.kredit}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Modal Lightbox */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-photo-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#14110F] border border-arang rounded-2xl overflow-hidden shadow-2xl space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-arang/60 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-bara font-bold">
                  {selectedPhoto.kategori}
                </span>
                <h3 id="modal-photo-title" className="text-xl font-bold font-bricolage text-white">
                  {selectedPhoto.judul}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-arang text-kabut hover:text-white transition active:scale-95 focus-visible:ring-2 focus-visible:ring-bara"
                aria-label="Tutup pratinjau foto"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-[#3B2A20] to-[#121416] border border-arang flex flex-col items-center justify-center p-6 text-center">
              <Camera className="w-10 h-10 text-bara mb-2 animate-pulse" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">{selectedPhoto.judul}</p>
              <p className="text-xs text-kabut-dark font-mono mt-1">
                {selectedPhoto.lokasi} • {selectedPhoto.tanggal}
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-kabut-light">
              <p className="leading-relaxed">{selectedPhoto.keterangan}</p>
              <p className="text-xs text-kabut-dark border-t border-arang/50 pt-2 font-mono">
                Kredit & Hak Cipta: {selectedPhoto.kredit}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
