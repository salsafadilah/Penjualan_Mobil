'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogIn, UserPlus } from 'lucide-react';

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500';
const labelCls = 'block text-xs font-bold text-slate-700 uppercase mb-1.5';

// hanya izinkan redirect ke path internal
function safeNext(next: string | null): string {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : '/katalog';
}

export default function AuthForm({ mode }: { mode: 'login' | 'daftar' }) {
  return (
    <Suspense fallback={null}>
      <AuthFormInner mode={mode} />
    </Suspense>
  );
}

function AuthFormInner({ mode }: { mode: 'login' | 'daftar' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get('next'));
  const nextQuery = searchParams.get('next') ? `?next=${encodeURIComponent(next)}` : '';

  const isLogin = mode === 'login';
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [noWhatsapp, setNoWhatsapp] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isLogin ? { email, password } : { nama, email, noWhatsapp, lokasi, password }
        ),
      });
      const json = await res.json();
      if (json.success) {
        router.push(next);
        router.refresh();
      } else {
        setError(json.error || 'Terjadi kesalahan.');
      }
    } catch (err: any) {
      setError('Terjadi kesalahan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Login Pelanggan' : 'Buat Akun'}
            </h1>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            {isLogin
              ? 'Masuk terlebih dahulu untuk memesan unit mobil.'
              : 'Daftar untuk dapat memesan unit mobil.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={labelCls}>Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className={inputCls}
                />
              </div>
            )}

            <div>
              <label className={labelCls}>Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={inputCls}
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className={labelCls}>No. WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={noWhatsapp}
                    onChange={(e) => setNoWhatsapp(e.target.value)}
                    placeholder="081234567890"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Lokasi Tinggal *</label>
                  <input
                    type="text"
                    required
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan, Surabaya, Bandung..."
                    className={inputCls}
                  />
                </div>
              </>
            )}

            <div>
              <label className={labelCls}>Password *</label>
              <input
                type="password"
                required
                minLength={isLogin ? undefined : 6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? 'Password Anda' : 'Minimal 6 karakter'}
                className={inputCls}
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50"
            >
              {submitting ? 'Memproses...' : isLogin ? 'Login' : 'Buat Akun'}
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            {isLogin ? (
              <>
                Belum punya akun?{' '}
                <Link href={`/daftar${nextQuery}`} className="font-bold text-brand-600 hover:underline">
                  Buat akun
                </Link>
              </>
            ) : (
              <>
                Sudah punya akun?{' '}
                <Link href={`/login${nextQuery}`} className="font-bold text-brand-600 hover:underline">
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
