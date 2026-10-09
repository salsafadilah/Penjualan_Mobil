'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Globe, Shield, LogOut } from 'lucide-react';

export default function AdminHeader({ nama, role }: { nama: string; role: string }) {
  const router = useRouter();
  const inisial = nama
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  const namaTampil = nama.replace(/\(.*?\)/g, '').trim();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
          Dashboard Operasional Showroom
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          Lihat Web Pembeli
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
            {inisial}
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-slate-900 block leading-tight">{namaTampil}</span>
            <span className="text-[10px] text-brand-600 font-semibold flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" />
              {role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
