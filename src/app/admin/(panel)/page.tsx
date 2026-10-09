'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order, Car } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  ShoppingBag,
  Clock,
  CarFront,
  BadgeDollarSign,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Eye,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [resOrders, resCars, resStats] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/cars'),
        fetch('/api/stats'),
      ]);

      const dataOrders = await resOrders.json();
      const dataCars = await resCars.json();
      const dataStats = await resStats.json();

      if (dataOrders.success) setOrders(dataOrders.data);
      if (dataCars.success) setCars(dataCars.data);
      if (dataStats.success) setStats(dataStats.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        loadData();
      }
    } catch (err) {
      alert('Gagal update status pesanan');
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Memuat dashboard analitik showroom...</p>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ringkasan Operasional & Penjualan
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Pantau arus pemesanan masuk, status stok mobil, dan performa omset transaksi secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/mobil"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm transition"
          >
            + Tambah Mobil Baru
          </Link>
          <Link
            href="/admin/laporan"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-2xs transition"
          >
            Unduh Laporan
          </Link>
        </div>
      </div>

      {/* ================= KPI CARDS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pesanan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pesanan</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">{stats?.totalOrders || 0}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Transaksi tercatat</span>
          </div>
        </div>

        {/* Pesanan Baru (Perlu Tindakan) */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3 bg-amber-50/20">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider">Pesanan Baru (Pending)</span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-amber-800">{stats?.newOrders || 0}</span>
            <span className="text-[11px] text-amber-700 block mt-0.5 font-medium">Perlu dikonfirmasi sales</span>
          </div>
        </div>

        {/* Mobil Tersedia */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Stok Mobil Tersedia</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CarFront className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">{stats?.availableCars || 0}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Dari total {stats?.totalCars || 0} unit terdaftar
            </span>
          </div>
        </div>

        {/* Total Omset Selesai */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Omset Penjualan Selesai</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <BadgeDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-brand-700 truncate block">
              {formatRupiah(stats?.totalRevenue || 0)}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Potensi: {formatRupiah(stats?.potentialRevenue || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ANALYTICS & REKAP STATUS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Chart / Rekap Status Pesanan (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Status Alur Pemesanan</h3>
              <p className="text-xs text-slate-500 mt-0.5">Distribusi pesanan dalam alur kerja showroom</p>
            </div>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              Live Real-Time
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-xs font-bold text-amber-800 uppercase block">Menunggu Konfirmasi</span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">{stats?.newOrders || 0}</span>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-xs font-bold text-blue-800 uppercase block">Sedang Diproses</span>
              <span className="text-2xl font-black text-blue-900 mt-1 block">{stats?.processedOrders || 0}</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-800 uppercase block">Pesanan Selesai</span>
              <span className="text-2xl font-black text-emerald-900 mt-1 block">{stats?.completedOrders || 0}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase block">Dibatalkan</span>
              <span className="text-2xl font-black text-slate-800 mt-1 block">{stats?.cancelledOrders || 0}</span>
            </div>
          </div>

          {/* Visual Percentage Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Rasio Konversi Pesanan</span>
              <span>
                {orders.length > 0
                  ? Math.round(((stats?.completedOrders || 0) / orders.length) * 100)
                  : 0}
                % Selesai
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{
                  width: `${orders.length ? ((stats?.completedOrders || 0) / orders.length) * 100 : 0}%`,
                }}
                className="bg-emerald-500 h-full"
                title="Selesai"
              />
              <div
                style={{
                  width: `${orders.length ? ((stats?.processedOrders || 0) / orders.length) * 100 : 0}%`,
                }}
                className="bg-blue-500 h-full"
                title="Diproses"
              />
              <div
                style={{
                  width: `${orders.length ? ((stats?.newOrders || 0) / orders.length) * 100 : 0}%`,
                }}
                className="bg-amber-400 h-full"
                title="Baru"
              />
            </div>
          </div>
        </div>

        {/* Mobil Terlaris & Stok (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Unit Mobil Favorit</h3>
              <p className="text-xs text-slate-500">Mobil paling banyak diminati calon pembeli</p>
            </div>
            <Link
              href="/admin/mobil"
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {cars.slice(0, 4).map((car) => (
              <div key={car.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={car.fotoUtama}
                    alt={car.nama}
                    className="w-12 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 block truncate">
                      {car.nama}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {car.tahun} • {car.merek} • Stok: {car.stok}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-black text-brand-700 block">
                    {formatRupiah(car.harga)}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      car.status === 'Tersedia'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= TABEL PESANAN TERBARU ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Pesanan Masuk Terbaru</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar transaksi pesanan terakhir yang perlu ditangani oleh staf sales
            </p>
          </div>
          <Link
            href="/admin/pesanan"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Lihat Semua Pesanan
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">No. Pesanan</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Unit Mobil</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {order.nomorPesanan}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{order.customer.nama}</span>
                    <span className="text-[11px] text-slate-500 block">{order.customer.noHp}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block truncate max-w-xs">
                      {order.mobilNama}
                    </span>
                    <span className="text-brand-700 font-bold text-[11px]">
                      {formatRupiah(order.mobilHarga)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="block font-medium">{order.metodePembayaran}</span>
                    {order.pilihanLeasing && (
                      <span className="text-[10px] text-slate-400 block">{order.pilihanLeasing}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(order.tanggal).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        order.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Dibatalkan'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <select
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                        className="px-2 py-1 rounded border border-slate-200 text-[11px] font-semibold bg-white"
                      >
                        <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                      <Link
                        href={`/pesanan/${order.nomorPesanan}`}
                        target="_blank"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                        title="Lihat SPK"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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

