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
        <div className="bg-[#14110F] border border-arang p-3.5 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-mono text-kabut-light font-semibold">{label}</p>
          <p className="text-bara font-bold text-sm tabular-nums">
            {data.value.toLocaleString('id-ID')}{' '}
            <span className="text-xs font-normal text-kabut">
              {activeDataset === 'luas' ? 'hektare' : 'titik'}
            </span>
          </p>
          <p className="text-[10px] text-kabut-dark">
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
    <div className="w-full bg-[#14110F]/90 border border-arang rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
      {/* Control Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-arang/70 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-bricolage text-white">
            Grafik Tren Anomali Suhu & Luas Lahan Terbakar
          </h3>
          <p className="text-xs text-kabut-dark mt-0.5">
            Data dipisah sesuai metodologi sensor satelit dan satuan luas resmi.
          </p>
        </div>

        {/* Tab Buttons (44px min hit targets) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-arang/70 rounded-xl" role="tablist">
          <button
            role="tab"
            aria-selected={activeDataset === 'harian'}
            onClick={() => setActiveDataset('harian')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition min-h-[38px] flex items-center ${
              activeDataset === 'harian'
                ? 'bg-bara text-white shadow-md'
                : 'text-kabut-light hover:text-white'
            }`}
          >
            Hotspot 24 Jam
          </button>
          <button
            role="tab"
            aria-selected={activeDataset === 'tinggi'}
            onClick={() => setActiveDataset('tinggi')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition min-h-[38px] flex items-center ${
              activeDataset === 'tinggi'
                ? 'bg-bara text-white shadow-md'
                : 'text-kabut-light hover:text-white'
            }`}
          >
            Confidence Tinggi
          </button>
          <button
            role="tab"
            aria-selected={activeDataset === 'luas'}
            onClick={() => setActiveDataset('luas')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition min-h-[38px] flex items-center ${
              activeDataset === 'luas'
                ? 'bg-bara text-white shadow-md'
                : 'text-kabut-light hover:text-white'
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
                <linearGradient id="baraChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D8432B" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#D8432B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2B2F33" vertical={false} />
              <XAxis dataKey="label" stroke="#9E978D" fontSize={11} tickLine={false} />
              <YAxis stroke="#9E978D" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="jumlah"
                name="Titik Panas"
                stroke="#D8432B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#baraChartGradient)"
              />
            </AreaChart>
          ) : activeDataset === 'tinggi' ? (
            <BarChart data={hotspotTinggi} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2B2F33" vertical={false} />
              <XAxis dataKey="label" stroke="#9E978D" fontSize={11} tickLine={false} />
              <YAxis stroke="#9E978D" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="jumlah" name="Hotspot Tingkat Tinggi" fill="#D8432B" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <BarChart data={luasKumulatif} margin={{ top: 10, right: 20, left: 15, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2B2F33" vertical={false} />
              <XAxis dataKey="periode" stroke="#9E978D" fontSize={11} tickLine={false} />
              <YAxis stroke="#9E978D" fontSize={11} tickLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k ha`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hektare" name="Luas Lahan Terbakar (ha)" fill="#5A4335" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Dataset Footnote & Table Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-kabut-dark pt-3 border-t border-arang/50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-bara shrink-0" aria-hidden="true" />
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
          className="inline-flex items-center gap-1.5 text-kabut-light hover:text-white font-medium p-1 min-h-[36px]"
          aria-expanded={showTable}
        >
          <TableIcon className="w-3.5 h-3.5 text-bara" aria-hidden="true" />
          <span>{showTable ? 'Sembunyikan Tabel' : 'Tampilkan Tabel'}</span>
        </button>
      </div>

      {/* Accessible Table alternative for screen readers & quick lookup */}
      {showTable && (
        <div className="mt-3 p-3.5 rounded-xl bg-arang/40 border border-arang/60 text-xs overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-arang text-kabut-dark font-mono">
                <th className="py-1.5 px-2">Label/Waktu</th>
                <th className="py-1.5 px-2 text-right">Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-arang/40 text-kabut-light">
              {(activeDataset === 'harian' ? hotspotHarian : activeDataset === 'tinggi' ? hotspotTinggi : luasKumulatif).map((row, i) => (
                <tr key={i}>
                  <td className="py-1.5 px-2 font-mono">{row.label || row.periode}</td>
                  <td className="py-1.5 px-2 text-right font-bold text-white tabular-nums">
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
