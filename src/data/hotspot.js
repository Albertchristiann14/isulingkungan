// Langit Kelabu by Krevia Digital: data karhutla 2026
// Sumber: SiPongi Kementerian Kehutanan, Databoks (Katadata), CELIOS, Kepolisian RI
// Diperbarui per 5 November 2026

// 1) Titik panas per 24 jam, SEMUA tingkat kepercayaan (rendah+sedang+tinggi)
//    Sumber: SiPongi/KLHK lewat Databoks (Katadata)
export const hotspotHarian = [
  { tanggal: "2026-06-03", label: "3 Jun", jumlah: 467, bulan: "Juni" },
  { tanggal: "2026-06-15", label: "15 Jun", jumlah: 414, bulan: "Juni" },
  { tanggal: "2026-06-26", label: "26 Jun", jumlah: 660, bulan: "Juni" },
  { tanggal: "2026-07-10", label: "10 Jul", jumlah: 1458, bulan: "Juli" },
  { tanggal: "2026-07-26", label: "26 Jul", jumlah: 3670, bulan: "Juli" },
  { tanggal: "2026-08-06", label: "6 Agu", jumlah: 1762, bulan: "Agustus" },
  { tanggal: "2026-09-03", label: "3 Sep", jumlah: 14581, bulan: "September" },
  { tanggal: "2026-09-05", label: "5 Sep", jumlah: 14567, bulan: "September" },
  { tanggal: "2026-09-11", label: "11 Sep", jumlah: 12062, bulan: "September" },
];

// 2) Titik panas tingkat kepercayaan TINGGI saja (ukuran lebih ketat, satelit Terra/Aqua/SNPP)
//    Sumber: SiPongi Kementerian Kehutanan (via Okezone, The Edge Malaysia)
export const hotspotTinggi = [
  { tanggal: "2026-10-12", label: "12 Okt", jumlah: 1085 },
  { tanggal: "2026-10-13", label: "13 Okt", jumlah: 244 },
  { tanggal: "2026-10-28", label: "28 Okt", jumlah: 118 },
  { tanggal: "2026-10-29", label: "29 Okt", jumlah: 154 },
  { tanggal: "2026-10-31", label: "31 Okt", jumlah: 96 },
  { tanggal: "2026-11-01", label: "1 Nov", jumlah: 100 },
];

// 3) Luas area terbakar (hektare), kumulatif tahun 2026. Sumber: SiPongi Kemenhut
export const luasKumulatif = [
  { periode: "Jan–Mei", hektare: 81077, formatted: "81.077 ha" },
  { periode: "Jan–Jun", hektare: 107465.47, formatted: "107.465 ha" },
  { periode: "Jan–Jul", hektare: 202004.3, formatted: "202.004 ha" },
  { periode: "Jan–Agu", hektare: 202010.96, formatted: "202.010 ha" },
];

export const luasPerProvinsiJanJun = [
  { provinsi: "Kalimantan Barat", hektare: 28680.47, persentase: 26.7 },
  { provinsi: "Riau", hektare: 15477.95, persentase: 14.4 },
  { provinsi: "Nusa Tenggara Timur", hektare: 10538.30, persentase: 9.8 },
  { provinsi: "Maluku", hektare: 7091.07, persentase: 6.6 },
  { provinsi: "Papua Selatan", hektare: 6281.81, persentase: 5.8 },
];

export const luasPerProvinsiJanAgu = [
  { provinsi: "Kalimantan Barat", hektare: 38310.86, persentase: 19.0 },
  { provinsi: "Papua Selatan", hektare: 25838.53, persentase: 12.8 },
  { provinsi: "Kepulauan Riau (ke-10)", hektare: 5760.90, persentase: 2.9 },
];

// Hotspot di 6 provinsi prioritas pada puncak 3 Sep 2026 (total 263 titik). Sumber: Bernama / SiPongi
export const enamProvinsiPrioritas = [
  { provinsi: "Kalimantan Tengah", titik: 70, coords: [-1.4300, 113.2944] },
  { provinsi: "Kalimantan Barat", titik: 61, coords: [-0.1322, 111.0969] },
  { provinsi: "Kalimantan Selatan", titik: 56, coords: [-2.9288, 115.3701] },
  { provinsi: "Riau", titik: 30, coords: [0.5071, 101.4478] },
  { provinsi: "Sumatera Selatan", titik: 26, coords: [-3.3194, 104.9147] },
  { provinsi: "Jambi", titik: 20, coords: [-1.6101, 103.6131] },
];

// Dampak ekonomi dan kesehatan Jan–Agu 2026. Sumber: kajian CELIOS (Center of Economic and Law Studies)
export const dampak = {
  biayaEkonomiKesehatanRp: "Rp39,29 T – Rp123,1 T",
  biayaEkonomiKesehatanDetail: "Estimasi kerugian gabungan sektor kesehatan, produktivitas kerja, dan kompensasi lingkungan hidup.",
  dampakEkonomiKalbarRp: "Rp5,7 triliun",
  biayaKesehatanProvinsi: [
    { provinsi: "Nusa Tenggara Barat", rp: "Rp19,01 triliun" },
    { provinsi: "Jawa Timur", rp: "Rp13,65 triliun" },
    { provinsi: "Riau", rp: "Rp10,31 triliun" },
  ],
};

// Penegakan hukum, 1 Jan–3 Sep 2026. Sumber: Bernama (Kepolisian Negara RI)
export const penegakanHukum = {
  kasus: 167,
  tersangka: 112,
  motifUtama: "Pembukaan lahan perkebunan & pertanian",
};

// 3 Angka Kunci untuk Dashboard Ringkasan
export const angkaKunci = [
  {
    angka: "14.581",
    label: "Titik Panas Harian Puncak",
    periode: "3 September 2026",
    sumber: "SiPongi KLHK via Databoks",
    deskripsi: "Lonjakan drastis dalam 24 jam di masa puncak kemarau, naik lebih dari 30× lipat dibanding awal Juni.",
    tag: "Eskalasi Titik Panas"
  },
  {
    angka: "107.465 ha",
    label: "Luas Lahan Terbakar (Jan–Jun)",
    periode: "Semester I 2026",
    sumber: "Kementerian Kehutanan RI",
    deskripsi: "Kalimantan Barat mencatat area terluas (28.680 ha), disusul Riau (15.477 ha) dan NTT (10.538 ha).",
    tag: "Luas Area Terbakar"
  },
  {
    angka: "Rp39,3 T – 123,1 T",
    label: "Estimasi Biaya Ekonomi & Kesehatan",
    periode: "Januari – Agustus 2026",
    sumber: "Kajian CELIOS 2026",
    deskripsi: "Kerugian akibat penurunan produktivitas tenaga kerja, pengobatan ISPA massal, serta kerusakan keanekaragaman hayati.",
    tag: "Beban Ekonomi & Manusia"
  },
];

export const catatanWajib =
  "Catatan penting: Titik panas (hotspot) adalah indikasi anomali suhu thermal dari satelit penginderaan jauh, bukan jumlah kebakaran maupun luas hektare yang terbakar. Seluruh titik panas memerlukan validasi dan pemeriksaan terestrial (groundcheck) oleh Manggala Agni dan tim satgas di lapangan.";

