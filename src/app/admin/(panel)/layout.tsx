import React from 'react';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { getCurrentAdmin } from '@/lib/auth';

export const metadata = {
  title: 'Panel Admin - AutoShowroom Penjualan Mobil',
  description: 'Sistem rekap pesanan, manajemen mobil, dan laporan penjualan showroom.',
};

// selalu cek login admin di server pada setiap request
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader nama={admin.nama} role={admin.role} />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
