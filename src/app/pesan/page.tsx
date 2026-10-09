'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Car, PaymentMethod } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  User,
  CreditCard,
  Upload,
  ArrowRight,
  ArrowLeft,
  Building,
  CarFront,
  Percent,
  Home,
  Zap,
  DollarSign,
  FileBadge,
} from 'lucide-react';

type StepId = 'unit' | 'data' | 'metode' | 'bank' | 'simulasi' | 'dokumen' | 'review';

const LEASING_OPTIONS = [
  { value: 'BCA Finance', label: 'BCA Finance', desc: 'Bunga spesial 2.2% - 5.5%' },
  { value: 'Mandiri Tunas Finance', label: 'Mandiri Tunas Finance (MTF)', desc: 'Pembiayaan kendaraan melalui MTF' },
  { value: 'Adira Finance', label: 'Adira Dinamika Multi Finance', desc: 'Pembiayaan kendaraan melalui Adira Finance' },
  { value: 'OTO Multiartha', label: 'OTO Multiartha', desc: 'Pembiayaan kendaraan melalui OTO Multiartha' },
];

function ReviewTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 mt-4 mb-1 first:mt-0">
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 text-xs">
      <span className="text-slate-500 shrink-0">{label}</span>
      <b className="text-slate-900 text-right break-words min-w-0">{value}</b>
    </div>
  );
}

export default function OrderFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <OrderFormInner />
    </Suspense>
  );
}

function OrderFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mobilIdQuery = searchParams.get('mobilId');
  const metodeQuery = searchParams.get('metode');
  const dpPctQuery = searchParams.get('dpPct');
  const dpQuery = searchParams.get('dp');
  const bungaQuery = searchParams.get('bunga');
  const tenorQuery = searchParams.get('tenor');

  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>(mobilIdQuery || '');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields - Data Diri
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kota, setKota] = useState('Jakarta Selatan');

  // Skema Pembayaran
  const [metodePembayaran, setMetodePembayaran] = useState<PaymentMethod>(
    metodeQuery === 'kredit' ? 'Kredit / Leasing' : 'Tunai (Cash Keras)'
  );
  const [pilihanLeasing, setPilihanLeasing] = useState('BCA Finance');

  // DP Persentase & Nominal
  const [dpPercentage, setDpPercentage] = useState<number>(
    dpPctQuery ? Number(dpPctQuery) : 20
  );

  // Suku Bunga Persentase
  const [bungaTahunan, setBungaTahunan] = useState<number>(
    bungaQuery ? Number(bungaQuery) : 5.5
  );

  // Tenor
  const [tenor, setTenor] = useState<number>(Number(tenorQuery) || 36);
  const [catatan, setCatatan] = useState('');

  // 4 DOKUMEN SYARAT: KTP, Foto Rumah/Alamat, Tagihan Listrik, Slip Gaji
  const [ktpFileName, setKtpFileName] = useState<string>('');
  const [fotoRumahFileName, setFotoRumahFileName] = useState<string>('');
  const [tagihanListrikFileName, setTagihanListrikFileName] = useState<string>('');
  const [slipGajiFileName, setSlipGajiFileName] = useState<string>('');

  // Wajib login sebelum memesan unit
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const json = await res.json();
        if (json.success) {
          setNama(json.data.nama);
          setNoHp(json.data.noWhatsapp);
          setEmail(json.data.email);
          setKota(json.data.lokasi);
          setAuthChecked(true);
          return;
        }
      } catch (err) {
        console.error('Failed to check login', err);
      }
      const back = `/pesan${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(back)}`);
    }
    checkAuth();
  }, [router]);

  // Fetch all cars for selection
  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true);
        const res = await fetch('/api/cars');
        const json = await res.json();
        if (json.success) {
          setCars(json.data);
          if (!selectedCarId && json.data.length > 0) {
            setSelectedCarId(json.data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load cars', err);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  // ================= PERHITUNGAN BUNGA & DP PAKAI PERSENTASE =================
  const hargaMobil = selectedCar ? selectedCar.harga : 0;
  // 1. DP dari persentase
  const nominalDp = Math.round((hargaMobil * dpPercentage) / 100);
  // 2. Pokok hutang (harga - DP)
  const pokokHutang = Math.max(0, hargaMobil - nominalDp);
  // 3. Tenor tahun
  const tahunTenor = tenor / 12;
  // 4. Perhitungan total bunga pakai persentase tahunan
  const totalBunga = Math.round(pokokHutang * (bungaTahunan / 100) * tahunTenor);
  // 5. Total hutang plus bunga
  const totalHutangPlusBunga = pokokHutang + totalBunga;
  // 6. Angsuran per bulan
  const calculatedAngsuran = tenor > 0 ? Math.round(totalHutangPlusBunga / tenor) : 0;

  const dpOptions = [15, 20, 25, 30, 40, 50];
  const bungaPresets = [
    { label: 'Promo 2.2%', val: 2.2 },
    { label: 'MTF 4.5%', val: 4.5 },
    { label: 'BCA 5.5%', val: 5.5 },
    { label: 'Adira 6.5%', val: 6.5 },
  ];

  // ================= WIZARD STEPS =================
  const isKredit = metodePembayaran === 'Kredit / Leasing';
  const steps: { id: StepId; label: string }[] = [
    { id: 'unit', label: 'Pilih Unit' },
    { id: 'data', label: 'Data Diri' },
    { id: 'metode', label: 'Metode Beli' },
    ...(isKredit
      ? [
          { id: 'bank' as StepId, label: 'Bank/Finance' },
          { id: 'simulasi' as StepId, label: 'Simulasi Kredit' },
        ]
      : []),
    { id: 'dokumen', label: 'Dokumen' },
    { id: 'review', label: 'Review' },
  ];
  const [currentStep, setCurrentStep] = useState<StepId>('unit');
  const [stepError, setStepError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const stepIndex = Math.max(0, steps.findIndex((st) => st.id === currentStep));
  const stepNumber = stepIndex + 1;

  const goToStep = (id: StepId) => {
    setStepError('');
    setCurrentStep(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Validasi langkah aktif; mengembalikan pesan error atau null
  const validateStep = (): string | null => {
    // validasi bawaan browser (required, format email, dll) untuk input langkah ini saja
    if (formRef.current && !formRef.current.reportValidity()) {
      return 'Lengkapi kolom yang wajib diisi terlebih dahulu.';
    }
    switch (currentStep) {
      case 'unit':
        if (!selectedCar) return 'Pilih unit mobil terlebih dahulu.';
        if (selectedCar.status === 'Terjual') return 'Unit ini sudah terjual, pilih unit lain.';
        return null;
      case 'data':
        if (!/^\d{16}$/.test(nik.trim())) return 'NIK harus 16 digit angka.';
        return null;
      case 'dokumen':
        if (!ktpFileName) return 'Foto KTP wajib diunggah.';
        if (!fotoRumahFileName) return 'Foto rumah & alamat wajib diunggah.';
        if (isKredit && !slipGajiFileName) return 'Slip gaji / rekening koran wajib diunggah untuk kredit.';
        return null;
      default:
        return null;
    }
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setStepError(err);
      return;
    }
    const next = steps[stepIndex + 1];
    if (next) goToStep(next.id);
  };

  const goBack = () => {
    const prev = steps[stepIndex - 1];
    if (prev) goToStep(prev.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Enter pada langkah selain review hanya lanjut ke langkah berikutnya
    if (currentStep !== 'review') {
      goNext();
      return;
    }
    if (!selectedCar) return;

    try {
      setSubmitting(true);
      const payload = {
        idMobil: selectedCar.id,
        customer: {
          nama,
          noHp,
          email,
          nik,
          alamat,
          kota,
        },
        metodePembayaran,
        pilihanLeasing: metodePembayaran === 'Kredit / Leasing' ? pilihanLeasing : undefined,
        persentaseDp: metodePembayaran === 'Kredit / Leasing' ? dpPercentage : undefined,
        uangMuka: metodePembayaran === 'Kredit / Leasing' ? nominalDp : undefined,
        persentaseBunga: metodePembayaran === 'Kredit / Leasing' ? bungaTahunan : undefined,
        totalBunga: metodePembayaran === 'Kredit / Leasing' ? totalBunga : undefined,
        tenorBulan: metodePembayaran === 'Kredit / Leasing' ? tenor : undefined,
        angsuranPerBulan:
          metodePembayaran === 'Kredit / Leasing' ? calculatedAngsuran : undefined,
        catatan: catatan.trim() || undefined,
        dokumen: {
          ktp: ktpFileName,
          fotoRumah: fotoRumahFileName || undefined,
          tagihanListrik: tagihanListrikFileName || undefined,
          slipGaji: slipGajiFileName || undefined,
        },
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        router.replace(`/login?next=${encodeURIComponent(`/pesan${window.location.search}`)}`);
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        // Redirect to order confirmation page
        router.push(`/pesanan/${json.data.nomorPesanan}`);
      } else {
        alert(json.error || 'Gagal mengirimkan pemesanan.');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Katalog
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Formulir Pemesanan & Pengajuan Kredit Kendaraan
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Lengkapi data pemesan, tentukan persentase DP & bunga kredit, serta lampirkan berkas persyaratan resmi.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} noValidate={false} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ================= FORM FIELDS (Left 7 cols) ================= */}
            <div className="lg:col-span-7 space-y-6">
              {/* Stepper */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {steps.map((st, i) => {
                  const state = i === stepIndex ? 'active' : i < stepIndex ? 'done' : 'todo';
                  return (
                    <React.Fragment key={st.id}>
                      <button
                        type="button"
                        onClick={() => i < stepIndex && goToStep(st.id)}
                        className={`flex items-center gap-2 shrink-0 ${i < stepIndex ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            state === 'todo' ? 'bg-slate-200 text-slate-500' : 'bg-brand-600 text-white'
                          }`}
                        >
                          {state === 'done' ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </span>
                        <span
                          className={`hidden sm:block text-xs font-bold whitespace-nowrap ${
                            state === 'todo' ? 'text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {st.label}
                        </span>
                      </button>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 min-w-4 h-0.5 ${i < stepIndex ? 'bg-brand-600' : 'bg-slate-200'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {stepError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {stepError}
                </div>
              )}

              {currentStep === 'unit' && (
              <>
              {/* Step 1: Pilihan Mobil */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Pilih Unit Kendaraan</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Unit Mobil Yang Dipesan
                  </label>
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    {cars.map((c) => (
                      <option key={c.id} value={c.id} disabled={c.status === 'Terjual'}>
                        {c.nama} ({c.tahun}) — {formatRupiah(c.harga)} {c.status === 'Terjual' ? '[TERJUAL]' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              </>
            )}

              {currentStep === 'data' && (
              <>
              {/* Step 2: Data Diri Calon Pembeli */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Data Diri Pemesan (KTP)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Nama Lengkap (Sesuai KTP) *
                    </label>
                    <input
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Contoh: Bambang Trihatmodjo"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      No. WhatsApp / HP Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                      placeholder="081234567890"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Nomor Induk Kependudukan (NIK KTP) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      placeholder="16 Digit NIK KTP Anda"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Alamat Domisili Lengkap (Sesuai Rumah Tinggal) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder="Nama jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Kota / Kabupaten Domisili *
                    </label>
                    <input
                      type="text"
                      required
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      placeholder="Contoh: Jakarta Selatan, Surabaya, Bandung..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
              </>
            )}

              {currentStep === 'metode' && (
              <>
              {/* Step: Metode Pembelian */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Pilih Metode Pembelian</h3>
                    <p className="text-xs text-slate-500">Pilih cara pembayaran kendaraan yang Anda inginkan</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMetodePembayaran('Tunai (Cash Keras)')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      metodePembayaran === 'Tunai (Cash Keras)'
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-slate-900 text-sm">Tunai (Cash Keras)</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Transfer lunas langsung ke rekening showroom
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodePembayaran('Kredit / Leasing')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      metodePembayaran === 'Kredit / Leasing'
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-slate-900 text-sm">Kredit / Leasing</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Perhitungan DP & bunga transparan pakai persentase
                    </span>
                  </button>
                </div>

                {metodePembayaran === 'Tunai (Cash Keras)' && selectedCar && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Harga Kendaraan (OTR):</span>
                      <span className="font-bold text-slate-900">{formatRupiah(selectedCar.harga)}</span>
                    </div>
                    <p className="text-slate-500">Pembayaran lunas melalui transfer ke rekening showroom setelah pesanan dikonfirmasi sales.</p>
                  </div>
                )}
              </div>
              </>
            )}

              {currentStep === 'bank' && (
              <>
              {/* Step: Bank / Finance */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Pilih Bank / Finance</h3>
                    <p className="text-xs text-slate-500">Pilih lembaga pembiayaan untuk pengajuan kredit Anda</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {LEASING_OPTIONS.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setPilihanLeasing(l.value)}
                      className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border text-left transition-all ${
                        pilihanLeasing === l.value
                          ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>
                        <span className="block font-bold text-slate-900 text-sm">{l.label}</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">{l.desc}</span>
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                          pilihanLeasing === l.value ? 'border-brand-600 bg-brand-600 ring-2 ring-white ring-inset' : 'border-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              </>
            )}

              {currentStep === 'simulasi' && (
              <>
              {/* Step: Simulasi Kredit */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Simulasi Kredit</h3>
                    <p className="text-xs text-slate-500">Atur DP, tenor, dan suku bunga — cicilan dihitung otomatis</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* PILIHAN DP PERSENTASE */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Percent className="w-4 h-4 text-brand-600" />
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Pilih Persentase DP (Uang Muka)
                          </label>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                          <input
                            type="number"
                            min="10"
                            max="80"
                            value={dpPercentage}
                            onChange={(e) => setDpPercentage(Math.min(80, Math.max(10, Number(e.target.value) || 10)))}
                            className="w-12 text-right font-black text-brand-700 text-sm bg-transparent focus:outline-hidden"
                          />
                          <span className="font-bold text-xs text-brand-700">%</span>
                        </div>
                      </div>

                      {/* Quick percentage buttons */}
                      <div className="grid grid-cols-6 gap-2">
                        {dpOptions.map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setDpPercentage(pct)}
                            className={`py-2 rounded-lg text-xs font-bold transition-all ${
                              dpPercentage === pct
                                ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-500/30'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>

                      <input
                        type="range"
                        min="10"
                        max="70"
                        step="5"
                        value={dpPercentage}
                        onChange={(e) => setDpPercentage(Number(e.target.value))}
                        className="w-full accent-brand-600"
                      />

                      <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100 font-medium">
                        <span className="text-slate-500">Nominal Uang Muka (DP {dpPercentage}%):</span>
                        <span className="font-black text-brand-700 text-sm">{formatRupiah(nominalDp)}</span>
                      </div>
                    </div>

                    {/* TENOR & SUKU BUNGA PERSENTASE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Jangka Waktu (Tenor) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Jangka Waktu (Tenor)
                        </label>
                        <select
                          value={tenor}
                          onChange={(e) => setTenor(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-white"
                        >
                          <option value={12}>12 Bulan (1 Tahun)</option>
                          <option value={24}>24 Bulan (2 Tahun)</option>
                          <option value={36}>36 Bulan (3 Tahun)</option>
                          <option value={48}>48 Bulan (4 Tahun)</option>
                          <option value={60}>60 Bulan (5 Tahun)</option>
                        </select>
                      </div>

                      {/* Suku Bunga Persentase */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase">
                            Suku Bunga (% per Tahun)
                          </label>
                          <span className="font-bold text-xs text-emerald-700">{bungaTahunan}%</span>
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="20"
                            value={bungaTahunan}
                            onChange={(e) => setBungaTahunan(Number(e.target.value) || 0)}
                            className="w-24 px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700 bg-white"
                          />
                          <div className="flex-1 flex gap-1">
                            {bungaPresets.slice(0, 2).map((bp) => (
                              <button
                                key={bp.label}
                                type="button"
                                onClick={() => setBungaTahunan(bp.val)}
                                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition ${
                                  bungaTahunan === bp.val
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-slate-700 border-slate-200'
                                }`}
                              >
                                {bp.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RINCIAN PERHITUNGAN BUNGA TRANSPARAN */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                      <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                        Rincian Perhitungan Bunga Kredit
                      </span>
                      <div className="flex justify-between text-slate-600">
                        <span>Pokok Hutang (Harga - DP):</span>
                        <span className="font-semibold text-slate-900">{formatRupiah(pokokHutang)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Total Bunga ({bungaTahunan}% × {tahunTenor} tahun):</span>
                        <span className="font-semibold text-emerald-700">+{formatRupiah(totalBunga)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Total Pelunasan Kredit:</span>
                        <span className="font-semibold text-slate-900">{formatRupiah(totalHutangPlusBunga)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold">
                        <span className="text-slate-800">Cicilan / Angsuran per Bulan ({tenor} bln):</span>
                        <span className="text-brand-700 text-base font-black">
                          {formatRupiah(calculatedAngsuran)} / bln
                        </span>
                      </div>
                    </div>
                </div>
              </div>
              </>
            )}

              {currentStep === 'dokumen' && (
              <>
              {/* Step 4: UPLOAD 4 DOKUMEN PERSYARATAN */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Dokumen Persyaratan Pengajuan</h3>
                    <p className="text-xs text-slate-500">
                      Lampirkan 4 berkas syarat utama untuk verifikasi identitas dan persetujuan leasing
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. KTP */}
                  <div className="border border-slate-200 rounded-2xl p-4.5 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-brand-100 text-brand-700 rounded-xl">
                        <FileBadge className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">1. Foto KTP Pemohon</span>
                          <span className="text-[10px] text-rose-600 font-bold">*Wajib</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          KTP asli pemesan yang masih berlaku, foto jelas tanpa pantulan cahaya.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {ktpFileName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {ktpFileName}
                          </span>
                        ) : (
                          'Belum ada file'
                        )}
                      </span>
                      <input
                        type="file"
                        id="file-ktp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setKtpFileName(e.target.files[0].name);
                        }}
                      />
                      <label
                        htmlFor="file-ktp"
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-2xs"
                      >
                        {ktpFileName ? 'Ganti' : 'Upload KTP'}
                      </label>
                    </div>
                  </div>

                  {/* 2. Foto Rumah & Alamat */}
                  <div className="border border-slate-200 rounded-2xl p-4.5 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                        <Home className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">2. Foto Rumah & Alamat</span>
                          <span className="text-[10px] text-rose-600 font-bold">*Wajib</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Foto tampak depan rumah tempat tinggal sesuai alamat domisili untuk survei.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {fotoRumahFileName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {fotoRumahFileName}
                          </span>
                        ) : (
                          'Belum ada file'
                        )}
                      </span>
                      <input
                        type="file"
                        id="file-rumah"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setFotoRumahFileName(e.target.files[0].name);
                        }}
                      />
                      <label
                        htmlFor="file-rumah"
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-2xs"
                      >
                        {fotoRumahFileName ? 'Ganti' : 'Upload Foto'}
                      </label>
                    </div>
                  </div>

                  {/* 3. Tagihan Listrik */}
                  <div className="border border-slate-200 rounded-2xl p-4.5 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">3. Tagihan Listrik</span>
                          <span className="text-[10px] text-slate-500 font-medium">(PLN / Air)</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Bukti rekening listrik PLN pascabayar / bukti token 3 bulan terakhir.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {tagihanListrikFileName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {tagihanListrikFileName}
                          </span>
                        ) : (
                          'Belum ada file'
                        )}
                      </span>
                      <input
                        type="file"
                        id="file-listrik"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setTagihanListrikFileName(e.target.files[0].name);
                        }}
                      />
                      <label
                        htmlFor="file-listrik"
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-2xs"
                      >
                        {tagihanListrikFileName ? 'Ganti' : 'Upload Rekening'}
                      </label>
                    </div>
                  </div>

                  {/* 4. Slip Gaji */}
                  <div className="border border-slate-200 rounded-2xl p-4.5 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">4. Slip Gaji / Rekening Koran</span>
                          <span className="text-[10px] text-rose-600 font-bold">*Wajib Kredit</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Slip gaji 3 bulan terakhir atau mutasi rekening koran operasional usaha.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {slipGajiFileName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {slipGajiFileName}
                          </span>
                        ) : (
                          'Belum ada file'
                        )}
                      </span>
                      <input
                        type="file"
                        id="file-slip"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setSlipGajiFileName(e.target.files[0].name);
                        }}
                      />
                      <label
                        htmlFor="file-slip"
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-2xs"
                      >
                        {slipGajiFileName ? 'Ganti' : 'Upload Slip Gaji'}
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Catatan Tambahan untuk Sales
                  </label>
                  <textarea
                    rows={2}
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Contoh: Mohon plat sementara disiapkan, jadwalkan pengantaran di hari Sabtu..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              </>
            )}

              {currentStep === 'review' && (
              <>
              {/* Step: Review */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    {stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Review Pesanan</h3>
                    <p className="text-xs text-slate-500">Periksa kembali seluruh data sebelum mengirim pesanan</p>
                  </div>
                </div>

                <div className="text-sm">
                    <ReviewTitle>Unit Dipesan</ReviewTitle>
                    <ReviewRow label="Mobil" value={selectedCar ? selectedCar.nama : '-'} />
                    <ReviewRow label="Harga (OTR)" value={formatRupiah(hargaMobil)} />

                    <ReviewTitle>Data Diri</ReviewTitle>
                    <ReviewRow label="Nama Lengkap" value={nama} />
                    <ReviewRow label="NIK" value={nik} />
                    <ReviewRow label="No. WhatsApp" value={noHp} />
                    <ReviewRow label="Email" value={email} />
                    <ReviewRow label="Alamat" value={alamat} />
                    <ReviewRow label="Kota / Kabupaten" value={kota} />

                    <ReviewTitle>Metode Pembelian</ReviewTitle>
                    <ReviewRow label="Metode" value={metodePembayaran} />
                    {metodePembayaran === 'Kredit / Leasing' && (
                      <>
                        <ReviewRow label="Bank / Finance" value={pilihanLeasing} />
                        <ReviewRow label={`Uang Muka (${dpPercentage}%)`} value={formatRupiah(nominalDp)} />
                        <ReviewRow label="Pokok Hutang" value={formatRupiah(pokokHutang)} />
                        <ReviewRow label="Suku Bunga" value={`${bungaTahunan}% / tahun`} />
                        <ReviewRow label="Tenor" value={`${tenor} Bulan`} />
                        <ReviewRow label="Cicilan / Bulan" value={formatRupiah(calculatedAngsuran)} />
                      </>
                    )}

                    <ReviewTitle>Dokumen</ReviewTitle>
                    <ReviewRow label="KTP" value={ktpFileName || '-'} />
                    <ReviewRow label="Foto Rumah & Alamat" value={fotoRumahFileName || '-'} />
                    <ReviewRow label="Tagihan Listrik" value={tagihanListrikFileName || '-'} />
                    <ReviewRow label="Slip Gaji" value={slipGajiFileName || '-'} />
                    {catatan.trim() && <ReviewRow label="Catatan" value={catatan.trim()} />}
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Dengan mengklik "Kirim Pemesanan", Anda menyetujui data ini digunakan tim sales untuk proses konfirmasi pemesanan.</span>
                </div>
              </div>
              </>
            )}

              {/* Navigasi step */}
              <div className="flex items-center justify-between">
                {stepIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </button>
                ) : (
                  <span />
                )}
                {currentStep === 'review' ? (
                  <button
                    type="submit"
                    disabled={submitting || !selectedCar || selectedCar.status === 'Terjual'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Mengirimkan Pesanan...' : 'Kirim Pemesanan Sekarang'}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-all"
                  >
                    Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ================= RIGHT: SUMMARY & SUBMIT (5 cols) ================= */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-md space-y-6">
                <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                  Ringkasan Pesanan & Skema
                </h3>

                {selectedCar ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={selectedCar.fotoUtama}
                        alt={selectedCar.nama}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        {selectedCar.tahun}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-extrabold uppercase text-brand-600">
                        {selectedCar.merek} • {selectedCar.tipe}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base leading-snug">
                        {selectedCar.nama}
                      </h4>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Harga Kendaraan (OTR):</span>
                        <span className="font-bold text-slate-900">
                          {formatRupiah(selectedCar.harga)}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-600">
                        <span>Metode Pembayaran:</span>
                        <span className="font-bold text-slate-900">{metodePembayaran}</span>
                      </div>

                      {metodePembayaran === 'Kredit / Leasing' && (
                        <>
                          <div className="flex justify-between text-slate-600">
                            <span>Leasing Rekanan:</span>
                            <span className="font-bold text-slate-900">{pilihanLeasing}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Uang Muka ({dpPercentage}%):</span>
                            <span className="font-bold text-brand-700">{formatRupiah(nominalDp)}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Suku Bunga Persentase:</span>
                            <span className="font-bold text-emerald-700">{bungaTahunan}% / thn</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Tenor:</span>
                            <span className="font-bold text-slate-900">{tenor} Bulan</span>
                          </div>
                          <div className="flex justify-between text-brand-700 font-bold pt-2 border-t border-slate-200">
                            <span>Cicilan / Bulan:</span>
                            <span className="text-sm font-black">{formatRupiah(calculatedAngsuran)}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Dokumen Checklist Ringkasan */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                      <span className="font-bold text-slate-800 block">Status 4 Dokumen Persyaratan:</span>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${ktpFileName ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <span>KTP: {ktpFileName || 'Siap upload'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${fotoRumahFileName ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <span>Foto Rumah & Alamat: {fotoRumahFileName || 'Siap upload'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${tagihanListrikFileName ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <span>Tagihan Listrik: {tagihanListrikFileName || 'Siap upload'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${slipGajiFileName ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <span>Slip Gaji: {slipGajiFileName || 'Siap upload'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Pilih unit mobil terlebih dahulu.
                  </div>
                )}

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Data & dokumen Anda dienkripsi aman untuk verifikasi leasing</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
