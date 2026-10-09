'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  FileBarChart2,
  Download,
  Printer,
  Calendar,
  Filter,
  BadgeDollarSign,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';

export default function AdminLaporanPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [periode, setPeriode] = useState('Semua');

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const res = await fetch('/api/orders');
        const json = await res.json();
        if (json.success) {
          setOrders(json.data);
        }
      } catch (err) {
        console.error('Failed to load orders for reports', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const completedOrders = orders.filter((o) => o.status === 'Selesai');
  const totalOmset = completedOrders.reduce((sum, o) => sum + o.mobilHarga, 0);
  const totalUnit = completedOrders.length;
  const avgOmset = totalUnit > 0 ? Math.round(totalOmset / totalUnit) : 0;

  // Breakdown Cash vs Kredit
  const cashOrders = completedOrders.filter((o) => o.metodePembayaran === 'Tunai (Cash Keras)');
  const kreditOrders = completedOrders.filter((o) => o.metodePembayaran === 'Kredit / Leasing');

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Nomor Pesanan',
      'Tanggal',
      'Nama Customer',
      'No HP',
      'Kota',
      'Unit Mobil',
      'Tahun',
      'Merek',
      'Harga OTR',
      'Metode Bayar',
      'Leasing',
      'DP',
      'Tenor',
      'Status',
      'Sales Handler',
    ];

    const rows = orders.map((o) => [
      `"${o.nomorPesanan}"`,
      `"${new Date(o.tanggal).toISOString().split('T')[0]}"`,
      `"${o.customer.nama.replace(/"/g, '""')}"`,
      `"${o.customer.noHp}"`,
      `"${o.customer.kota}"`,
      `"${o.mobilNama.replace(/"/g, '""')}"`,
      o.mobilTahun,
      `"${o.mobilMerek}"`,
      o.mobilHarga,
      `"${o.metodePembayaran}"`,
      `"${o.pilihanLeasing || '-'}"`,
      o.uangMuka || 0,
      o.tenorBulan || 0,
      `"${o.status}"`,
      `"${o.salesHandler || '-'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `laporan-penjualan-autoshowroom-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Laporan Kinerja Penjualan
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Rekap transaksi selesai, total omset bruto, analisis metode pembayaran, dan ekspor data resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition"
          >
            <Printer className="w-4 h-4" />
            Cetak Laporan / PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
          >
            <Download className="w-4 h-4" />
            Ekspor ke Excel / CSV
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Omset Bersih</span>
          <div className="text-2xl sm:text-3xl font-black text-brand-700">
            {formatRupiah(totalOmset)}
          </div>
          <p className="text-[11px] text-slate-400">Total akumulasi transaksi berstatus &quot;Selesai&quot;</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Unit Mobil Terjual</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {totalUnit} Unit Kendaraan
          </div>
          <p className="text-[11px] text-slate-400">Unit telah diserahterimakan ke konsumen</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Rata-rata Nilai Transaksi</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatRupiah(avgOmset)}
          </div>
          <p className="text-[11px] text-slate-400">Average ticket size per mobil terjual</p>
        </div>
      </div>

      {/* Breakdown Metode Pembayaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Komposisi Metode Pembayaran
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Kredit / Leasing</span>
                <span className="text-slate-500 text-[11px]">{kreditOrders.length} Transaksi Terlaksana</span>
              </div>
              <span className="font-black text-brand-700 text-base">
                {formatRupiah(kreditOrders.reduce((sum, o) => sum + o.mobilHarga, 0))}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Tunai (Cash Keras)</span>
                <span className="text-slate-500 text-[11px]">{cashOrders.length} Transaksi Terlaksana</span>
              </div>
              <span className="font-black text-brand-700 text-base">
                {formatRupiah(cashOrders.reduce((sum, o) => sum + o.mobilHarga, 0))}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Informasi Ringkasan Transaksi
          </h3>
          <div className="text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Total Pesanan Masuk:</span>
              <strong className="text-slate-900">{orders.length} Pesanan</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Pesanan Selesai (Terjual):</span>
              <strong className="text-emerald-600">{completedOrders.length} Unit</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Pesanan Sedang Diproses:</span>
              <strong className="text-blue-600">
                {orders.filter((o) => o.status === 'Diproses').length} Unit
              </strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Pesanan Menunggu Konfirmasi:</span>
              <strong className="text-amber-600">
                {orders.filter((o) => o.status === 'Menunggu Konfirmasi').length} Unit
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Rincian Transaksi */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 font-bold text-slate-900 text-sm">
          Daftar Rincian Seluruh Transaksi
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">No. Pesanan</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Nama Pembeli</th>
                <th className="py-3 px-4">Unit Mobil</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Total Nilai</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.nomorPesanan}</td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(o.tanggal).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{o.customer.nama}</td>
                  <td className="py-3 px-4 text-slate-800">{o.mobilNama}</td>
                  <td className="py-3 px-4 text-slate-600">{o.metodePembayaran}</td>
                  <td className="py-3 px-4 font-black text-brand-700">
                    {formatRupiah(o.mobilHarga)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        o.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-800'
                          : o.status === 'Dibatalkan'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

