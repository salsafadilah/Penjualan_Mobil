import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getPromos, createPromo } from '@/lib/db';

export async function GET() {
  try {
    const promos = getPromos();
    return NextResponse.json({ success: true, data: promos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    const promo = createPromo(body);
    return NextResponse.json({ success: true, data: promo }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

