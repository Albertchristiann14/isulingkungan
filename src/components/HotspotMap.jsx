import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { enamProvinsiPrioritas } from '../data/hotspot';
import { Flame, ShieldAlert } from 'lucide-react';

export default function HotspotMap() {
  // Center coordinates over Indonesia archipelago
  const centerPosition = [-0.7893, 113.9213];

  return (
    <div className="w-full bg-gambut-deep/90 border border-arang rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-arang/70 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-bricolage text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-bara" />
            <span>Peta 6 Provinsi Prioritas Karhutla</span>
          </h3>
          <p className="text-xs text-kabut-dark">
            Konsentrasi 263 titik panas di provinsi prioritas pada puncak eskalasi 3 September 2026 (Sumber: SiPongi / Bernama).
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-kabut-dark font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-bara inline-block" />
            <span>Titik panas tinggi</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span>Sedang</span>
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[380px] sm:h-[450px] w-full rounded-xl overflow-hidden border border-arang/80 relative z-0">
        <MapContainer
          center={centerPosition}
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ background: '#121416' }}
        >
          {/* CartoDB Dark Matter tiles for moody peat/carbon atmosphere */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {enamProvinsiPrioritas.map((item, idx) => {
            // Radius scaled proportionally to hotspot count
            const radius = Math.max(12, Math.sqrt(item.titik) * 2.8);
            const isHighPriority = item.titik > 50;

            return (
              <CircleMarker
                key={idx}
                center={item.coords}
                radius={radius}
                pathOptions={{
                  color: isHighPriority ? '#D8432B' : '#EAA06D',
                  fillColor: isHighPriority ? '#D8432B' : '#EAA06D',
                  fillOpacity: 0.65,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div className="font-sans text-xs">
                    <strong>{item.provinsi}</strong>: {item.titik} titik panas
                  </div>
                </Tooltip>
                <Popup>
                  <div className="text-xs text-arang-deep font-sans p-1 space-y-1">
                    <strong className="text-sm font-bold block">{item.provinsi}</strong>
                    <div className="text-red-700 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{item.titik} titik panas per 3 Sep 2026</span>
                    </div>
                    <p className="text-[11px] text-gray-700">
                      Provinsi prioritas satgas gabungan Manggala Agni, TNI/Polri, dan BNPB dalam operasi water-bombing serta sekat kanal gambut.
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Grid summary of the 6 provinces */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
        {enamProvinsiPrioritas.map((prov, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-arang/40 border border-arang text-center">
            <span className="text-[11px] text-kabut-dark block truncate font-medium">{prov.provinsi}</span>
            <span className="text-base font-bold font-bricolage text-white">{prov.titik} <span className="text-[10px] text-kabut font-normal">titik</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

