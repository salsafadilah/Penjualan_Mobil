import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import CreditCalculator from '@/components/CreditCalculator';
import { getCars, getPromos } from '@/lib/db';
import {
  Car,
  Search,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Star,
  Users,
  Building2,
  TrendingUp,
} from 'lucide-react';

export const revalidate = 0;

export default function HomePage() {
  const allCars = getCars();
  const promos = getPromos();
  const featuredCars = allCars.filter((c) => c.unggulan).slice(0, 6);
  const bestSellerCars = allCars.filter((c) => c.terlaris).slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
          {/* Subtle Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Showroom Mobil Resmi & Bergaransi #1 di Indonesia
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                  Wujudkan Mobil Impian dengan{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-brand-200">
                    Kualitas Teruji
                  </span>{' '}
                  & Transparansi Penuh.
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  Ratusan pilihan unit siap pakai dengan sertifikat inspeksi 175 titik, bebas bekas tabrak & banjir, garansi mesin 1 tahun, serta kemudahan proses kredit DP terjangkau.
                </p>

                {/* Quick Search Widget */}
                <div className="pt-2">
                  <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl max-w-xl">
                    <form action="/katalog" method="GET" className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="search"
                          placeholder="Cari Avanza, Innova, HR-V, Ioniq..."
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-sm text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02]"
                      >
                        Cari Mobil
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-white/10 text-xs text-slate-300">
                      <span className="text-slate-400">Paling Dicari:</span>
                      <Link href="/katalog?search=Innova" className="hover:text-white underline decoration-dotted">Innova Zenix</Link>
                      <span>•</span>
                      <Link href="/katalog?search=HR-V" className="hover:text-white underline decoration-dotted">Honda HR-V</Link>
                      <span>•</span>
                      <Link href="/katalog?search=Pajero" className="hover:text-white underline decoration-dotted">Pajero Sport</Link>
                      <span>•</span>
                      <Link href="/katalog?bahanBakar=Listrik" className="hover:text-white underline decoration-dotted">Mobil EV</Link>
                    </div>
                  </div>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
                  <div>
                    <span className="block text-2xl font-black text-white">1.500+</span>
                    <span className="text-xs text-slate-400">Unit Terjual</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">100%</span>
                    <span className="text-xs text-slate-400">Lolos Uji Inspeksi</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">4.9 ★</span>
                    <span className="text-xs text-slate-400">Kepuasan Pelanggan</span>
                  </div>
                </div>
              </div>

              {/* Visual Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80"
                    alt="Mobil Unggulan AutoShowroom"
                    className="w-full h-[360px] sm:h-[440px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Floating card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 border border-white/40 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Unit Favorit Pekan Ini
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Tersedia
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mt-1 text-slate-900">
                      Toyota Innova Zenix 2.0 Q Hybrid
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Harga OTR</span>
                        <span className="text-base font-black text-brand-700">Rp 595.000.000</span>
                      </div>
                      <Link
                        href="/mobil/car-01"
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                      >
                        Lihat Unit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MEREK LOGOS SECTION ================= */}
        <section className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              Pilihan Merek Otomotif Ternama di Showroom Kami
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {['Toyota', 'Honda', 'Mitsubishi', 'Hyundai', 'Daihatsu', 'Suzuki'].map((brand) => (
                <Link
                  key={brand}
                  href={`/katalog?merek=${brand}`}
                  className="p-3 text-center rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 hover:shadow-xs transition font-bold text-slate-800 text-sm"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MOBIL UNGGULAN SECTION ================= */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-md">
                  Pilihan Rekomendasi
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Mobil Unggulan & Siap Jalan
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Koleksi unit dengan kondisi fisik dan mesin terbaik yang telah lolos inspeksi total.
                </p>
              </div>

              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-sm transition"
              >
                Lihat Seluruh Katalog ({allCars.length} Unit)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid Mobil Unggulan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROMO SECTION ================= */}
        <section id="promo" className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-md">
                Penawaran Spesial
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Program Promo & Diskon Pembelian
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Nikmati keuntungan ekstra berupa potongan harga, bunga ringan, hingga gratis proteksi asuransi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col bg-white"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={promo.bannerImg}
                      alt={promo.judul}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                      KODE: {promo.kode}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Berlaku: {promo.periodeBerlaku}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {promo.judul}
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        {promo.deskripsi}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        Tersedia untuk Semua Unit
                      </span>
                      <Link
                        href="/katalog"
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        Gunakan Promo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SIMULASI KREDIT LIVE ================= */}
        <section className="py-16 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-400 bg-brand-900/50 border border-brand-500/30 px-3 py-1 rounded-md">
                Kalkulator Pembiayaan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Simulasi Cicilan & Uang Muka
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Hitung estimasi angsuran bulanan sesuai budget Anda secara transparan tanpa biaya tersembunyi.
              </p>
            </div>

            <CreditCalculator defaultPrice={388000000} carName="Honda HR-V 1.5 SE" />
          </div>
        </section>

        {/* ================= TESTIMONI PELANGGAN ================= */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
                Cerita Nyata
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Apa Kata Pelanggan Kami?
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Pengalaman nyata membeli mobil dengan aman, transparan, dan pelayanan istimewa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  nama: 'dr. Amanda Putri Sari',
                  kota: 'Tangerang Selatan',
                  mobil: 'Honda HR-V 1.5 SE CVT',
                  foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                  review: 'Pelayanan sangat profesional! Mobil diantar tepat waktu, hasil polesan kinclong seperti baru keluar pabrik. Lembar laporan inspeksi 175 titiknya sangat detail dan menenangkan hati.',
                },
                {
                  nama: 'Ir. Hendra Gunawan',
                  kota: 'Jakarta Pusat',
                  mobil: 'Hyundai Ioniq 5 Long Range',
                  foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                  review: 'Membeli mobil listrik pertama kali dibantu tuntas dari edukasi fitur sampai dibantu koordinasi pasang charger wallbox di rumah. Transaksi transparan tanpa biaya gaib.',
                },
                {
                  nama: 'Bambang Trihatmodjo',
                  kota: 'Jakarta Selatan',
                  mobil: 'Innova Zenix Modellista',
                  foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                  review: 'Proses leasing BCA Finance dibantu super cepat cuma butuh waktu 2 hari langsung approval PO. Sales sangat responsif diajak diskusi kapan saja.',
                },
              ].map((testi, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                      "{testi.review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                    <img
                      src={testi.foto}
                      alt={testi.nama}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{testi.nama}</h4>
                      <p className="text-xs text-slate-500">
                        Pembeli {testi.mobil} • {testi.kota}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA CONSULTATION SECTION ================= */}
        <section className="bg-gradient-to-r from-brand-700 to-brand-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black">
              Ingin Konsultasi Atau Tukar Tambah Mobil Lama?
            </h2>
            <p className="text-brand-100 text-base max-w-2xl mx-auto leading-relaxed">
              Tim konsultan otomotif kami siap melayani pertanyaan spesifikasi, simulasi DP terjangkau, maupun taksiran harga mobil lama Anda selama 24 jam.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="https://wa.me/6281289123456?text=Halo%20Sales,%20saya%20ingin%20tanya%20unit%20mobil%20atau%20tukar%20tambah"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Phone className="w-5 h-5" />
                Chat WhatsApp Sales Sekarang
              </a>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                Jelajahi Semua Mobil
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

