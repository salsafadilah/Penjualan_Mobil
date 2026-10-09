import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/db';

export async function GET() {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const stats = getDashboardStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

