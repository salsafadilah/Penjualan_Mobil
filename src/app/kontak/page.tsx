'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';

export default function KontakPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [sent, setSent] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Bagaimana cara melakukan pemesanan atau booking unit mobil?',
      a: 'Anda dapat memilih mobil di katalog, lalu klik tombol "Pesan Mobil Sekarang". Isi data diri di formulir pemesanan, dan tim sales kami akan langsung menghubungi Anda via WhatsApp untuk penguncian unit dan pengiriman surat pemesanan (SPK).',
    },
    {
      q: 'Apakah bisa mengajukan kredit dengan DP rendah?',
      a: 'Bisa! Kami bekerjasama resmi dengan BCA Finance, Mandiri Tunas Finance, Adira Finance, dan OTO dengan pilihan uang muka mulai dari 15% - 20% dan tenor fleksibel hingga 5 tahun.',
    },
    {
      q: 'Apakah ada jaminan mobil bebas banjir dan tabrakan?',
      a: 'Pasti. Setiap mobil yang dijual di AutoShowroom dilengkapi sertifikat inspeksi 175 titik resmi. Kami memberikan jaminan 5 hari uang kembali 100% jika ditemukan bekas banjir atau tabrakan sasis.',
    },
    {
      q: 'Bisa melakukan tukar tambah (Trade-In) mobil lama?',
      a: 'Sangat bisa. Kami menerima tukar tambah segala merek dan tipe mobil. Tim appraisal kami akan menaksir harga mobil lama Anda dengan harga kompetitif dan transparan di hari yang sama.',
    },
    {
      q: 'Berapa lama proses serah terima unit mobil?',
      a: 'Untuk pembelian tunai, mobil dapat diserahterimakan dalam 1-2 hari kerja setelah proses poles dan detailing selesai. Untuk kredit, rata-rata membutuhkan 2-3 hari kerja setelah approval leasing terbit.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setNama('');
      setEmail('');
      setPesan('');
      setSent(false);
    }, 4000);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-md">
              Layanan Pelanggan
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Hubungi Tim Konsultan Kami
            </h1>
            <p className="text-slate-500 text-sm">
              Kami siap melayani kebutuhan informasi mobil, test drive, perhitungan kredit, maupun janji temu showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card Highlight */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xs">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Respon Cepat via WhatsApp</h3>
                    <p className="text-emerald-100 text-xs">Aktif setiap hari 08.00 - 22.00 WIB</p>
                  </div>
                </div>

                <p className="text-xs text-emerald-100 leading-relaxed">
                  Ingin bertanya ketersediaan unit, minta video kondisi mobil, atau konsultasi simulasi cicilan? Klik tombol di bawah untuk langsung terhubung dengan sales representative kami.
                </p>

                <a
                  href="https://wa.me/6281289123456?text=Halo%20AutoShowroom,%20saya%20ingin%20konsultasi%20pembelian%20mobil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-white text-emerald-900 text-xs shadow-md hover:bg-emerald-50 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Buka Chat WhatsApp (0812-8912-3456)
                </a>
              </div>

              {/* Showroom Contacts Info */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Informasi Kantor & Showroom
                </h4>

                <div className="space-y-4 text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block">Alamat Showroom Utama</strong>
                      <span>Jl. Arteri Pondok Indah No. 88, Kebayoran Lama, Jakarta Selatan 12240</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block">Telepon Kantor (Hunting)</strong>
                      <span>(021) 7890-1234 / (021) 7890-5678</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block">Alamat Email Resmi</strong>
                      <span>sales@autoshowroom.co.id / support@autoshowroom.co.id</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan Online</h3>
              <p className="text-slate-500 text-xs mb-6">
                Tuliskan pertanyaan atau permintaan informasi mobil Anda, kami akan membalas ke email atau nomor telepon Anda.
              </p>

              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base">Pesan Anda Telah Terkirim!</h4>
                  <p className="text-emerald-700 text-xs">
                    Terima kasih telah menghubungi kami. Konsultan kami akan menghubungi Anda secepatnya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1.5">
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

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1.5">
                      Pesan / Pertanyaan *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      placeholder="Tuliskan detail pertanyaan seputar unit mobil atau jadwal test drive..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 text-sm flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Pesan Sekarang
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase font-extrabold text-brand-600 tracking-wider">
                FAQ
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Pertanyaan yang Sering Diajukan
              </h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        activeFaq === idx ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

