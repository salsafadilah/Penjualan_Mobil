export type CarTransmission = 'Otomatis' | 'Manual';
export type CarFuel = 'Bensin' | 'Diesel' | 'Hybrid' | 'Listrik';
export type CarBodyType = 'SUV' | 'MPV' | 'Sedan' | 'Hatchback' | 'City Car' | 'Commercial';
export type CarStatus = 'Tersedia' | 'Booking' | 'Terjual';

export interface Car {
  id: string;
  nama: string;
  merek: string; // Toyota, Honda, Mitsubishi, Hyundai, Suzuki, Daihatsu, dll.
  tipe: CarBodyType;
  tahun: number;
  harga: number; // in IDR
  hargaCoret?: number;
  transmisi: CarTransmission;
  bahanBakar: CarFuel;
  kilometer: number;
  warna: string;
  kapasitasMesin: string; // e.g. "1.500 cc"
  platNomor: string; // e.g. "B (Ganjil) Jakarta"
  stok: number;
  status: CarStatus;
  fotoUtama: string;
  galeri: string[];
  deskripsi: string;
  fitur: string[];
  promoBadge?: string; // "Promo Akhir Tahun", "DP Ringan", "Unit Langka", etc.
  terlaris?: boolean;
  unggulan?: boolean;
}

export type OrderStatus = 'Menunggu Konfirmasi' | 'Diproses' | 'Selesai' | 'Dibatalkan';
export type PaymentMethod = 'Tunai (Cash Keras)' | 'Kredit / Leasing';

export interface CustomerData {
  nama: string;
  noHp: string;
  email: string;
  nik: string;
  alamat: string;
  kota: string;
}

export interface OrderDocuments {
  ktp?: string;
  fotoRumah?: string;
  tagihanListrik?: string;
  slipGaji?: string;
}

export interface Order {
  id: string;
  nomorPesanan: string; // e.g. "ORD-202610-8921"
  idMobil: string;
  mobilNama: string;
  mobilMerek: string;
  mobilTahun: number;
  mobilHarga: number;
  mobilFoto: string;
  customer: CustomerData;
  tanggal: string; // ISO date string
  metodePembayaran: PaymentMethod;
  pilihanLeasing?: string; // e.g. "BCA Finance", "Mandiri Tunas Finance", "Adira Finance"
  persentaseDp?: number; // e.g. 20 (%)
  uangMuka?: number; // DP (Rp)
  persentaseBunga?: number; // e.g. 5.5 (% per tahun)
  totalBunga?: number; // Total bunga selama tenor (Rp)
  tenorBulan?: number; // 12, 24, 36, 48, 60
  angsuranPerBulan?: number;
  catatan?: string;
  dokumen?: OrderDocuments;
  status: OrderStatus;
  catatanAdmin?: string;
  salesHandler?: string;
  idAkun?: string; // akun pelanggan yang membuat pesanan
}

// Akun pelanggan (wajib login sebelum "Pesan Unit")
export interface Account {
  id: string;
  nama: string;
  email: string;
  noWhatsapp: string;
  lokasi: string; // lokasi tinggal (kota/kabupaten)
  passwordHash: string; // "salt:hash" (scrypt)
  dibuat: string; // ISO date
}

export type PublicAccount = Omit<Account, 'passwordHash'>;

export interface Session {
  token: string;
  idAkun: string; // id akun pelanggan, atau id admin jika tipe 'admin'
  tipe?: 'pelanggan' | 'admin'; // kosong = pelanggan
  kedaluwarsa: string; // ISO date
}

export type UserRole = 'Super Admin' | 'Sales' | 'Kasir';

export interface AdminUser {
  id: string;
  nama: string;
  username: string;
  role: UserRole;
  email: string;
  avatar?: string;
  passwordHash?: string; // "salt:hash" (scrypt); tanpa hash = tidak bisa login
}

export type PublicAdminUser = Omit<AdminUser, 'passwordHash'>;

export interface Promo {
  id: string;
  judul: string;
  kode: string;
  deskripsi: string;
  diskonPersen?: number;
  potonganHarga?: number; // IDR
  bannerImg: string;
  periodeBerlaku: string;
  aktif: boolean;
}

