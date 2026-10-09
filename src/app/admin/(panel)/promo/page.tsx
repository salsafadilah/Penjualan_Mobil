'use client';

import React, { useState, useEffect } from 'react';
import { Promo } from '@/lib/types';
import { Tag, Plus, Trash2, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function AdminPromoPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [judul, setJudul] = useState('');
  const [kode, setKode] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [bannerImg, setBannerImg] = useState('');
  const [periodeBerlaku, setPeriodeBerlaku] = useState('');
  const [diskonPersen, setDiskonPersen] = useState<number>(0);
  const [potonganHarga, setPotonganHarga] = useState<number>(0);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/promos');
      const json = await res.json();
      if (json.success) setPromos(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        judul,
        kode: kode.toUpperCase(),
        deskripsi,
        bannerImg:
          bannerImg ||
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        periodeBerlaku,
        diskonPersen: diskonPersen || undefined,
        potonganHarga: potonganHarga || undefined,
        aktif: true,
      };

      const res = await fetch('/api/promos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchPromos();
      } else {
        alert(json.error || 'Gagal membuat promo');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + err.message);
    }
  };

  const handleDeletePromo = async (id: string) => {
    if (!confirm('Yakin ingin menghapus promo ini?')) return;
    try {
      const res = await fetch(`/api/promos/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchPromos();
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manajemen Promo & Diskon Showroom
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Atur penawaran spesial, voucher diskon DP, dan banner promosi yang tampil di halaman beranda.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Promo Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src={promo.bannerImg}
                  alt={promo.judul}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded shadow-sm">
                  {promo.kode}
                </span>
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {promo.aktif ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Periode: {promo.periodeBerlaku}
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {promo.judul}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {promo.deskripsi}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">
                {promo.diskonPersen ? `Diskon ${promo.diskonPersen}%` : 'Cashback Spesial'}
              </span>
              <button
                onClick={() => handleDeletePromo(promo.id)}
                className="text-rose-600 hover:text-rose-700 font-bold p-1 rounded hover:bg-rose-50"
                title="Hapus Promo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Promo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Tambah Promo Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Judul Promo *</label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Promo Bunga 0% Awal Tahun"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Kode Kupon / Voucher *</label>
                <input
                  type="text"
                  required
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                  placeholder="BUNGA0"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Periode Berlaku *</label>
                <input
                  type="text"
                  required
                  value={periodeBerlaku}
                  onChange={(e) => setPeriodeBerlaku(e.target.value)}
                  placeholder="01 Okt 2026 - 31 Des 2026"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Deskripsi Promo *</label>
                <textarea
                  rows={3}
                  required
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">URL Gambar Banner</label>
                <input
                  type="url"
                  value={bannerImg}
                  onChange={(e) => setBannerImg(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 font-bold text-white shadow-sm"
                >
                  Simpan Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

