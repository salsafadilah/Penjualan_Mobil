'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, MapPin, Phone, Mail, Clock, ShieldCheck, Award, RefreshCcw, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // If in admin pages, do not render customer footer
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-brand-400 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Garansi Mesin 1 Tahun</h4>
              <p className="text-slate-400 text-xs mt-1">Jaminan bebas biaya perbaikan transmisi & mesin di bengkel resmi rekanan.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Inspeksi 175 Titik</h4>
              <p className="text-slate-400 text-xs mt-1">Sertifikat lolos uji bebas bekas tabrakan parah dan bebas rendaman banjir.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-800">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Jaminan 5 Hari Uang Kembali</h4>
              <p className="text-slate-400 text-xs mt-1">Jika unit tidak sesuai deskripsi inspeksi, pengembalian dana 100% tanpa ribet.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-purple-400 border border-slate-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Dokumen 100% Asli & Sah</h4>
              <p className="text-slate-400 text-xs mt-1">BPKB, STNK, Faktur terverifikasi keasliannya di Samsat & kepolisian.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-slate-800 text-sm">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">
                AUTO<span className="text-brand-500">SHOWROOM</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Showroom otomotif modern dengan reputasi terbaik di Indonesia. Kami menyediakan mobil impian berkualitas dengan kepastian transparansi, inspeksi ketat, dan fasilitas pembiayaan kredit terlengkap didukung leasing terpercaya.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                <span>Jam Buka Showroom: <strong>08.00 - 20.00 WIB</strong> (Buka Setiap Hari)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Kategori Populer */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Kategori Mobil</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/katalog?tipe=SUV" className="hover:text-white transition">Mobil SUV Tangguh</Link></li>
              <li><Link href="/katalog?tipe=MPV" className="hover:text-white transition">Mobil MPV Keluarga</Link></li>
              <li><Link href="/katalog?tipe=Sedan" className="hover:text-white transition">Sedan Elegan & Mewah</Link></li>
              <li><Link href="/katalog?bahanBakar=Listrik" className="hover:text-white transition">Mobil Listrik (EV) & Hybrid</Link></li>
              <li><Link href="/katalog?transmisi=Otomatis" className="hover:text-white transition">Transmisi Otomatis</Link></li>
            </ul>
          </div>

          {/* Col 3: Link Cepat */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Informasi & Layanan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/katalog" className="hover:text-white transition">Katalog Lengkap</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-white transition">Tentang Showroom</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition">Hubungi Sales</Link></li>
              <li><Link href="/#promo" className="hover:text-white transition">Promo & Diskon DP</Link></li>
              <li><Link href="/admin" className="hover:text-brand-400 font-semibold transition">Portal Internal Admin</Link></li>
            </ul>
          </div>

          {/* Col 4: Showroom Fisik */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Lokasi Showroom</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Jl. Arteri Pondok Indah No. 88, Kebayoran Lama, Jakarta Selatan 12240</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: (021) 7890-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>info@autoshowroom.co.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AutoShowroom Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span>Metode Bayar: Tunai, BCA Finance, Mandiri Tunas Finance, Adira Finance, OTO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

