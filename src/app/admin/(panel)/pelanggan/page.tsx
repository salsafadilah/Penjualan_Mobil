'use client';

import React, { useState, useEffect } from 'react';
import { formatRupiah } from '@/lib/utils';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminPelangganPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const res = await fetch('/api/customers');
        const json = await res.json();
        if (json.success) {
          setCustomers(json.data);
        }
      } catch (err) {
        console.error('Failed to load customers', err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.nama.toLowerCase().includes(q) ||
      c.noHp.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.kota.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Database & Histori Pelanggan
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Daftar seluruh calon pembeli dan customer showroom dengan riwayat pemesanan unit mobil.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama pelanggan, nomor telepon, email, kota..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Nama Customer</th>
                <th className="py-3 px-4">Kontak WhatsApp / Telp</th>
                <th className="py-3 px-4">Alamat & Kota</th>
                <th className="py-3 px-4 text-center">Total Unit</th>
                <th className="py-3 px-4">Total Nilai Pembelian</th>
                <th className="py-3 px-4">Terakhir Pesan</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{cust.nama}</span>
                    <span className="text-[11px] text-slate-400 block">{cust.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                    {cust.noHp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{cust.kota}</span>
                    <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                      {cust.alamat}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    {cust.totalPesanan} Pesanan
                  </td>
                  <td className="py-3.5 px-4 font-black text-brand-700">
                    {formatRupiah(cust.totalNilai)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(cust.terakhirPesan).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <a
                      href={`https://wa.me/${cust.noHp.replace(/^0/, '62')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Chat WA
                    </a>
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

