import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAccountBySession, getAdminBySession } from './db';
import { Account, AdminUser, PublicAccount, PublicAdminUser } from './types';

export const SESSION_COOKIE = 'as_session';
export const SESSION_DAYS = 7;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(expected, actual);
}

export function newSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export function toPublicAccount(account: Account): PublicAccount {
  const { passwordHash: _omit, ...rest } = account;
  return rest;
}

export function getCurrentAccount(): Account | undefined {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return token ? getAccountBySession(token) : undefined;
}

export function sessionCookieOptions(expires: Date) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  };
}

// ================= ADMIN =================
export const ADMIN_COOKIE = 'as_admin';
export const ADMIN_SESSION_HOURS = 8;

export function getCurrentAdmin(): AdminUser | undefined {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token ? getAdminBySession(token) : undefined;
}

export function toPublicAdmin(admin: AdminUser): PublicAdminUser {
  const { passwordHash: _omit, ...rest } = admin;
  return rest;
}

// Dipakai di route API khusus admin: kembalikan response 401 jika belum login admin
export function requireAdmin(): NextResponse | null {
  if (getCurrentAdmin()) return null;
  return NextResponse.json({ success: false, error: 'Akses khusus admin. Silakan login.' }, { status: 401 });
}
