# Langit Kelabu — Krevia Digital

> *"Saat hutan terbakar, langit yang menjawab."*

Platform visualisasi data interaktif dan literasi publik mengenai krisis **kebakaran hutan dan lahan (karhutla)** serta ekosistem rawa gambut di Indonesia tahun 2026. Dirancang untuk kompetisi website bertema lingkungan dengan pendekatan empati visual, akurasi data bersumber, dan aksi nyata terukur.

---

## 🌿 Ringkasan Isu & Latar Belakang

Kebakaran hutan dan lahan di Indonesia memiliki karakteristik unik yang berbeda dari kebakaran hutan subtropis:
1. **Kebakaran Bawah Tanah (*Smoldering Fire*)**: Api merayap lambat di lapisan organik gambut sedalam 1–4 meter tanpa nyala api terbuka, membuat siraman air permukaan (*water-bombing*) kerap tidak efektif.
2. **Kabut Asap Pekat (*Haze*)**: Partikulat halus beracun PM2.5 menyelimuti kota-kota di Kalimantan dan Sumatera hingga berminggu-minggu, memicu lonjakan kasus ISPA, meliburkan sekolah, dan melumpuhkan ekonomi lokal.
3. **Puncak Krisis 2026**: Pada awal September 2026, satelit SiPongi mencatat lonjakan hingga **14.581 titik panas dalam 24 jam**, dan Kementerian Kehutanan mencatat lebih dari **107.465 hektare** terbakar pada Semester I 2026.

---

## ✨ Fitur Unggulan Antarmuka

### 1. Intro Sinematik Layar Penuh (100dvh)
- Video latar resolusi 720p kabut asap pekat Kalimantan dengan format ganda MP4 (H.264) & WebM (VP9).
- Layer partikel kabut 3D (*SmokeScene*) dan percikan bara api 3D (*FireEmberScene*) yang bergerak menggunakan **Three.js / React Three Fiber**.
- Transisi *fade-to-kabut* saat pengguna menggulir layar, mensimulasikan kabut asap yang perlahan menipis masuk ke dashboard data.
- Kontrol lengkap: *Lewati Intro*, *Bisu/Suara*, dan tombol *Lanjutkan*.

### 2. Simulasi Waktu Interaktif (*Time Slider*)
- Garis waktu kronologis 9 titik pantau: **3 Jun** (467 titik) hingga puncak **3 Sep** (14.581 titik).
- Gradien warna langit dinamis: berubah dari abu-abu tipis Juni ke jingga gambut Juli/Agustus, hingga merah darah pekat September.
- Matahari berubah menjadi merah membara dengan pendaran halo.
- Tombol putar otomatis (*Timelapse*) dan tabel data alternatif bagi pembaca layar.

### 3. Simulator 3D Penampang Lahan Gambut (*Peat3DViewer*)
- Potongan kubus 3D interaktif yang dapat **diklik dan diputar 360°** (*OrbitControls*).
- Menampilkan visualisasi tiga zona:
  - **Permukaan (0–30 cm)**: Semak dan tajuk pohon yang terbakar.
  - **Gambut Kering (30–150 cm)**: Lapisan berserat porus kaya karbon purba.
  - **Bara Bawah Tanah (150–400 cm)**: Kantong bara *smoldering* bersuhu 450°C–600°C dengan percikan bara yang menyelinap dari celah tanah.

### 4. Dashboard Data & Peta Geospasial
- **Grafik Tren (Recharts)**: Memisahkan hotspot harian 24 jam, hotspot *high confidence*, dan luas hektare kumulatif agar tidak mencampuradukkan metodologi satelit.
- **Peta 6 Provinsi Prioritas (Leaflet)**: Pemetaan titik api di Kalteng, Kalbar, Kalsel, Riau, Sumsel, dan Jambi dengan radius marker proporsional.

### 5. Tiga Artikel Mendalam & Galeri Foto
- Ulasan sains kesehatan (PM2.5 & ISPA), valuasi dampak sosio-ekonomi CELIOS 2026, dan solusi hidrologi restorasi kanal gambut BRGM.
- Galeri dokumentasi lapangan dengan modal pratinjau aksesibel (dukungan tombol `Escape`).

### 6. 5 Aksi Nyata & Kanal Pelaporan Resmi
- Panduan praktis: pantau ISPU Net, masker standar N95/KN95, larangan bakar lahan, pelaporan via SP4N-LAPOR!/BNPB, dan dukungan restorasi sekat kanal.
- Formulir kontak relawan dengan validasi *inline*, penanganan fokus, dan umpan balik submit.

---

## 🎨 Desain & Palet Warna

| Elemen | Hex Code | Makna Filosofis |
| :--- | :--- | :--- |
| **Abu Kabut** | `#C9C2B8` | Asap pekat yang mengaburkan cakrawala |
| **Gambut** | `#3B2A20` | Tanah organik purba penyimpan karbon |
| **Bara** | `#D8432B` | Api smoldering bawah permukaan |
| **Arang** | `#2B2F33` | Sisa vegetasi dan arang biomassa |
| **Tunas** | `#5E8C61` | Simbol harapan, pemulihan, dan restorasi ekosistem |

- **Tipografi**: *Bricolage Grotesque* (Judul & Heading) dan *Instrument Sans* (Teks Isi/Body).
- **Aksesibilitas**: Standar WCAG 2.2 AA (Target sentuh ≥44px, kontras ≥4.5:1, skip-to-content, dan toggle reduksi animasi).

---

## 🚀 Teknologi yang Digunakan

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Grafik & Visualisasi**: [Recharts](https://recharts.org/)
- **Peta Interaktif**: [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)

---

## 💻 Panduan Menjalankan di Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/Albertchristiann14/isulingkungan.git
   cd isulingkungan
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di peramban Anda.

4. **Uji build produksi:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi dengan file `vercel.json` untuk mendukung routing SPA:
```bash
npm install -g vercel
vercel
```
Atau hubungkan repositori GitHub ini langsung melalui dashboard [Vercel](https://vercel.com).

---

## 📊 Sumber Data & Transparansi
- **SiPongi+** — Kementerian Kehutanan Republik Indonesia
- **Databoks** — Katadata Indonesia
- **CELIOS** — Center of Economic and Law Studies
- **BNPB & Kepolisian Negara Republik Indonesia**

---

*Dibuat dengan dedikasi untuk edukasi lingkungan dan perlindungan masa depan bumi oleh **Krevia Digital**.*

