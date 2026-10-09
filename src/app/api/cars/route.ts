import { requireAdmin } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getCars, createCar } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let cars = getCars();

    const merek = searchParams.get('merek');
    const tipe = searchParams.get('tipe');
    const transmisi = searchParams.get('transmisi');
    const bahanBakar = searchParams.get('bahanBakar');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    if (merek && merek !== 'Semua') {
      cars = cars.filter((c) => c.merek.toLowerCase() === merek.toLowerCase());
    }
    if (tipe && tipe !== 'Semua') {
      cars = cars.filter((c) => c.tipe.toLowerCase() === tipe.toLowerCase());
    }
    if (transmisi && transmisi !== 'Semua') {
      cars = cars.filter((c) => c.transmisi.toLowerCase() === transmisi.toLowerCase());
    }
    if (bahanBakar && bahanBakar !== 'Semua') {
      cars = cars.filter((c) => c.bahanBakar.toLowerCase() === bahanBakar.toLowerCase());
    }
    if (status && status !== 'Semua') {
      cars = cars.filter((c) => c.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      cars = cars.filter(
        (c) =>
          c.nama.toLowerCase().includes(q) ||
          c.merek.toLowerCase().includes(q) ||
          c.deskripsi.toLowerCase().includes(q)
      );
    }

    if (sort === 'termurah') {
      cars.sort((a, b) => a.harga - b.harga);
    } else if (sort === 'termahal') {
      cars.sort((a, b) => b.harga - a.harga);
    } else if (sort === 'tahun-terbaru') {
      cars.sort((a, b) => b.tahun - a.tahun);
    } else if (sort === 'km-terendah') {
      cars.sort((a, b) => a.kilometer - b.kilometer);
    }

    return NextResponse.json({ success: true, data: cars });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    const newCar = createCar(body);
    return NextResponse.json({ success: true, data: newCar }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

