import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, HeartHandshake, Shield, Instagram, Mail, Loader2 } from 'lucide-react';
import { profilTim } from '../data/sources';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kategori: 'Relawan Literasi',
    pesan: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'nama':
        if (!value.trim()) return 'Nama lengkap wajib diisi.';
        if (value.trim().length < 3) return 'Nama minimal 3 karakter.';
        return null;
      case 'email':
        if (!value.trim()) return 'Alamat email wajib diisi.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Format email tidak valid (contoh: nama@domain.com).';
        return null;
      case 'pesan':
        if (!value.trim()) return 'Pesan atau gagasan kolaborasi wajib diisi.';
        if (value.trim().length < 15) return 'Pesan minimal 15 karakter agar konteks jelas.';
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      nama: validateField('nama', formData.nama),
      email: validateField('email', formData.email),
      pesan: validateField('pesan', formData.pesan),
    };

    setTouched({ nama: true, email: true, pesan: true });
    setErrors(newErrors);

    if (newErrors.nama || newErrors.email || newErrors.pesan) {
      // Focus first error field for accessibility
      const firstInvalidField = Object.keys(newErrors).find((k) => newErrors[k]);
      if (firstInvalidField) {
        const el = document.getElementById(firstInvalidField);
        if (el) el.focus();
      }
      return;
    }

    setIsSubmitting(true);
    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        nama: '',
        email: '',
        kategori: 'Relawan Literasi',
        pesan: '',
      });
      setTouched({});
      setErrors({});
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6 bg-[#14110F] p-6 sm:p-8 rounded-2xl border border-arang shadow-xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tunas/20 border border-tunas/40 text-tunas text-xs font-mono uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ajakan Berjejaring</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-bricolage text-white leading-snug">
            Bergabung Bersama Gerakan Sadar Karhutla
          </h3>

          <p className="text-xs sm:text-sm text-kabut-light/80 leading-relaxed">
            Apakah Anda jurnalis warga, peneliti lingkungan, relawan pembagi masker, atau pemuda yang ingin memperluas kampanye sains gambut? Kirimkan pesan atau ajakan kerja sama kepada tim Krevia Digital.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-3 pt-4 border-t border-arang/70 text-xs">
          <a
            href="mailto:kontak@krevia.digital"
            className="flex items-center gap-3 p-3 rounded-xl bg-arang/40 hover:bg-arang border border-arang/60 text-kabut-light transition min-h-[44px] active:scale-95"
            aria-label="Kirim email ke kontak@krevia.digital"
          >
            <Mail className="w-4 h-4 text-bara shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] text-kabut-dark block font-mono">Email Resmi</span>
              <span className="font-semibold text-white">{profilTim.mediaSosial.email}</span>
            </div>
          </a>

          <a
            href="https://instagram.com/kreviadigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-arang/40 hover:bg-arang border border-arang/60 text-kabut-light transition min-h-[44px] active:scale-95"
            aria-label="Kunjungi Instagram @kreviadigital (tab baru)"
          >
            <Instagram className="w-4 h-4 text-pink-400 shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] text-kabut-dark block font-mono">Media Sosial</span>
              <span className="font-semibold text-white">{profilTim.mediaSosial.instagram}</span>
            </div>
          </a>
        </div>

        {/* Emergency Disclaimer */}
        <div className="p-4 rounded-xl bg-bara/10 border border-bara/30 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-bara font-bold">
            <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Peringatan Keadaan Darurat Api</span>
          </div>
          <p className="text-kabut-light/85 text-[11px] leading-relaxed">
            Formulir ini bukan nomor darurat penanganan kebakaran. Untuk insiden aktif kebakaran lahan dekat pemukiman, hubungi posko damkar terdekat atau layanan darurat nasional 112.
          </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7 bg-[#14110F] p-6 sm:p-8 rounded-2xl border border-arang shadow-xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4" role="status" aria-live="polite">
            <div className="w-14 h-14 rounded-full bg-tunas/20 border border-tunas flex items-center justify-center mx-auto text-tunas">
              <CheckCircle className="w-7 h-7" aria-hidden="true" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-bricolage text-white">
              Pesan Berhasil Terkirim!
            </h4>
            <p className="text-xs sm:text-sm text-kabut-light/85 max-w-md mx-auto leading-relaxed">
              Terima kasih atas kepedulian Anda terhadap krisis karhutla. Tim <strong>Krevia Digital</strong> akan meninjau pesan Anda dan merespons via email dalam kurun waktu 1–2 hari kerja.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-full bg-arang hover:bg-arang-light text-xs font-semibold text-white transition min-h-[44px] active:scale-95 mt-2"
            >
              Kirim Pesan Lainnya
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
            <h4 className="text-lg font-bold font-bricolage text-white border-b border-arang/60 pb-3">
              Kirim Masukan, Koreksi Data, atau Ajakan Relawan
            </h4>

            {/* Nama Field */}
            <div>
              <label htmlFor="nama" className="block text-xs font-mono uppercase tracking-wider text-kabut-light mb-1.5">
                Nama Lengkap <span className="text-bara" aria-hidden="true">*</span>
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                autoComplete="name"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                onBlur={() => handleBlur('nama')}
                aria-required="true"
                aria-invalid={Boolean(errors.nama)}
                aria-describedby={errors.nama ? 'nama-error' : undefined}
                placeholder="misal: Rian Pratama"
                className={`w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-arang/60 border ${
                  errors.nama ? 'border-bara focus-visible:ring-bara' : 'border-arang focus-visible:ring-bara'
                } text-white text-xs sm:text-sm placeholder-kabut-dark focus:outline-none`}
              />
              {errors.nama && (
                <p id="nama-error" role="alert" className="text-[11px] text-bara mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.nama}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-kabut-light mb-1.5">
                Alamat Email <span className="text-bara" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="nama@email.com"
                className={`w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-arang/60 border ${
                  errors.email ? 'border-bara focus-visible:ring-bara' : 'border-arang focus-visible:ring-bara'
                } text-white text-xs sm:text-sm placeholder-kabut-dark focus:outline-none`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-[11px] text-bara mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Topik / Kategori Field */}
            <div>
              <label htmlFor="kategori" className="block text-xs font-mono uppercase tracking-wider text-kabut-light mb-1.5">
                Tujuan / Topik Diskusi
              </label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={(e) => handleChange('kategori', e.target.value)}
                className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-arang/60 border border-arang text-white text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-bara"
              >
                <option value="Relawan Literasi">Relawan & Edukasi Publik</option>
                <option value="Koreksi Data">Koreksi Data / Sumber Riset</option>
                <option value="Kolaborasi Kampus">Kolaborasi Komunitas / Kampus</option>
                <option value="Pertanyaan Umum">Pertanyaan Umum Lainnya</option>
              </select>
            </div>

            {/* Pesan Field */}
            <div>
              <label htmlFor="pesan" className="block text-xs font-mono uppercase tracking-wider text-kabut-light mb-1.5">
                Isi Pesan <span className="text-bara" aria-hidden="true">*</span>
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                value={formData.pesan}
                onChange={(e) => handleChange('pesan', e.target.value)}
                onBlur={() => handleBlur('pesan')}
                aria-required="true"
                aria-invalid={Boolean(errors.pesan)}
                aria-describedby={errors.pesan ? 'pesan-error' : undefined}
                placeholder="Tuliskan gagasan, pertanyaan, atau masukan Anda..."
                className={`w-full px-4 py-2.5 rounded-xl bg-arang/60 border ${
                  errors.pesan ? 'border-bara focus-visible:ring-bara' : 'border-arang focus-visible:ring-bara'
                } text-white text-xs sm:text-sm placeholder-kabut-dark focus:outline-none resize-none`}
              />
              {errors.pesan && (
                <p id="pesan-error" role="alert" className="text-[11px] text-bara mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.pesan}</span>
                </p>
              )}
            </div>

            {/* Submit Button (44px min target) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-bara hover:bg-bara-dark disabled:opacity-60 text-white font-semibold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-bara/25 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Mengirim pesan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Kirim Pesan Sekarang</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
