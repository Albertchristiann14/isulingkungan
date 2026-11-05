import React from 'react';
import { Database, Calendar } from 'lucide-react';

export default function StatCard({
  angka,
  label,
  periode,
  sumber,
  deskripsi,
  tag,
}) {
  return (
    <div className="relative group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E0D6] hover:border-bara/50 transition-all duration-200 shadow-soft hover:shadow-soft-lg">
      {/* Top Tag & Period */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-[#FAF8F5] text-gambut border border-[#E6E0D6]">
            {tag}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#5C646D] font-mono">
            <Calendar className="w-3.5 h-3.5 text-gambut-muted" aria-hidden="true" />
            <span>{periode}</span>
          </div>
        </div>

        {/* Big Key Number */}
        <div className="pt-2">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-bricolage text-[#181C1F] tracking-tight tabular-nums">
            {angka}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-bara mt-1.5 leading-snug">
            {label}
          </h3>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-[#495057] leading-relaxed pt-1 max-w-prose-70">
          {deskripsi}
        </p>
      </div>

      {/* Source Citation at Bottom */}
      <div className="pt-5 mt-5 border-t border-[#EFECE6] flex items-center justify-between text-xs text-gambut-muted">
        <div className="flex items-center gap-1.5 truncate">
          <Database className="w-3.5 h-3.5 text-bara shrink-0" aria-hidden="true" />
          <span className="truncate">Sumber: {sumber}</span>
        </div>
      </div>
    </div>
  );
}
