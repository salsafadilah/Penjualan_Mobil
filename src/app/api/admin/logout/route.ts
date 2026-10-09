import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession } from '@/lib/db';
import { ADMIN_COOKIE } from '@/lib/auth';

export async function POST() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (token) deleteSession(token);
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
