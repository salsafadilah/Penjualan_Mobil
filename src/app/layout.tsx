import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoShowroom - Penjualan Mobil Baru & Bekas Terpercaya',
  description: 'Showroom mobil terbaik dengan pilihan terlengkap, garansi mesin 1 tahun, inspeksi 150+ titik, dan simulasi kredit termurah.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}

