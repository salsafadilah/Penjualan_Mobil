import { NextResponse } from 'next/server';
import { createAccount, createSession, getAccountByEmail } from '@/lib/db';
import {
  SESSION_COOKIE,
  SESSION_DAYS,
  hashPassword,
  newSessionToken,
  sessionCookieOptions,
  toPublicAccount,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nama = String(body.nama || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const noWhatsapp = String(body.noWhatsapp || '').replace(/[\s-]/g, '');
    const lokasi = String(body.lokasi || '').trim();
    const password = String(body.password || '');

    if (!nama || !email || !noWhatsapp || !lokasi || !password) {
      return NextResponse.json({ success: false, error: 'Semua kolom wajib diisi.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Format email tidak valid.' }, { status: 400 });
    }
    if (!/^(\+62|62|0)8\d{7,12}$/.test(noWhatsapp)) {
      return NextResponse.json(
        { success: false, error: 'Nomor WhatsApp tidak valid (contoh: 081234567890).' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password minimal 6 karakter.' }, { status: 400 });
    }
    if (getAccountByEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email sudah terdaftar. Silakan login.' }, { status: 409 });
    }

    const account = createAccount({
      nama,
      email,
      noWhatsapp,
      lokasi,
      passwordHash: hashPassword(password),
    });

    // langsung login setelah mendaftar
    const token = newSessionToken();
    const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
    createSession(account.id, token, expires);

    const res = NextResponse.json({ success: true, data: toPublicAccount(account) }, { status: 201 });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(expires));
    return res;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
