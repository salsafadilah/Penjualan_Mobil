'use client';

import React, { useState, useEffect } from 'react';
import { AdminUser } from '@/lib/types';
import { ShieldCheck, UserCheck, Plus, Mail, Shield, User } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        const json = await res.json();
        if (json.success) setUsers(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manajemen Pengguna & Hak Akses (Role)
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Daftar akun staf showroom yang memiliki akses ke modul admin dan operasional pemesanan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user.nama}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{user.nama}</h3>
                <span className="text-slate-400 text-xs font-mono">@{user.username}</span>
                <div className="mt-1">
                  <span
                    className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      user.role === 'Super Admin'
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'Sales'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Status Akun: Aktif & Terverifikasi</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role explanation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
          Panduan Hak Akses Role Staf Showroom
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
            <span className="font-bold text-purple-800 block">1. Super Admin</span>
            <p className="text-slate-600">
              Akses menyeluruh ke seluruh sistem: tambah/edit/hapus mobil, atur hak akses staf, kelola promo, dan cetak ekspor laporan keuangan.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
            <span className="font-bold text-blue-800 block">2. Sales Executive</span>
            <p className="text-slate-600">
              Memproses pesanan customer masuk, follow up berkas leasing, menghubungi via WhatsApp, dan memperbarui status pesanan menjadi diproses.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-800 block">3. Kasir / Administrasi</span>
            <p className="text-slate-600">
              Mengecek tanda terima pembayaran DP/pelunasan tunai, konfirmasi SPK, dan menerbitkan tanda bukti serah terima unit (BAST).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

