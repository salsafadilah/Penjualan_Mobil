import { NextResponse } from 'next/server';
import { createSession, getAccountByEmail } from '@/lib/db';
import {
  SESSION_COOKIE,
  SESSION_DAYS,
  newSessionToken,
  sessionCookieOptions,
  toPublicAccount,
  verifyPassword,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    const account = email ? getAccountByEmail(email) : undefined;
    if (!account || !verifyPassword(password, account.passwordHash)) {
      return NextResponse.json({ success: false, error: 'Email atau password salah.' }, { status: 401 });
    }

    const token = newSessionToken();
    const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
    createSession(account.id, token, expires);

    const res = NextResponse.json({ success: true, data: toPublicAccount(account) });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(expires));
    return res;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
