'use client';

import React, { useState, useEffect } from 'react';
import { Car, CarBodyType, CarTransmission, CarFuel, CarStatus } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  CarFront,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Tag,
  ExternalLink,
  X,
} from 'lucide-react';

export default function AdminMobilPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterMerek, setFilterMerek] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // Form Fields
  const [nama, setNama] = useState('');
  const [merek, setMerek] = useState('Toyota');
  const [tipe, setTipe] = useState<CarBodyType>('SUV');
  const [tahun, setTahun] = useState<number>(2024);
  const [harga, setHarga] = useState<number>(350000000);
  const [hargaCoret, setHargaCoret] = useState<number>(370000000);
  const [transmisi, setTransmisi] = useState<CarTransmission>('Otomatis');
  const [bahanBakar, setBahanBakar] = useState<CarFuel>('Bensin');
  const [kilometer, setKilometer] = useState<number>(10000);
  const [warna, setWarna] = useState('Putih Mutiara');
  const [kapasitasMesin, setKapasitasMesin] = useState('1.500 cc');
  const [platNomor, setPlatNomor] = useState('B (Ganjil) Jakarta');
  const [stok, setStok] = useState<number>(1);
  const [status, setStatus] = useState<CarStatus>('Tersedia');
  const [fotoUtama, setFotoUtama] = useState('');
  const [galeriText, setGaleriText] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fiturText, setFiturText] = useState('');
  const [promoBadge, setPromoBadge] = useState('');
  const [terlaris, setTerlaris] = useState(false);
  const [unggulan, setUnggulan] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cars');
      const json = await res.json();
      if (json.success) {
        setCars(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch cars', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const openAddModal = () => {
    setEditingCar(null);
    setNama('');
    setMerek('Toyota');
    setTipe('SUV');
    setTahun(2024);
    setHarga(350000000);
    setHargaCoret(370000000);
    setTransmisi('Otomatis');
    setBahanBakar('Bensin');
    setKilometer(12000);
    setWarna('Hitam Metalik');
    setKapasitasMesin('1.500 cc');
    setPlatNomor('B (Genap) Jakarta');
    setStok(1);
    setStatus('Tersedia');
    setFotoUtama('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80');
    setGaleriText('');
    setDeskripsi('Unit mulus orisinal tangan pertama dari baru. Record bengkel resmi lengkap.');
    setFiturText('Kamera Mundur, Smart Keyless Entry, Android Auto, Garansi 1 Tahun');
    setPromoBadge('Promo Spesial');
    setTerlaris(false);
    setUnggulan(true);
    setIsModalOpen(true);
  };

  const openEditModal = (car: Car) => {
    setEditingCar(car);
    setNama(car.nama);
    setMerek(car.merek);
    setTipe(car.tipe);
    setTahun(car.tahun);
    setHarga(car.harga);
    setHargaCoret(car.hargaCoret || 0);
    setTransmisi(car.transmisi);
    setBahanBakar(car.bahanBakar);
    setKilometer(car.kilometer);
    setWarna(car.warna);
    setKapasitasMesin(car.kapasitasMesin);
    setPlatNomor(car.platNomor);
    setStok(car.stok);
    setStatus(car.status);
    setFotoUtama(car.fotoUtama);
    setGaleriText((car.galeri || []).join('\n'));
    setDeskripsi(car.deskripsi);
    setFiturText((car.fitur || []).join(', '));
    setPromoBadge(car.promoBadge || '');
    setTerlaris(!!car.terlaris);
    setUnggulan(!!car.unggulan);
    setIsModalOpen(true);
  };

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    const galeriList = galeriText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!galeriList.includes(fotoUtama)) {
      galeriList.unshift(fotoUtama);
    }

    const fiturList = fiturText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      nama,
      merek,
      tipe,
      tahun: Number(tahun),
      harga: Number(harga),
      hargaCoret: hargaCoret ? Number(hargaCoret) : undefined,
      transmisi,
      bahanBakar,
      kilometer: Number(kilometer),
      warna,
      kapasitasMesin,
      platNomor,
      stok: Number(stok),
      status,
      fotoUtama,
      galeri: galeriList,
      deskripsi,
      fitur: fiturList,
      promoBadge: promoBadge || undefined,
      terlaris,
      unggulan,
    };

    try {
      if (editingCar) {
        // PUT update
        const res = await fetch(`/api/cars/${editingCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.error || json.message);
      } else {
        // POST create
        const res = await fetch('/api/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.error || json.message);
      }
      setIsModalOpen(false);
      fetchCars();
    } catch (err: any) {
      alert('Gagal menyimpan data mobil: ' + err.message);
    }
  };

  const handleDeleteCar = async (carId: string, carName: string) => {
    if (!confirm(`Yakin ingin menghapus mobil "${carName}"? Data yang dihapus tidak dapat dipulihkan.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/cars/${carId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchCars();
      } else {
        alert(json.message || 'Gagal menghapus mobil');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + err.message);
    }
  };

  const filteredCars = cars.filter((c) => {
    if (filterMerek !== 'Semua' && c.merek.toLowerCase() !== filterMerek.toLowerCase()) return false;
    if (filterStatus !== 'Semua' && c.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.nama.toLowerCase().includes(q) ||
        c.merek.toLowerCase().includes(q) ||
        c.platNomor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manajemen Data Mobil
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Kelola inventori kendaraan showroom: tambah unit baru, atur foto, harga, dan ketersediaan stok.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Mobil Baru
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, merek, plat nomor..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
          <select
            value={filterMerek}
            onChange={(e) => setFilterMerek(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
          >
            <option value="Semua">Semua Merek</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Suzuki">Suzuki</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Booking">Booking</option>
            <option value="Terjual">Terjual</option>
          </select>
        </div>
      </div>

      {/* Table Mobil */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Foto & Mobil</th>
                <th className="py-3 px-4">Tipe & Merek</th>
                <th className="py-3 px-4">Tahun & KM</th>
                <th className="py-3 px-4">Harga OTR</th>
                <th className="py-3 px-4 text-center">Stok</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={car.fotoUtama}
                        alt={car.nama}
                        className="w-14 h-11 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-slate-900 block truncate">
                          {car.nama}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span>Plat: {car.platNomor}</span>
                          {car.promoBadge && (
                            <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.2 rounded">
                              {car.promoBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{car.merek}</span>
                    <span className="text-[11px] text-slate-400 block">{car.tipe}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{car.tahun}</span>
                    <span className="text-[11px] text-slate-500 block">
                      {car.kilometer.toLocaleString('id-ID')} KM
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-brand-700 block text-sm">
                      {formatRupiah(car.harga)}
                    </span>
                    {car.hargaCoret && (
                      <span className="text-[10px] text-slate-400 line-through block">
                        {formatRupiah(car.hargaCoret)}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {car.stok}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        car.status === 'Tersedia'
                          ? 'bg-emerald-100 text-emerald-800'
                          : car.status === 'Booking'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => openEditModal(car)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="Edit Mobil"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id, car.nama)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                        title="Hapus Mobil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`/mobil/${car.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                        title="Lihat di Web"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL TAMBAH / EDIT MOBIL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingCar ? 'Edit Data Kendaraan' : 'Tambah Mobil Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nama Unit Mobil Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Toyota Innova Zenix 2.0 V Q Hybrid Modellista"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Merek *</label>
                  <input
                    type="text"
                    required
                    value={merek}
                    onChange={(e) => setMerek(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tipe Bodi *</label>
                  <select
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value as CarBodyType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="City Car">City Car</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tahun Pembuatan *</label>
                  <input
                    type="number"
                    required
                    value={tahun}
                    onChange={(e) => setTahun(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Harga Tunai OTR (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={harga}
                    onChange={(e) => setHarga(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-brand-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Harga Coret Normal (Opsional)</label>
                  <input
                    type="number"
                    value={hargaCoret}
                    onChange={(e) => setHargaCoret(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Transmisi *</label>
                  <select
                    value={transmisi}
                    onChange={(e) => setTransmisi(e.target.value as CarTransmission)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="Otomatis">Otomatis</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Bahan Bakar *</label>
                  <select
                    value={bahanBakar}
                    onChange={(e) => setBahanBakar(e.target.value as CarFuel)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="Bensin">Bensin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Listrik">Listrik</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Jarak Tempuh (KM) *</label>
                  <input
                    type="number"
                    required
                    value={kilometer}
                    onChange={(e) => setKilometer(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Warna Bodi *</label>
                  <input
                    type="text"
                    required
                    value={warna}
                    onChange={(e) => setWarna(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Kapasitas Mesin *</label>
                  <input
                    type="text"
                    required
                    value={kapasitasMesin}
                    onChange={(e) => setKapasitasMesin(e.target.value)}
                    placeholder="1.987 cc"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Plat Nomor *</label>
                  <input
                    type="text"
                    required
                    value={platNomor}
                    onChange={(e) => setPlatNomor(e.target.value)}
                    placeholder="B (Ganjil) Jakarta"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Jumlah Stok & Status *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={0}
                      value={stok}
                      onChange={(e) => setStok(Number(e.target.value))}
                      className="w-20 px-3 py-2.5 rounded-xl border border-slate-200"
                    />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as CarStatus)}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Booking">Booking</option>
                      <option value="Terjual">Terjual</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">URL Foto Utama *</label>
                  <input
                    type="url"
                    required
                    value={fotoUtama}
                    onChange={(e) => setFotoUtama(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    URL Galeri Foto Tambahan (1 URL per baris)
                  </label>
                  <textarea
                    rows={2}
                    value={galeriText}
                    onChange={(e) => setGaleriText(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Deskripsi Lengkap *</label>
                  <textarea
                    rows={3}
                    required
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Daftar Fitur (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={fiturText}
                    onChange={(e) => setFiturText(e.target.value)}
                    placeholder="Sunroof, Kamera 360, Garansi 1 Tahun, TSS"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Badge Promo Label</label>
                  <input
                    type="text"
                    value={promoBadge}
                    onChange={(e) => setPromoBadge(e.target.value)}
                    placeholder="Promo Akhir Tahun / DP Murah"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center gap-6 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={unggulan}
                      onChange={(e) => setUnggulan(e.target.checked)}
                      className="rounded accent-brand-600"
                    />
                    <span className="font-semibold text-slate-800">Tampilkan di Mobil Unggulan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={terlaris}
                      onChange={(e) => setTerlaris(e.target.checked)}
                      className="rounded accent-brand-600"
                    />
                    <span className="font-semibold text-slate-800">Badge Terlaris</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white shadow-md shadow-brand-600/20"
                >
                  Simpan Mobil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

