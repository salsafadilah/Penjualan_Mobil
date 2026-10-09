'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Car } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  CarFront,
  Sparkles,
} from 'lucide-react';

export default function KatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <KatalogInner />
    </Suspense>
  );
}

function KatalogInner() {
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedMerek, setSelectedMerek] = useState(searchParams.get('merek') || 'Semua');
  const [selectedTipe, setSelectedTipe] = useState(searchParams.get('tipe') || 'Semua');
  const [selectedTransmisi, setSelectedTransmisi] = useState(searchParams.get('transmisi') || 'Semua');
  const [selectedBahanBakar, setSelectedBahanBakar] = useState(searchParams.get('bahanBakar') || 'Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [maxHarga, setMaxHarga] = useState<number>(1000000000); // 1 Milyar
  const [sortBy, setSortBy] = useState('rekomendasi');

  // Mobile filter drawer state
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch cars from API
  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true);
        const res = await fetch('/api/cars');
        const json = await res.json();
        if (json.success) {
          setCars(json.data);
        }
      } catch (err) {
        console.error('Failed to load cars', err);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  // Update filter if query params change
  useEffect(() => {
    const q = searchParams.get('search');
    const m = searchParams.get('merek');
    const t = searchParams.get('tipe');
    const b = searchParams.get('bahanBakar');
    const tr = searchParams.get('transmisi');
    if (q !== null) setSearch(q);
    if (m !== null) setSelectedMerek(m);
    if (t !== null) setSelectedTipe(t);
    if (b !== null) setSelectedBahanBakar(b);
    if (tr !== null) setSelectedTransmisi(tr);
  }, [searchParams]);

  // Unique Brand Options
  const brands = useMemo(() => {
    const set = new Set(cars.map((c) => c.merek));
    return ['Semua', ...Array.from(set)];
  }, [cars]);

  // Unique Body Types
  const bodyTypes = ['Semua', 'SUV', 'MPV', 'Sedan', 'Hatchback', 'City Car'];
  const transmissions = ['Semua', 'Otomatis', 'Manual'];
  const fuels = ['Semua', 'Bensin', 'Diesel', 'Hybrid', 'Listrik'];

  // Filter and Sort logic
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Search
        if (search) {
          const q = search.toLowerCase();
          const matchName = car.nama.toLowerCase().includes(q);
          const matchMerek = car.merek.toLowerCase().includes(q);
          const matchDesc = car.deskripsi.toLowerCase().includes(q);
          if (!matchName && !matchMerek && !matchDesc) return false;
        }

        // Merek
        if (selectedMerek !== 'Semua' && car.merek.toLowerCase() !== selectedMerek.toLowerCase()) {
          return false;
        }

        // Tipe
        if (selectedTipe !== 'Semua' && car.tipe.toLowerCase() !== selectedTipe.toLowerCase()) {
          return false;
        }

        // Transmisi
        if (selectedTransmisi !== 'Semua' && car.transmisi !== selectedTransmisi) {
          return false;
        }

        // Bahan Bakar
        if (selectedBahanBakar !== 'Semua' && car.bahanBakar !== selectedBahanBakar) {
          return false;
        }

        // Status
        if (selectedStatus !== 'Semua' && car.status !== selectedStatus) {
          return false;
        }

        // Max Harga
        if (car.harga > maxHarga) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'termurah') return a.harga - b.harga;
        if (sortBy === 'termahal') return b.harga - a.harga;
        if (sortBy === 'tahun-terbaru') return b.tahun - a.tahun;
        if (sortBy === 'km-terendah') return a.kilometer - b.kilometer;
        return (b.unggulan ? 1 : 0) - (a.unggulan ? 1 : 0);
      });
  }, [
    cars,
    search,
    selectedMerek,
    selectedTipe,
    selectedTransmisi,
    selectedBahanBakar,
    selectedStatus,
    maxHarga,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedMerek('Semua');
    setSelectedTipe('Semua');
    setSelectedTransmisi('Semua');
    setSelectedBahanBakar('Semua');
    setSelectedStatus('Semua');
    setMaxHarga(1000000000);
    setSortBy('rekomendasi');
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
              Katalog Mobil Resmi
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  Pilihan Unit Mobil Berkualitas
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Menampilkan {filteredCars.length} dari total {cars.length} unit yang tersedia di showroom kami
                </p>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 font-bold text-sm text-slate-800 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                Filter & Kategori
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ================= SIDEBAR FILTER (Desktop) ================= */}
            <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-600" />
                  Filter Pencarian
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Filter Merek */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Merek Mobil
                </label>
                <select
                  value={selectedMerek}
                  onChange={(e) => setSelectedMerek(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Filter Tipe Bodi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tipe Bodi
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {bodyTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTipe(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                        selectedTipe === t
                          ? 'bg-brand-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Budget Maksimal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Maks. Budget
                  </label>
                  <span className="text-xs font-bold text-brand-600">
                    {formatRupiah(maxHarga)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000000"
                  max="1000000000"
                  step="25000000"
                  value={maxHarga}
                  onChange={(e) => setMaxHarga(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>200 Jt</span>
                  <span>1 Milyar</span>
                </div>
              </div>

              {/* Filter Transmisi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Transmisi
                </label>
                <div className="flex gap-2">
                  {transmissions.map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => setSelectedTransmisi(tr)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                        selectedTransmisi === tr
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Bahan Bakar */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Bahan Bakar
                </label>
                <select
                  value={selectedBahanBakar}
                  onChange={(e) => setSelectedBahanBakar(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                >
                  {fuels.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Filter Ketersediaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Ketersediaan
                </label>
                <div className="flex gap-2">
                  {['Semua', 'Tersedia', 'Booking'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                        selectedStatus === st
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ================= MAIN CONTENT LISTING ================= */}
            <div className="lg:col-span-9 space-y-6">
              {/* Top Search & Sorting Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Field */}
                <div className="relative w-full sm:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ketik nama mobil, tipe, atau varian..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 placeholder-slate-400"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs font-semibold text-slate-500 shrink-0">Urutkan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="rekomendasi">Rekomendasi Utama</option>
                    <option value="termurah">Harga Termurah</option>
                    <option value="termahal">Harga Tertinggi</option>
                    <option value="tahun-terbaru">Tahun Terbaru</option>
                    <option value="km-terendah">Kilometer Terendah</option>
                  </select>
                </div>
              </div>

              {/* Loading Indicator */}
              {loading && (
                <div className="py-20 text-center">
                  <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Memuat katalog mobil...</p>
                </div>
              )}

              {/* Grid List Mobil */}
              {!loading && filteredCars.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredCars.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                    <CarFront className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Tidak Ada Mobil Yang Cocok
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Kriteria pencarian atau filter yang Anda terapkan belum sesuai dengan stok yang tersedia saat ini.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 transition shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Semua Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= MOBILE FILTER MODAL ================= */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-lg">Filter Mobil</span>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  ✕
                </button>
              </div>

              {/* Merek */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Merek</label>
                <select
                  value={selectedMerek}
                  onChange={(e) => setSelectedMerek(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Tipe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Tipe Bodi</label>
                <div className="grid grid-cols-2 gap-2">
                  {bodyTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTipe(t)}
                      className={`p-2 rounded-lg text-xs font-bold ${
                        selectedTipe === t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Budget Maksimal: {formatRupiah(maxHarga)}
                </label>
                <input
                  type="range"
                  min="200000000"
                  max="1000000000"
                  step="25000000"
                  value={maxHarga}
                  onChange={(e) => setMaxHarga(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Transmisi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Transmisi</label>
                <div className="flex gap-2">
                  {transmissions.map((tr) => (
                    <button
                      key={tr}
                      onClick={() => setSelectedTransmisi(tr)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                        selectedTransmisi === tr ? 'bg-slate-900 text-white' : 'bg-slate-100'
                      }`}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-6 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
                >
                  Terapkan ({filteredCars.length} Unit)
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

