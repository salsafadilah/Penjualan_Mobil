import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/db';
import { getCurrentAccount } from '@/lib/auth';

export async function GET(request: Request) {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(request.url);
    let orders = getOrders();

    const status = searchParams.get('status');
    const search = searchParams.get('search');

    if (status && status !== 'Semua') {
      orders = orders.filter((o) => o.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.nomorPesanan.toLowerCase().includes(q) ||
          o.customer.nama.toLowerCase().includes(q) ||
          o.customer.noHp.includes(q) ||
          o.mobilNama.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const account = getCurrentAccount();
    if (!account) {
      return NextResponse.json(
        { success: false, error: 'Silakan login terlebih dahulu untuk memesan unit.' },
        { status: 401 }
      );
    }
    const body = await request.json();
    const order = createOrder({ ...body, idAkun: account.id });
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

