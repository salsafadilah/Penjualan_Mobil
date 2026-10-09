import fs from 'fs';
import path from 'path';
import { Car, Order, Promo, AdminUser, OrderStatus, Account, Session, PublicAdminUser } from './types';
import { initialCars, initialOrders, initialPromos, initialUsers } from '../data/initialData';

interface DatabaseSchema {
  cars: Car[];
  orders: Order[];
  promos: Promo[];
  users: AdminUser[];
  accounts: Account[];
  sessions: Session[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

function ensureDataFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      cars: initialCars,
      orders: initialOrders,
      promos: initialPromos,
      users: initialUsers,
      accounts: [],
      sessions: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content) as DatabaseSchema;
    // database lama belum punya akun pelanggan
    parsed.accounts = parsed.accounts || [];
    parsed.sessions = parsed.sessions || [];
    return parsed;
  } catch (err) {
    console.error('Error reading database file, resetting to defaults:', err);
    const initialData: DatabaseSchema = {
      cars: initialCars,
      orders: initialOrders,
      promos: initialPromos,
      users: initialUsers,
      accounts: [],
      sessions: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database file:', err);
  }
}

// ================= CARS =================
export function getCars(): Car[] {
  const db = ensureDataFile();
  return db.cars;
}

export function getCarById(id: string): Car | undefined {
  const cars = getCars();
  return cars.find((c) => c.id === id);
}

export function createCar(carData: Omit<Car, 'id'>): Car {
  const db = ensureDataFile();
  const newCar: Car = {
    ...carData,
    id: `car-${Date.now()}`,
  };
  db.cars.unshift(newCar);
  saveDb(db);
  return newCar;
}

export function updateCar(id: string, carData: Partial<Car>): Car | null {
  const db = ensureDataFile();
  const index = db.cars.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.cars[index] = { ...db.cars[index], ...carData };
  saveDb(db);
  return db.cars[index];
}

export function deleteCar(id: string): boolean {
  const db = ensureDataFile();
  const initialLen = db.cars.length;
  db.cars = db.cars.filter((c) => c.id !== id);
  if (db.cars.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// ================= ORDERS =================
export function getOrders(): Order[] {
  const db = ensureDataFile();
  return db.orders;
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((o) => o.id === id || o.nomorPesanan === id);
}

export function createOrder(data: {
  idMobil: string;
  customer: {
    nama: string;
    noHp: string;
    email: string;
    nik: string;
    alamat: string;
    kota: string;
  };
  metodePembayaran: Order['metodePembayaran'];
  pilihanLeasing?: string;
  persentaseDp?: number;
  uangMuka?: number;
  persentaseBunga?: number;
  totalBunga?: number;
  tenorBulan?: number;
  angsuranPerBulan?: number;
  catatan?: string;
  dokumen?: Order['dokumen'];
  idAkun?: string;
}): Order {
  const db = ensureDataFile();
  const car = db.cars.find((c) => c.id === data.idMobil);
  if (!car) {
    throw new Error('Mobil tidak ditemukan');
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const nomorPesanan = `ORD-${yearMonth}-${randomNum}`;

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    nomorPesanan,
    idMobil: car.id,
    mobilNama: car.nama,
    mobilMerek: car.merek,
    mobilTahun: car.tahun,
    mobilHarga: car.harga,
    mobilFoto: car.fotoUtama,
    customer: data.customer,
    tanggal: now.toISOString(),
    metodePembayaran: data.metodePembayaran,
    pilihanLeasing: data.pilihanLeasing,
    persentaseDp: data.persentaseDp,
    uangMuka: data.uangMuka,
    persentaseBunga: data.persentaseBunga,
    totalBunga: data.totalBunga,
    tenorBulan: data.tenorBulan,
    angsuranPerBulan: data.angsuranPerBulan,
    catatan: data.catatan,
    dokumen: data.dokumen,
    status: 'Menunggu Konfirmasi',
    salesHandler: 'Tim Sales Showroom',
    idAkun: data.idAkun,
  };

  db.orders.unshift(newOrder);

  // Jika stok mobil > 0, bisa update status jadi booking
  if (car.stok > 0) {
    car.stok = Math.max(0, car.stok - 1);
    if (car.stok === 0) car.status = 'Booking';
  }

  saveDb(db);
  return newOrder;
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  catatanAdmin?: string,
  salesHandler?: string
): Order | null {
  const db = ensureDataFile();
  const index = db.orders.findIndex((o) => o.id === id || o.nomorPesanan === id);
  if (index === -1) return null;

  db.orders[index].status = status;
  if (catatanAdmin !== undefined) {
    db.orders[index].catatanAdmin = catatanAdmin;
  }
  if (salesHandler !== undefined) {
    db.orders[index].salesHandler = salesHandler;
  }

  // Jika status pesanan selesai, pastikan unit mobil tercatat terjual jika perlu
  if (status === 'Selesai') {
    const car = db.cars.find((c) => c.id === db.orders[index].idMobil);
    if (car && car.stok === 0) {
      car.status = 'Terjual';
    }
  }

  saveDb(db);
  return db.orders[index];
}

// ================= CUSTOMERS =================
export function getCustomers() {
  const orders = getOrders();
  const customerMap = new Map<
    string,
    {
      id: string;
      nama: string;
      noHp: string;
      email: string;
      alamat: string;
      kota: string;
      totalPesanan: number;
      totalNilai: number;
      terakhirPesan: string;
      daftarPesanan: string[];
    }
  >();

  for (const o of orders) {
    const key = o.customer.noHp || o.customer.email || o.customer.nama;
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        id: `cust-${customerMap.size + 1}`,
        nama: o.customer.nama,
        noHp: o.customer.noHp,
        email: o.customer.email,
        alamat: o.customer.alamat,
        kota: o.customer.kota,
        totalPesanan: 1,
        totalNilai: o.mobilHarga,
        terakhirPesan: o.tanggal,
        daftarPesanan: [o.nomorPesanan],
      });
    } else {
      const existing = customerMap.get(key)!;
      existing.totalPesanan += 1;
      existing.totalNilai += o.mobilHarga;
      if (new Date(o.tanggal) > new Date(existing.terakhirPesan)) {
        existing.terakhirPesan = o.tanggal;
      }
      existing.daftarPesanan.push(o.nomorPesanan);
    }
  }

  return Array.from(customerMap.values());
}

