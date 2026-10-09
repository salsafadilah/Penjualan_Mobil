'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import CreditCalculator from '@/components/CreditCalculator';
import { Car } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  FileCheck,
  MapPin,
  Tag,
  Phone,
  ArrowRight,
  Share2,
  Heart,
  CarFront,
} from 'lucide-react';

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${carId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setCar(json.data);
          setActiveImage(json.data.fotoUtama);

          // Fetch similar cars
          const allRes = await fetch('/api/cars');
          const allJson = await allRes.json();
          if (allJson.success) {
            const others = allJson.data.filter((c: Car) => c.id !== carId);
            setSimilarCars(others.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Failed to fetch car detail', err);
      } finally {
        setLoading(false);
      }
    }
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat detail spesifikasi mobil...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
            <CarFront className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Unit Mobil Tidak Ditemukan</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md">
            Mobil yang Anda cari mungkin telah terjual atau URL tidak valid.
          </p>
          <Link
            href="/katalog"
            className="mt-6 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm"
          >
            Kembali ke Katalog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const isSold = car.status === 'Terjual';
  const whatsappUrl = `https://wa.me/6281289123456?text=${encodeURIComponent(
    `Halo Sales AutoShowroom, saya berminat dengan unit: ${car.nama} (${car.tahun}) seharga ${formatRupiah(car.harga)}. Apakah masih tersedia?`
  )}`;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900">Beranda</Link>
            <span>/</span>
            <Link href="/katalog" className="hover:text-slate-900">Katalog Mobil</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{car.nama}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ================= LEFT: GALLERY & DESCRIPTION (7 cols) ================= */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Image Stage */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={activeImage || car.fotoUtama}
                    alt={car.nama}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Badge Status */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.promoBadge && (
                      <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                        {car.promoBadge}
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-md shadow-md ${
                        isSold
                          ? 'bg-slate-900 text-white'
                          : car.status === 'Booking'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      Status: {car.status}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {car.galeri && car.galeri.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pt-3 pb-1">
                    {car.galeri.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          activeImage === img
                            ? 'border-brand-600 ring-2 ring-brand-500/30'
                            : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${car.nama} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Deskripsi & Kondisi */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Deskripsi & Catatan Unit
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {car.deskripsi}
                  </p>
                </div>

                {/* Fitur Utama */}
                {car.fitur && car.fitur.length > 0 && (
                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                      Fitur & Perlengkapan Unggulan
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {car.fitur.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Jaminan Inspeksi Badge Box */}
                <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-start gap-4">
                  <div className="p-3 bg-brand-600 text-white rounded-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-xs">
                    <h5 className="font-bold text-brand-900 text-sm">
                      Sertifikat Kelayakan AutoShowroom Certified
                    </h5>
                    <p className="text-brand-700 mt-1 leading-relaxed">
                      Unit ini telah lulus uji 175 titik inspeksi meliputi mesin, transmisi, sasis, sistem rem, elektrikal, dan dijamin 100% bebas rendaman banjir serta tabrakan struktural.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT: SPECIFICATIONS & ACTION PANEL (5 cols) ================= */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              {/* Header Info & Price Box */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-brand-600 tracking-wider">
                    {car.merek} • {car.tipe}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 leading-snug">
                    {car.nama}
                  </h1>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {car.hargaCoret && (
                    <span className="text-xs text-slate-400 line-through block">
                      Harga Normal: {formatRupiah(car.hargaCoret)}
                    </span>
                  )}
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-3xl font-black text-brand-700">
                      {formatRupiah(car.harga)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Harga Tunai (OTR)
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-3">
                  {isSold ? (
                    <div className="w-full py-4 rounded-xl bg-slate-100 text-slate-400 font-bold text-center text-sm">
                      Unit Ini Telah Terjual
                    </div>
                  ) : (
                    <Link
                      href={`/pesan?mobilId=${car.id}`}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25 transition-all text-base"
                    >
                      Pesan Mobil Sekarang
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Hubungi Sales via WhatsApp
                  </a>
                </div>

                {/* Spesifikasi Teknis Tabel */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Spesifikasi Lengkap
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Tahun Pembuatan</span>
                      <span className="font-bold text-slate-900">{car.tahun}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Jarak Tempuh (KM)</span>
                      <span className="font-bold text-slate-900">{car.kilometer.toLocaleString('id-ID')} KM</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Transmisi</span>
                      <span className="font-bold text-slate-900">{car.transmisi}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Bahan Bakar</span>
                      <span className="font-bold text-slate-900">{car.bahanBakar}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Kapasitas Mesin</span>
                      <span className="font-bold text-slate-900">{car.kapasitasMesin}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Warna Bodi</span>
                      <span className="font-bold text-slate-900">{car.warna}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Plat Nomor</span>
                      <span className="font-bold text-slate-900">{car.platNomor}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500">Status Stok</span>
                      <span className="font-bold text-emerald-600">{car.stok} Unit Tersedia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SIMULASI KREDIT KHUSUS MOBIL INI ================= */}
          <div className="mt-16">
            <CreditCalculator
              carId={car.id}
              defaultPrice={car.harga}
              carName={car.nama}
            />
          </div>

          {/* ================= MOBIL SERUPA SECTION ================= */}
          {similarCars.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Pilihan Mobil Serupa Lainnya
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Rekomendasi unit dengan kelas dan rentang harga sebanding
                  </p>
                </div>
                <Link
                  href="/katalog"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Lihat Semua
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarCars.map((simCar) => (
                  <CarCard key={simCar.id} car={simCar} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

