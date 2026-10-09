import { NextResponse } from 'next/server';
import { getCurrentAccount, toPublicAccount } from '@/lib/auth';

export async function GET() {
  const account = getCurrentAccount();
  if (!account) {
    return NextResponse.json({ success: false, error: 'Belum login.' }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: toPublicAccount(account) });
}
