import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getCarById, updateCar, deleteCar } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const car = getCarById(params.id);
  if (!car) {
    return NextResponse.json({ success: false, message: 'Mobil tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: car });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    const updated = updateCar(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Mobil tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin();
  if (denied) return denied;
  const success = deleteCar(params.id);
  if (!success) {
    return NextResponse.json({ success: false, message: 'Mobil tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Mobil berhasil dihapus' });
}

