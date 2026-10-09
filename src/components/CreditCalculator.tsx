'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatRupiah } from '@/lib/utils';
import { Calculator, ArrowRight, CheckCircle2, Shield, Percent } from 'lucide-react';

interface CreditCalculatorProps {
  carId?: string;
  defaultPrice: number;
  carName?: string;
}

export default function CreditCalculator({
  carId,
  defaultPrice,
  carName,
}: CreditCalculatorProps) {
  const [hargaMobil, setHargaMobil] = useState<number>(defaultPrice);
  const [dpPercentage, setDpPercentage] = useState<number>(20);
  const [tenorBulan, setTenorBulan] = useState<number>(36); // default 3 tahun
  const [bungaTahunan, setBungaTahunan] = useState<number>(5.5); // % per tahun

  // ================= PERHITUNGAN BUNGA & DP PAKAI PERSENTASE =================
  // 1. DP dari persentase
  const nominalDp = Math.round((hargaMobil * dpPercentage) / 100);

  // 2. Pokok pinjaman (harga - DP)
  const pokokHutang = Math.max(0, hargaMobil - nominalDp);

  // 3. Lama pinjaman dalam tahun
  const tahunTenor = tenorBulan / 12;

  // 4. Perhitungan total bunga memakai persentase per tahun
  // Rumus: Pokok Hutang * (Bunga% / 100) * Tahun Tenor
  const totalBunga = Math.round(pokokHutang * (bungaTahunan / 100) * tahunTenor);

  // 5. Total hutang (pokok + bunga)
  const totalHutangPlusBunga = pokokHutang + totalBunga;

  // 6. Angsuran / cicilan bulanan
  const angsuranPerBulan = Math.round(totalHutangPlusBunga / tenorBulan);

  // Estimasi TDP (Total Down Payment = DP + Biaya Admin 2.5jt + Asuransi ~1.5% per thn)
  const estimasiAsuransi = Math.round(hargaMobil * 0.015 * tahunTenor);
  const biayaAdmin = 2500000;
  const totalDpAwal = nominalDp + biayaAdmin + estimasiAsuransi;

  const tenorOptions = [
    { bulan: 12, label: '1 Tahun' },
    { bulan: 24, label: '2 Tahun' },
    { bulan: 36, label: '3 Tahun' },
    { bulan: 48, label: '4 Tahun' },
    { bulan: 60, label: '5 Tahun' },
  ];

  const dpOptions = [15, 20, 25, 30, 40, 50];
  const bungaPresets = [
    { label: 'Promo 2.2%', val: 2.2 },
    { label: 'MTF 4.5%', val: 4.5 },
    { label: 'BCA 5.5%', val: 5.5 },
    { label: 'Adira 6.5%', val: 6.5 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Simulasi Kredit & Bunga Transparan</h3>
            <p className="text-xs text-slate-500">
              Pilih persentase DP dan persentase suku bunga per tahun untuk kalkulasi cicilan instan
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
          <Shield className="w-4 h-4 text-emerald-600" />
          Perhitungan Bunga Flat Transparan
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Input Parameters (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Harga Mobil */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Harga Kendaraan (OTR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                Rp
              </span>
              <input
                type="number"
                value={hargaMobil}
                onChange={(e) => setHargaMobil(Number(e.target.value) || 0)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-bold text-slate-900 text-lg"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Tertera: {formatRupiah(hargaMobil)}
            </p>
          </div>

          {/* PILIHAN DP PERSENTASE */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-brand-600" />
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Pilih Persentase DP (Uang Muka)
                </label>
              </div>
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <input
                  type="number"
                  min="10"
                  max="90"
                  value={dpPercentage}
                  onChange={(e) => setDpPercentage(Math.min(90, Math.max(10, Number(e.target.value) || 10)))}
                  className="w-12 text-right font-black text-brand-700 text-sm focus:outline-hidden"
                />
                <span className="font-bold text-xs text-brand-700">%</span>
              </div>
            </div>

            {/* Quick buttons */}
            <div className="grid grid-cols-6 gap-2">
              {dpOptions.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDpPercentage(pct)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    dpPercentage === pct
                      ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-500/30'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={dpPercentage}
              onChange={(e) => setDpPercentage(Number(e.target.value))}
              className="w-full accent-brand-600"
            />

            <div className="flex justify-between text-xs pt-1 border-t border-slate-200 font-semibold">
              <span className="text-slate-600">Nominal DP ({dpPercentage}%):</span>
              <span className="font-bold text-brand-700 text-sm">{formatRupiah(nominalDp)}</span>
            </div>
          </div>

          {/* Jangka Waktu / Tenor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Jangka Waktu Pembiayaan (Tenor)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {tenorOptions.map((opt) => (
                <button
                  key={opt.bulan}
                  type="button"
                  onClick={() => setTenorBulan(opt.bulan)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    tenorBulan === opt.bulan
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>{opt.bulan} Bln</div>
                  <div className="text-[10px] font-normal opacity-80">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* PERHITUNGAN BUNGA PAKAI PERSENTASE */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-600" />
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Suku Bunga (% per Tahun)
                </label>
              </div>
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="25"
                  value={bungaTahunan}
                  onChange={(e) => setBungaTahunan(Number(e.target.value) || 0)}
                  className="w-14 text-right font-black text-emerald-700 text-sm focus:outline-hidden"
                />
                <span className="font-bold text-xs text-emerald-700">% / thn</span>
              </div>
            </div>

            {/* Preset bunga leasing */}
            <div className="flex flex-wrap gap-2">
              {bungaPresets.map((bp) => (
                <button
                  key={bp.label}
                  type="button"
                  onClick={() => setBungaTahunan(bp.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    bungaTahunan === bp.val
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {bp.label}
                </button>
              ))}
            </div>

            {/* Formula note */}
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Pokok Pinjaman:</span>
                <span className="font-semibold text-slate-800">{formatRupiah(pokokHutang)}</span>
              </div>
              <div className="flex justify-between">
                <span>Perhitungan Bunga ({bungaTahunan}% × {tahunTenor} thn):</span>
                <span className="font-semibold text-emerald-700">+{formatRupiah(totalBunga)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Hasil Estimasi Cicilan
            </span>
            <div className="mt-2 mb-6">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatRupiah(angsuranPerBulan)}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                per bulan (selama {tenorBulan} bulan / {tahunTenor} tahun)
              </span>
            </div>

            <div className="space-y-2.5 py-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Persentase DP:</span>
                <span className="font-bold text-amber-400">{dpPercentage}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Nominal DP:</span>
                <span className="font-semibold text-white">{formatRupiah(nominalDp)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Pokok Pinjaman:</span>
                <span className="font-semibold text-white">{formatRupiah(pokokHutang)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Suku Bunga ({bungaTahunan}%/thn):</span>
                <span className="font-semibold text-emerald-400">+{formatRupiah(totalBunga)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Pinjaman + Bunga:</span>
                <span className="font-semibold text-white">{formatRupiah(totalHutangPlusBunga)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm text-amber-400">
                <span>Estimasi Total Bayar Awal (TDP):</span>
                <span>{formatRupiah(totalDpAwal)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Simulasi berbasis bunga persentase flat tahunan</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Didukung BCA Finance, MTF, Adira, dan OTO</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            {carId ? (
              <Link
                href={`/pesan?mobilId=${carId}&metode=kredit&dp=${nominalDp}&dpPct=${dpPercentage}&bunga=${bungaTahunan}&tenor=${tenorBulan}&angsuran=${angsuranPerBulan}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-brand-500 hover:bg-brand-400 text-slate-950 transition-all text-sm shadow-lg shadow-brand-500/20"
              >
                Pesan Unit Dengan Simulasi Ini
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/katalog"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-brand-500 hover:bg-brand-400 text-slate-950 transition-all text-sm shadow-lg shadow-brand-500/20"
              >
                Pilih Mobil di Katalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