// ================= PROMOS =================
export function getPromos(): Promo[] {
  const db = ensureDataFile();
  return db.promos;
}

export function createPromo(promoData: Omit<Promo, 'id'>): Promo {
  const db = ensureDataFile();
  const newPromo: Promo = {
    ...promoData,
    id: `promo-${Date.now()}`,
  };
  db.promos.unshift(newPromo);
  saveDb(db);
  return newPromo;
}

export function updatePromo(id: string, promoData: Partial<Promo>): Promo | null {
  const db = ensureDataFile();
  const index = db.promos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.promos[index] = { ...db.promos[index], ...promoData };
  saveDb(db);
  return db.promos[index];
}

export function deletePromo(id: string): boolean {
  const db = ensureDataFile();
  const initialLen = db.promos.length;
  db.promos = db.promos.filter((p) => p.id !== id);
  if (db.promos.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// ================= USERS =================
export function getUsers(): PublicAdminUser[] {
  const db = ensureDataFile();
  return db.users.map(({ passwordHash: _omit, ...rest }) => rest);
}

export function getAdminByUsername(username: string): AdminUser | undefined {
  const db = ensureDataFile();
  const u = username.trim().toLowerCase();
  return db.users.find((a) => a.username.toLowerCase() === u);
}

export function getAdminBySession(token: string): AdminUser | undefined {
  const db = ensureDataFile();
  const session = db.sessions.find((s) => s.token === token && s.tipe === 'admin');
  if (!session || new Date(session.kedaluwarsa).getTime() <= Date.now()) return undefined;
  return db.users.find((a) => a.id === session.idAkun);
}

// ================= ACCOUNTS (PELANGGAN) =================
export function getAccountByEmail(email: string): Account | undefined {
  const db = ensureDataFile();
  const e = email.trim().toLowerCase();
  return db.accounts.find((a) => a.email.toLowerCase() === e);
}

export function createAccount(data: Omit<Account, 'id' | 'dibuat'>): Account {
  const db = ensureDataFile();
  const account: Account = {
    ...data,
    id: `acc-${Date.now()}`,
    dibuat: new Date().toISOString(),
  };
  db.accounts.push(account);
  saveDb(db);
  return account;
}

export function createSession(
  idAkun: string,
  token: string,
  kedaluwarsa: Date,
  tipe: 'pelanggan' | 'admin' = 'pelanggan'
): void {
  const db = ensureDataFile();
  const now = Date.now();
  db.sessions = db.sessions.filter((s) => new Date(s.kedaluwarsa).getTime() > now);
  db.sessions.push({ token, idAkun, tipe, kedaluwarsa: kedaluwarsa.toISOString() });
  saveDb(db);
}

export function getAccountBySession(token: string): Account | undefined {
  const db = ensureDataFile();
  const session = db.sessions.find((s) => s.token === token && s.tipe !== 'admin');
  if (!session || new Date(session.kedaluwarsa).getTime() <= Date.now()) return undefined;
  return db.accounts.find((a) => a.id === session.idAkun);
}

export function deleteSession(token: string): void {
  const db = ensureDataFile();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  saveDb(db);
}

// ================= STATS FOR DASHBOARD =================
export function getDashboardStats() {
  const db = ensureDataFile();
  const totalOrders = db.orders.length;
  const newOrders = db.orders.filter((o) => o.status === 'Menunggu Konfirmasi').length;
  const processedOrders = db.orders.filter((o) => o.status === 'Diproses').length;
  const completedOrders = db.orders.filter((o) => o.status === 'Selesai').length;
  const cancelledOrders = db.orders.filter((o) => o.status === 'Dibatalkan').length;

  const totalRevenue = db.orders
    .filter((o) => o.status === 'Selesai')
    .reduce((sum, o) => sum + o.mobilHarga, 0);

  const potentialRevenue = db.orders
    .filter((o) => o.status !== 'Dibatalkan')
    .reduce((sum, o) => sum + o.mobilHarga, 0);

  const totalCars = db.cars.length;
  const availableCars = db.cars.filter((c) => c.status === 'Tersedia').length;
  const bookedCars = db.cars.filter((c) => c.status === 'Booking').length;
  const soldCars = db.cars.filter((c) => c.status === 'Terjual').length;

  return {
    totalOrders,
    newOrders,
    processedOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    potentialRevenue,
    totalCars,
    availableCars,
    bookedCars,
    soldCars,
  };
}

export { formatRupiah } from './utils';


