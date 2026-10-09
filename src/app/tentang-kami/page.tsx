import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export default function TentangKamiPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Profile */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-md">
              Profil Showroom Otomotif
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Membangun Standar Baru Jual Beli Mobil di Indonesia
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              AutoShowroom hadir untuk menghapus kekhawatiran masyarakat saat membeli kendaraan roda empat. Melalui teknologi inspeksi independen 175 titik dan garansi purnajual komprehensif, kami memastikan setiap mobil yang Anda bawa pulang memberikan rasa aman maksimal.
            </p>
          </div>

          {/* Visi Misi & Nilai */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">100% Transparansi</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Seluruh data jarak tempuh (kilometer asli), riwayat servis resmi, dan kondisi fisik kendaraan dicatat tanpa rekayasa. Tidak ada yang disembunyikan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Garansi Mesin 1 Tahun</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Memberikan ketenangan pikiran dengan garansi perbaikan transmisi dan komponen vital mesin di jaringan ratusan bengkel resmi rekanan di seluruh Indonesia.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Konsultan Ahli Berdedikasi</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Tim sales kami bukan sekadar penjual, melainkan konsultan otomotif yang membantu menemukan unit paling pas dengan kebutuhan dan kapasitas anggaran keluarga Anda.
              </p>
            </div>
          </div>

          {/* 175 Titik Inspeksi Detail */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="max-w-3xl space-y-4 mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-400">
                Sistem Pengujian Ketat
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Apa Saja Yang Diperiksa Dalam 175 Titik Inspeksi?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Setiap unit harus lolos sertifikasi mekanik bersertifikat sebelum diizinkan masuk ke dalam ruang pamer dan katalog penjualan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-brand-400 text-sm">1. Sektor Mesin</h4>
                <p className="text-slate-400">Kompresi silinder, kebocoran oli, timing belt, radiator, alternator, dan catalytic converter.</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-brand-400 text-sm">2. Sasis & Bodi</h4>
                <p className="text-slate-400">Integritas pilar A/B/C, apron depan, lantai bagasi, bebas jejak las perbaikan tabrakan berat.</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-brand-400 text-sm">3. Elektrikal & Fitur</h4>
                <p className="text-slate-400">Sistem ECU scan OBD-II, airbag system, headunit, sunroof, AC dingin stabil, dan lampu-lampu.</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-brand-400 text-sm">4. Kaki-Kaki & Rem</h4>
                <p className="text-slate-400">Shock absorber, tierod, rack end, ketebalan kampas rem, ABS sensor, dan umur tapak ban.</p>
              </div>
            </div>
          </div>

          {/* Showroom Fisik & Google Maps */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    Kunjungi Showroom Kami
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Gedung AutoShowroom Pusat
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    Rasakan sensasi test drive langsung di area tertutup yang luas dan nyaman. Konsultasikan pembiayaan di ruang tunggu VIP ber-AC dengan hidangan kopi gratis.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
                    <span>Jl. Arteri Pondok Indah No. 88, Kebayoran Lama, Jakarta Selatan 12240</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-600 shrink-0" />
                    <span>Setiap Hari (Senin - Minggu): 08.00 - 20.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Hotline Showroom: (021) 7890-1234 / WA 0812-8912-3456</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 h-72 sm:h-80 bg-slate-100">
                <iframe
                  title="Lokasi AutoShowroom Jakarta"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257570417688!2d106.78216127499042!3d-6.229731993758416!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x2e69f149b578c2e9%3A0x6b6c0757c91c3d1f!2sPondok%20Indah%20Mall!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

