import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arang/70 border border-kabut/20 text-kabut text-xs uppercase tracking-wider font-mono">
          <MessageSquare className="w-3.5 h-3.5 text-bara" />
          <span>Hubungi & Berjejaring</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-bricolage text-white tracking-tight">
          Terhubung dengan Krevia Digital
        </h1>
        <p className="text-sm sm:text-base text-kabut-light/85 max-w-prose-70 mx-auto font-light leading-relaxed">
          Kirimkan tanggapan, koreksi data lapangan, pertanyaan seputar kompetisi, atau tawaran kolaborasi advokasi lingkungan bersama kami.
        </p>
      </section>

      {/* Contact Form & Volunteer Box */}
      <ContactForm />
    </div>
  );
}

