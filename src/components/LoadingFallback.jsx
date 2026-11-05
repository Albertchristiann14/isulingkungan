import React from 'react';

export default function LoadingFallback({ message = "Memuat visualisasi data..." }) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-gambut-deep/60 rounded-xl border border-arang/40 text-kabut">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-arang border-t-bara animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-kabut animate-spin animation-delay-150"></div>
      </div>
      <p className="text-sm font-medium tracking-wide text-kabut-light/80">{message}</p>
      <span className="text-xs text-kabut-dark mt-1">Langit Kelabu • Krevia Digital</span>
    </div>
  );
}

