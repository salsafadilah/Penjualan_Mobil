'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CarFront,
  ShoppingBag,
  Users,
  FileBarChart2,
  Tag,
  ShieldCheck,
  Globe,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manajemen Mobil', href: '/admin/mobil', icon: CarFront },
    { name: 'Manajemen Pesanan', href: '/admin/pesanan', icon: ShoppingBag },
    { name: 'Data Pelanggan', href: '/admin/pelanggan', icon: Users },
    { name: 'Laporan Penjualan', href: '/admin/laporan', icon: FileBarChart2 },
    { name: 'Manajemen Promo', href: '/admin/promo', icon: Tag },
    { name: 'Pengguna & Role', href: '/admin/users', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md">
            <CarFront className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-white text-base tracking-tight block">
              AUTOPANEL <span className="text-brand-400 text-xs font-normal">v1.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium block">
              Sistem Manajemen Showroom
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3 mb-2 block">
          Menu Utama
        </span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switcher */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Lihat Website Customer</span>
        </Link>
      </div>
    </aside>
  );
}

