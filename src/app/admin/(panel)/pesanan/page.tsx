'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  Printer,
  X,
  User,
  MapPin,
  Calendar,
  CreditCard,
  CarFront,
  MessageSquare,
} from 'lucide-react';

export default function AdminPesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('Menunggu Konfirmasi');
  const [catatanAdmin, setCatatanAdmin] = useState('');
  const [salesHandler, setSalesHandler] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setCatatanAdmin(order.catatanAdmin || '');
    setSalesHandler(order.salesHandler || 'Tim Sales Showroom');
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          catatanAdmin,
          salesHandler,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSelectedOrder(json.data);
        fetchOrders();
      } else {
        alert(json.message || 'Gagal update pesanan');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'Semua' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.nomorPesanan.toLowerCase().includes(q) ||
        o.customer.nama.toLowerCase().includes(q) ||
        o.customer.noHp.includes(q) ||
        o.mobilNama.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manajemen Transaksi & Pesanan
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Pantau dan proses pemesanan kendaraan masuk dari customer website secara terintegrasi.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor pesanan, nama customer, no HP..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-end text-xs">
          {['Semua', 'Menunggu Konfirmasi', 'Diproses', 'Selesai', 'Dibatalkan'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Pesanan */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">No. Pesanan</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Unit Mobil</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Tanggal Masuk</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {order.nomorPesanan}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{order.customer.nama}</span>
                    <span className="text-[11px] text-slate-500 block">{order.customer.noHp}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 block truncate max-w-xs">
                      {order.mobilNama}
                    </span>
                    <span className="text-brand-700 font-bold text-[11px]">
                      {formatRupiah(order.mobilHarga)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="font-semibold block">{order.metodePembayaran}</span>
                    {order.pilihanLeasing && (
                      <span className="text-[10px] text-slate-400 block">{order.pilihanLeasing}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(order.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
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
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => openOrderDetail(order)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL DETAIL & UPDATE STATUS PESANAN ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">
                  Detail Pesanan Kendaraan
                </span>
                <h3 className="font-mono font-black text-slate-900 text-xl mt-0.5">
                  {selectedOrder.nomorPesanan}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Unit & Pembayaran */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CarFront className="w-4 h-4 text-brand-600" />
                  Informasi Unit & Skema
                </h4>

                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-200">
                  <img
                    src={selectedOrder.mobilFoto}
                    alt={selectedOrder.mobilNama}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-900 text-sm block">
                    {selectedOrder.mobilNama}
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga OTR:</span>
                    <span className="font-bold text-brand-700">
                      {formatRupiah(selectedOrder.mobilHarga)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Metode Bayar:</span>
                    <span className="font-bold text-slate-900">
                      {selectedOrder.metodePembayaran}
                    </span>
                  </div>
                  {selectedOrder.pilihanLeasing && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Leasing Rekanan:</span>
                        <span className="font-bold text-slate-900">
                          {selectedOrder.pilihanLeasing}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Uang Muka (DP {selectedOrder.persentaseDp || 20}%):</span>
                        <span className="font-bold text-slate-900">
                          {formatRupiah(selectedOrder.uangMuka || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Suku Bunga Persentase:</span>
                        <span className="font-bold text-emerald-700">
                          {selectedOrder.persentaseBunga || 5.5}% / tahun
                        </span>
                      </div>
                      {selectedOrder.totalBunga && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Bunga ({selectedOrder.tenorBulan} bln):</span>
                          <span className="font-semibold text-slate-700">
                            +{formatRupiah(selectedOrder.totalBunga)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tenor Pembiayaan:</span>
                        <span className="font-bold text-slate-900">
                          {selectedOrder.tenorBulan} Bulan
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-brand-700 pt-1 border-t border-slate-200">
                        <span>Est. Angsuran / Bln:</span>
                        <span>{formatRupiah(selectedOrder.angsuranPerBulan || 0)}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Status 4 Dokumen Persyaratan */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Verifikasi 4 Dokumen Syarat:
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                      <span className="font-medium text-slate-700">1. KTP Pemohon:</span>
                      <span className="font-bold text-emerald-700">{selectedOrder.dokumen?.ktp || 'Terverifikasi'}</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                      <span className="font-medium text-slate-700">2. Foto Rumah & Alamat:</span>
                      <span className="font-bold text-emerald-700">{selectedOrder.dokumen?.fotoRumah || 'Terverifikasi'}</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                      <span className="font-medium text-slate-700">3. Tagihan Listrik:</span>
                      <span className="font-bold text-emerald-700">{selectedOrder.dokumen?.tagihanListrik || 'Terverifikasi'}</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                      <span className="font-medium text-slate-700">4. Slip Gaji / Rekening:</span>
                      <span className="font-bold text-emerald-700">{selectedOrder.dokumen?.slipGaji || 'Terverifikasi'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Pemesan */}
              <div className="space-y-4 p-4 rounded-2xl bg-white border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" />
                  Data Lengkap Pembeli
                </h4>

                <div className="space-y-2.5">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Nama Pemesan
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {selectedOrder.customer.nama}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Kontak WhatsApp / Telp
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {selectedOrder.customer.noHp}
                      </span>
                      <a
                        href={`https://wa.me/${selectedOrder.customer.noHp.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold hover:bg-emerald-100"
                      >
                        <Phone className="w-3 h-3" />
                        Chat WA
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Alamat Email
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedOrder.customer.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      NIK KTP
                    </span>
                    <span className="font-mono text-slate-800">{selectedOrder.customer.nik}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Alamat & Kota
                    </span>
                    <span className="text-slate-700">
                      {selectedOrder.customer.alamat}, {selectedOrder.customer.kota}
                    </span>
                  </div>
                  {selectedOrder.catatan && (
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                      <span className="font-bold block text-[10px] uppercase">
                        Catatan dari Pembeli:
                      </span>
                      <p className="mt-0.5">{selectedOrder.catatan}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Update Status & Catatan Internal */}
            <form onSubmit={handleUpdateOrder} className="pt-4 border-t border-slate-100 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Update Status & Catatan Penanganan</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Status Pemesanan *
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-white"
                  >
                    <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                    <option value="Diproses">Diproses (Verifikasi Berkas / Leasing)</option>
                    <option value="Selesai">Selesai (Unit Diserahterimakan)</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Sales Executive Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={salesHandler}
                    onChange={(e) => setSalesHandler(e.target.value)}
                    placeholder="Contoh: Rian Hendrawan"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Catatan Internal Admin / Progress Penanganan
                  </label>
                  <textarea
                    rows={2}
                    value={catatanAdmin}
                    onChange={(e) => setCatatanAdmin(e.target.value)}
                    placeholder="Contoh: Berkas KTP & slip gaji sudah diterima via WA, jadwal survei BCA Finance hari Kamis..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href={`/pesanan/${selectedOrder.nomorPesanan}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  <Printer className="w-4 h-4" />
                  Buka & Cetak Surat SPK
                </Link>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white shadow-md shadow-brand-600/20 disabled:opacity-50"
                  >
                    {updating ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

