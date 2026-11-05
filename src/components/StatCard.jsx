import React from 'react';
import { Database, Calendar, TrendingUp } from 'lucide-react';

export default function StatCard({
  angka,
  label,
  periode,
  sumber,
  deskripsi,
  tag,
}) {
  return (
    <div className="relative group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#14110F]/90 border border-arang/80 hover:border-bara/50 transition-all duration-200 shadow-xl hover:shadow-bara/10">
      {/* Top Tag & Period */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-arang/80 text-kabut-light border border-kabut/10">
            {tag}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-kabut-dark font-mono">
            <Calendar className="w-3.5 h-3.5 text-kabut-dark" aria-hidden="true" />
            <span>{periode}</span>
          </div>
        </div>

        {/* Big Key Number */}
        <div className="pt-2">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-bricolage text-white tracking-tight text-glow-bara tabular-nums">
            {angka}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-kabut-light mt-1.5 leading-snug">
            {label}
          </h3>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-kabut-light/80 leading-relaxed pt-1 max-w-prose-70">
          {deskripsi}
        </p>
      </div>

      {/* Source Citation at Bottom */}
      <div className="pt-5 mt-5 border-t border-arang/70 flex items-center justify-between text-xs text-kabut-dark">
        <div className="flex items-center gap-1.5 truncate">
          <Database className="w-3.5 h-3.5 text-bara/80 shrink-0" aria-hidden="true" />
          <span className="truncate">Sumber: {sumber}</span>
        </div>
      </div>
    </div>
  );
}
