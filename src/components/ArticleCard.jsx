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
    <article className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E0D6] hover:border-bara/50 transition-all duration-200 shadow-soft hover:shadow-soft-lg">
      <div className="space-y-4">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FAF8F5] text-gambut border border-[#E6E0D6]">
            {kategori}
          </span>
          <div className="flex items-center gap-2 text-xs text-[#5C646D] font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gambut-muted" />
              <span>{bacaMenit} mnt</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gambut-muted" />
              <span>{tanggal}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-bricolage text-[#181C1F] hover:text-bara transition-colors leading-snug">
          {judul}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
          {ringkasan}
        </p>

        {/* Key Takeaways */}
        {poinKunci && (
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] text-xs text-[#333A40] space-y-1 mt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-bara font-bold block">
              Fakta & Data Kunci
            </span>
            <p className="font-medium text-[#181C1F]">{poinKunci}</p>
          </div>
        )}
      </div>

      {/* Footer reference source */}
      <div className="pt-5 mt-5 border-t border-[#EFECE6] flex items-center justify-between text-xs text-gambut-muted">
        <span className="truncate">Rujukan: {sumberRujukan}</span>
        <button 
          className="flex items-center gap-1 text-bara hover:text-bara-dark font-bold transition min-h-[36px]"
          aria-label={`Ulasan ${judul}`}
        >
          <span>Ulasan</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
