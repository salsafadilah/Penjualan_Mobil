import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function GET() {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const users = getUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

