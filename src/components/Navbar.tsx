'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Car, Phone, ShieldCheck, Menu, X, UserCog, Sparkles, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [akun, setAkun] = useState<{ nama: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((json) => setAkun(json.success ? json.data : null))
      .catch(() => setAkun(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAkun(null);
    setIsOpen(false);
    router.refresh();
  };

  // If in admin pages, do not render customer navbar
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Katalog Mobil', href: '/katalog' },
    { name: 'Promo Spesial', href: '/#promo' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Pesta Promo Hoki 2026: Bunga Kredit Spesial Mulai 2.2%
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Lolos Inspeksi 175 Titik & Garansi 1 Tahun
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href="https://wa.me/6281289123456?text=Halo%20AutoShowroom,%20saya%20ingin%20tanya%20stok%20unit%20mobil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              CS WhatsApp: 0812-8912-3456
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded text-xs transition-colors"
            >
              <UserCog className="w-3 h-3 text-brand-400" />
              Portal Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  AUTO<span className="text-brand-600">SHOWROOM</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-brand-50 text-brand-700 border border-brand-200 px-1.5 py-0.5 rounded tracking-wider">
                  ID
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide font-medium">
                Pusat Jual Beli Mobil Berkualitas & Bergaransi
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {akun ? (
              <button
                onClick={handleLogout}
                title="Logout"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {akun.nama.split(' ')[0]}
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
            <Link
              href="/katalog"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cari Mobil
            </Link>
            <a
              href="https://wa.me/6281289123456?text=Halo%20Sales,%20saya%20ingin%20konsultasi%20pembelian%20mobil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Chat WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {akun ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                <LogOut className="w-4 h-4" />
                Logout ({akun.nama.split(' ')[0]})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-slate-100 text-slate-800"
              >
                <LogIn className="w-4 h-4" />
                Login / Buat Akun
              </Link>
            )}
            <Link
              href="/katalog"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center py-3 rounded-xl font-semibold bg-brand-600 text-white"
            >
              Lihat Semua Katalog Mobil
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-slate-100 text-slate-800"
            >
              <UserCog className="w-4 h-4 text-brand-600" />
              Portal Admin & Laporan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

