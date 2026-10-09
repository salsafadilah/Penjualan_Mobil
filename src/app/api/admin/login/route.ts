import { NextResponse } from 'next/server';
import { createSession, getAdminByUsername } from '@/lib/db';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_HOURS,
  newSessionToken,
  sessionCookieOptions,
  toPublicAdmin,
  verifyPassword,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username || '').trim();
    const password = String(body.password || '');

    const admin = username ? getAdminByUsername(username) : undefined;
    if (!admin || !admin.passwordHash || !verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json({ success: false, error: 'Username atau password salah.' }, { status: 401 });
    }

    const token = newSessionToken();
    const expires = new Date(Date.now() + ADMIN_SESSION_HOURS * 60 * 60 * 1000);
    createSession(admin.id, token, expires, 'admin');

    const res = NextResponse.json({ success: true, data: toPublicAdmin(admin) });
    res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions(expires));
    return res;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
