'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Order } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  Printer,
  Phone,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Calendar,
  CreditCard,
  MapPin,
  CarFront,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${orderId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setOrder(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setLoading(false);
      }
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat data konfirmasi pesanan...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Pesanan Tidak Ditemukan</h2>
          <p className="text-slate-500 text-sm mt-2">
            Nomor pesanan &quot;{orderId}&quot; tidak terdaftar di sistem kami.
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm"
          >
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappMessage = `Halo Sales AutoShowroom, saya ingin konfirmasi pesanan saya dengan Nomor Pesanan: ${order.nomorPesanan} atas nama ${order.customer.nama} untuk unit ${order.mobilNama}. Mohon info proses selanjutnya.`;
  const whatsappUrl = `https://wa.me/6281289123456?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Pemesanan Berhasil Dikirim
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                    Surat Pemesanan Kendaraan (SPK)
                  </h1>
                </div>
              </div>

              {/* Status Badge */}
              <div className="sm:text-right">
                <span className="text-[11px] text-slate-400 block mb-1">Status Pesanan:</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                    order.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-700'
                      : order.status === 'Diproses'
                      ? 'bg-brand-100 text-brand-700'
                      : order.status === 'Dibatalkan'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {order.status}
                </span>
              </div>
            </div>

            {/* Nomor Pesanan Highlight Card */}
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-widest block">
                  Nomor Pesanan Anda
                </span>
                <span className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-white mt-1 block">
                  {order.nomorPesanan}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  Tanggal Pemesanan: {new Date(order.tanggal).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
                >
                  <Printer className="w-4 h-4" />
                  Cetak Bukti
                </button>
              </div>
            </div>

            {/* Grid Detail Pesanan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-100 text-xs">
              {/* Kolom Kiri: Detail Mobil */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <CarFront className="w-4 h-4 text-brand-600" />
                  Unit Kendaraan Dipesan
                </h3>

                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-4 space-y-3">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src={order.mobilFoto}
                      alt={order.mobilNama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{order.mobilNama}</h4>
                    <span className="text-slate-500 text-[11px]">
                      Tahun {order.mobilTahun} • {order.mobilMerek}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                    <span className="text-slate-600">Total Harga OTR:</span>
                    <span className="text-brand-700">{formatRupiah(order.mobilHarga)}</span>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Detail Pembeli & Pembayaran */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" />
                  Data Pembeli & Pembayaran
                </h3>

                <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-white">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nama Pemesan:</span>
                    <span className="font-bold text-slate-900">{order.customer.nama}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">No. WhatsApp / HP:</span>
                    <span className="font-bold text-slate-900">{order.customer.noHp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-semibold text-slate-800">{order.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kota / Alamat:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[200px]">
                      {order.customer.kota}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between">
                    <span className="text-slate-500">Metode Bayar:</span>
                    <span className="font-bold text-slate-900">{order.metodePembayaran}</span>
                  </div>

                  {order.metodePembayaran === 'Kredit / Leasing' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Leasing Pilihan:</span>
                        <span className="font-bold text-slate-900">{order.pilihanLeasing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Uang Muka (DP {order.persentaseDp || 20}%):</span>
                        <span className="font-bold text-slate-900">
                          {formatRupiah(order.uangMuka || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Suku Bunga Persentase:</span>
                        <span className="font-bold text-emerald-700">
                          {order.persentaseBunga || 5.5}% / tahun
                        </span>
                      </div>
                      {order.totalBunga && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Bunga ({order.tenorBulan} bln):</span>
                          <span className="font-semibold text-slate-700">
                            +{formatRupiah(order.totalBunga)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tenor Pembiayaan:</span>
                        <span className="font-bold text-slate-900">{order.tenorBulan} Bulan</span>
                      </div>
                      {order.angsuranPerBulan && (
                        <div className="flex justify-between text-brand-700 font-bold pt-2 border-t border-slate-100">
                          <span>Est. Cicilan Bulanan:</span>
                          <span className="text-sm font-black">{formatRupiah(order.angsuranPerBulan)} / bln</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 4 Dokumen Syarat Checklist */}
                <div className="rounded-2xl border border-slate-200 p-4.5 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    Kelengkapan 4 Dokumen Syarat:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">KTP: {order.dokumen?.ktp || 'Terlampir'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">Foto Rumah: {order.dokumen?.fotoRumah || 'Terlampir'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">Tagihan Listrik: {order.dokumen?.tagihanListrik || 'Terlampir'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">Slip Gaji: {order.dokumen?.slipGaji || 'Terlampir'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Langkah Selanjutnya Guidance */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">
                Langkah Selanjutnya Setelah Pemesanan:
              </h4>
              <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>
                  Konsultan Sales kami akan menghubungi Anda via WhatsApp di nomor{' '}
                  <strong className="text-slate-900">{order.customer.noHp}</strong> untuk konfirmasi data dalam waktu maksimal 1x24 jam.
                </li>
                <li>
                  Untuk skema kredit, tim analis leasing akan melakukan janji temu survei ringan atau pengecekan berkas secara online.
                </li>
                <li>
                  Unit mobil akan diamankan (status booking) sehingga tidak dapat dibeli oleh customer lain selama masa verifikasi.
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/katalog"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                ← Kembali ke Katalog Mobil
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 text-xs transition"
                >
                  <Phone className="w-4 h-4" />
                  Hubungi Sales via WhatsApp Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

