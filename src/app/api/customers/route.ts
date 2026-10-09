import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getCustomers } from '@/lib/db';

export async function GET() {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const customers = getCustomers();
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

