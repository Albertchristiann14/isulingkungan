import React from 'react';
import { Clock, BookOpen, ExternalLink, Calendar } from 'lucide-react';

export default function ArticleCard({
  kategori,
  judul,
  ringkasan,
  bacaMenit,
  tanggal,
  sumberRujukan,
  poinKunci,
}) {
  return (
    <article className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gambut-deep/90 border border-arang hover:border-bara/40 transition duration-300 shadow-md">
      <div className="space-y-3">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-arang text-kabut-light border border-kabut/10">
            {kategori}
          </span>
          <div className="flex items-center gap-2 text-xs text-kabut-dark">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{bacaMenit} mnt</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{tanggal}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold font-bricolage text-white hover:text-bara transition-colors leading-snug">
          {judul}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-kabut-light/80 leading-relaxed">
          {ringkasan}
        </p>

        {/* Key Takeaways */}
        {poinKunci && (
          <div className="p-3 rounded-xl bg-arang/40 border border-arang/70 text-xs text-kabut space-y-1 mt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-bara font-semibold block">
              Fakta & Data Kunci
            </span>
            <p className="text-kabut-light">{poinKunci}</p>
          </div>
        )}
      </div>

      {/* Footer reference source */}
      <div className="pt-4 mt-4 border-t border-arang/60 flex items-center justify-between text-xs text-kabut-dark">
        <span className="truncate">Rujukan: {sumberRujukan}</span>
        <button 
          className="flex items-center gap-1 text-bara hover:text-bara-glow font-medium transition"
          aria-label={`Baca ulasan lengkap tentang ${judul}`}
        >
          <span>Ulasan</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </article>
  );
}

