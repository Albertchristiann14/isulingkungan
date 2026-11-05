import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { hotspotHarian, hotspotTinggi, luasKumulatif } from '../data/hotspot';
import { AlertCircle, Table as TableIcon } from 'lucide-react';

export default function HotspotChart() {
  const [activeDataset, setActiveDataset] = useState('harian');
  const [showTable, setShowTable] = useState(false);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white border border-[#E6E0D6] p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-mono text-[#181C1F] font-bold">{label}</p>
          <p className="text-bara font-bold text-sm tabular-nums">
            {data.value.toLocaleString('id-ID')}{' '}
            <span className="text-xs font-normal text-[#5C646D]">
              {activeDataset === 'luas' ? 'hektare' : 'titik'}
            </span>
          </p>
          <p className="text-[10px] text-gambut-muted">
            {activeDataset === 'harian' && 'Semua tingkat kepercayaan (rendah/sedang/tinggi)'}
            {activeDataset === 'tinggi' && 'Khusus satelit SNPP/Terra/Aqua kepercayaan tinggi'}
            {activeDataset === 'luas' && 'Kumulatif luas lahan terbakar resmi Kemenhut'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white border border-[#E6E0D6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
      {/* Control Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE6] pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-bricolage text-[#181C1F]">
            Grafik Tren Anomali Suhu & Luas Terbakar
          </h3>
          <p className="text-xs text-gambut-muted mt-0.5">
            Data dipisah sesuai metodologi sensor satelit dan satuan luas resmi.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF8F5] rounded-2xl border border-[#E6E0D6]" role="tablist">
          <button
            role="tab"
            aria-selected={activeDataset === 'harian'}
            onClick={() => setActiveDataset('harian')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition min-h-[38px] flex items-center ${
              activeDataset === 'harian'
                ? 'bg-bara text-white shadow-sm'
                : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            Hotspot 24 Jam
          </button>
          <button
            role="tab"
            aria-selected={activeDataset === 'tinggi'}
            onClick={() => setActiveDataset('tinggi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition min-h-[38px] flex items-center ${
              activeDataset === 'tinggi'
                ? 'bg-bara text-white shadow-sm'
                : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            Confidence Tinggi
          </button>
          <button
            role="tab"
            aria-selected={activeDataset === 'luas'}
            onClick={() => setActiveDataset('luas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition min-h-[38px] flex items-center ${
              activeDataset === 'luas'
                ? 'bg-bara text-white shadow-sm'
                : 'text-[#5C646D] hover:text-[#181C1F]'
            }`}
          >
            Luas Terbakar (ha)
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[320px] sm:h-[380px] w-full pt-2" aria-label="Grafik data karhutla">
        <ResponsiveContainer width="100%" height="100%">
          {activeDataset === 'harian' ? (
            <AreaChart data={hotspotHarian} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="baraLightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D8432B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D8432B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
              <XAxis dataKey="label" stroke="#7A7267" fontSize={11} tickLine={false} />
              <YAxis stroke="#7A7267" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="jumlah"
                name="Titik Panas"
                stroke="#D8432B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#baraLightGrad)"
              />
            </AreaChart>
          ) : activeDataset === 'tinggi' ? (
            <BarChart data={hotspotTinggi} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
              <XAxis dataKey="label" stroke="#7A7267" fontSize={11} tickLine={false} />
              <YAxis stroke="#7A7267" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="jumlah" name="Hotspot Tingkat Tinggi" fill="#D8432B" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <BarChart data={luasKumulatif} margin={{ top: 10, right: 20, left: 15, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
              <XAxis dataKey="periode" stroke="#7A7267" fontSize={11} tickLine={false} />
              <YAxis stroke="#7A7267" fontSize={11} tickLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k ha`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hektare" name="Luas Lahan Terbakar (ha)" fill="#5A4335" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footnote & Table Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gambut-muted pt-3 border-t border-[#EFECE6]">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-bara shrink-0" aria-hidden="true" />
          {activeDataset === 'harian' && (
            <span>Sumber: SiPongi/KLHK via Databoks Katadata. 3 Jun – 11 Sep 2026.</span>
          )}
          {activeDataset === 'tinggi' && (
            <span>Sumber: SiPongi Kementerian Kehutanan. 12 Okt – 1 Nov 2026 (SNPP/Terra ≥80%).</span>
          )}
          {activeDataset === 'luas' && (
            <span>Sumber: SiPongi Kementerian Kehutanan. Periode kumulatif Januari – Agustus 2026.</span>
          )}
        </div>

        <button
          onClick={() => setShowTable(!showTable)}
          className="inline-flex items-center gap-1.5 text-bara hover:text-bara-dark font-bold p-1 min-h-[36px]"
          aria-expanded={showTable}
        >
          <TableIcon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{showTable ? 'Sembunyikan Tabel' : 'Buka Tabel Data'}</span>
        </button>
      </div>

      {/* Accessible Table alternative */}
      {showTable && (
        <div className="mt-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D6] text-xs overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#E6E0D6] text-gambut-muted font-mono font-bold">
                <th className="py-2 px-3">Label / Periode</th>
                <th className="py-2 px-3 text-right">Nilai Angka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-[#181C1F]">
              {(activeDataset === 'harian' ? hotspotHarian : activeDataset === 'tinggi' ? hotspotTinggi : luasKumulatif).map((row, i) => (
                <tr key={i} className="hover:bg-white/80">
                  <td className="py-2 px-3 font-mono">{row.label || row.periode}</td>
                  <td className="py-2 px-3 text-right font-bold tabular-nums text-bara">
                    {(row.jumlah || row.hektare).toLocaleString('id-ID')} {activeDataset === 'luas' ? 'ha' : 'titik'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
