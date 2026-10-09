'use client';

import React from 'react';
import Link from 'next/link';
import { Car } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { Gauge, Fuel, Cog, Calendar, Tag, ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  // Hitung estimasi cicilan 5 tahun (60 bulan) dengan DP 20%
  const estimasiDp = car.harga * 0.2;
  const sisaPokok = car.harga - estimasiDp;
  const bungaTahunan = 0.06;
  const estimasiCicilanBulan = Math.round((sisaPokok + sisaPokok * bungaTahunan * 5) / 60);

  const isSold = car.status === 'Terjual';
  const isBooked = car.status === 'Booking';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Gambar Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={car.fotoUtama}
          alt={car.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {car.promoBadge && (
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              <Tag className="w-3 h-3" />
              {car.promoBadge}
            </span>
          )}
          {car.terlaris && (
            <span className="inline-flex items-center bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              Terlaris
            </span>
          )}
        </div>

        {/* Status Badge Top Right */}
        <div className="absolute top-3 right-3 z-10">
          {isSold ? (
            <span className="bg-slate-900/90 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
              Terjual
            </span>
          ) : isBooked ? (
            <span className="bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
              Booking
            </span>
          ) : (
            <span className="bg-emerald-600/95 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
              Tersedia
            </span>
          )}
        </div>

        {/* Bottom Bar on Image (Tipe & Plat) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded font-medium">
            {car.tipe} • {car.merek}
          </span>
          <span className="text-[11px] text-slate-200 drop-shadow-md">
            Plat {car.platNomor.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <Link href={`/mobil/${car.id}`} className="block group-hover:text-brand-600 transition-colors">
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 min-h-[2.75rem]">
            {car.nama}
          </h3>
        </Link>

        {/* Spesifikasi Grid */}
        <div className="grid grid-cols-2 gap-2 my-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Tahun {car.tahun}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span>{car.kilometer.toLocaleString('id-ID')} KM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog className="w-3.5 h-3.5 text-slate-400" />
            <span>{car.transmisi}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-slate-400" />
            <span>{car.bahanBakar}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          {car.hargaCoret && (
            <div className="text-xs text-slate-400 line-through">
              {formatRupiah(car.hargaCoret)}
            </div>
          )}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-lg font-black text-brand-700">
                {formatRupiah(car.harga)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Est. Angsuran</span>
              <span className="text-xs font-bold text-slate-800">
                {formatRupiah(estimasiCicilanBulan)}/bln
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-2">
          <Link
            href={`/mobil/${car.id}`}
            className="flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {isSold ? (
            <button
              disabled
              className="text-xs font-bold py-2.5 px-3 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed"
            >
              Terjual
            </button>
          ) : (
            <Link
              href={`/pesan?mobilId=${car.id}`}
              className="flex items-center justify-center text-xs font-bold py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all text-center"
            >
              Pesan Unit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

