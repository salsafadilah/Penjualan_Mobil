import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const order = getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ success: false, message: 'Pesanan tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: order });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    const updated = updateOrderStatus(
      params.id,
      body.status,
      body.catatanAdmin,
      body.salesHandler
    );
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

