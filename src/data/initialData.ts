import { Car, Order, Promo, AdminUser } from '../lib/types';

export const initialCars: Car[] = [
  {
    id: "car-01",
    nama: "Toyota Kijang Innova Zenix 2.0 V Q Hybrid Modellista",
    merek: "Toyota",
    tipe: "MPV",
    tahun: 2024,
    harga: 595000000,
    hargaCoret: 615000000,
    transmisi: "Otomatis",
    bahanBakar: "Hybrid",
    kilometer: 4500,
    warna: "Platinum White Pearl",
    kapasitasMesin: "1.987 cc",
    platNomor: "B (Ganjil) Jakarta Selatan",
    stok: 2,
    status: "Tersedia",
    fotoUtama: "https://imgcdn.oto.com/large/gallery/exterior/38/2707/toyota-innova-zenix-hybrid-ev-front-angle-low-view-239610.jpg",
    galeri: [
        "https://imgcdn.oto.com/large/gallery/exterior/38/2707/toyota-innova-zenix-hybrid-ev-front-angle-low-view-239610.jpg"
      ],
    deskripsi: "Toyota Innova Zenix Q Hybrid Modellista tahun 2024 kondisi like-new seperti baru keluar dari dealer. Full bodykit original Modellista, panoramic sunroof, captain seat ottoman elektrik dengan legrest, Toyota Safety Sense 3.0, headunit 10 inci dengan Apple CarPlay & Android Auto nirkabel. Service record resmi Toyota, buku manual dan kunci cadangan lengkap.",
    fitur: [
      "Panoramic Sunroof dengan Illumination LED",
      "Captain Seat Ottoman Elektrik",
      "Toyota Safety Sense 3.0 (Radar + Kamera)",
      "Wireless Apple CarPlay & Android Auto",
      "Power Backdoor dengan Voice Command",
      "Wireless Smartphone Charger",
      "Jaminan Bebas Banjir & Bebas Tabrak"
    ],
    promoBadge: "Promo Diskon Rp 20 Jt",
    terlaris: true,
    unggulan: true
  },
  {
    id: "car-02",
    nama: "Honda HR-V 1.5 SE CVT",
    merek: "Honda",
    tipe: "SUV",
    tahun: 2023,
    harga: 388000000,
    hargaCoret: 405000000,
    transmisi: "Otomatis",
    bahanBakar: "Bensin",
    kilometer: 12400,
    warna: "Sand Khaki Pearl (Two Tone)",
    kapasitasMesin: "1.498 cc DOHC i-VTEC",
    platNomor: "B (Genap) Tangerang",
    stok: 3,
    status: "Tersedia",
    fotoUtama: "https://www.hondamitra.com/media/products/2022-05/SE_CVT-01.png",
    galeri: [
        "https://www.hondamitra.com/media/products/2022-05/SE_CVT-01.png"
      ],
    deskripsi: "Honda HR-V 1.5 SE warna favorit Sand Khaki Pearl Two-Tone. Dilengkapi Honda SENSING lengkap (CMBS, LKAS, RDM, ACC with LSF, AHB, LCDN). Kondisi mulus orisinal, interior kulit bersih tanpa noda, ban tebal 90%, pajak panjang hingga 2027.",
    fitur: [
      "Honda SENSING Lengkap",
      "Panoramic Glass Roof",
      "Electrostatic Touch LED Cabin Lamp",
      "Hands-Free Power Tailgate with Walk-Away Close",
      "Digital TFT Meter Cluster 7 Inci",
      "Garansi Mesin & Transmisi 1 Tahun"
    ],
    promoBadge: "Bunga 0% 1 Tahun",
    terlaris: true,
    unggulan: true
  },
  {
    id: "car-03",
    nama: "Mitsubishi Pajero Sport 2.4 Dakar Ultimate 4x2",
    merek: "Mitsubishi",
    tipe: "SUV",
    tahun: 2023,
    harga: 645000000,
    hargaCoret: 670000000,
    transmisi: "Otomatis",
    bahanBakar: "Diesel",
    kilometer: 18000,
    warna: "Deep Bronze Metallic",
    kapasitasMesin: "2.442 cc MIVEC Turbo Diesel",
    platNomor: "B (Ganjil) Jakarta Barat",
    stok: 1,
    status: "Tersedia",
    fotoUtama: "https://imgcdn.oto.com/large/gallery/exterior/28/2364/mitsubishi-pajero-sport-70257.jpg",
    galeri: [
        "https://imgcdn.oto.com/large/gallery/exterior/28/2364/mitsubishi-pajero-sport-70257.jpg"
      ],
    deskripsi: "Mitsubishi Pajero Sport Dakar Ultimate tipe tertinggi dengan fitur kenyamanan dan keselamatan terdepan. Power Tailgate with Kick Sensor, Sunroof elektrik, Rear Seat Entertainment monitor plafon, Adaptive Cruise Control, FCM, BSW, RCTA. Mesin bertenaga 181 PS & torsi melimpah 430 Nm.",
    fitur: [
      "Electric Sunroof",
      "Roof Monitor 9 Inci untuk Penumpang Belakang",
      "Adaptive Cruise Control & Ultrasonic Misacceleration System",
      "Surround View Multi-around Monitor (Kamera 360)",
      "Power Tailgate with Kick Sensor",
      "Gratis Servis Berkala hingga 50.000 KM"
    ],
    promoBadge: "DP Mulai 15%",
    terlaris: false,
    unggulan: true
  },
  {
    id: "car-04",
    nama: "Hyundai Ioniq 5 Signature Long Range",
    merek: "Hyundai",
    tipe: "SUV",
    tahun: 2023,
    harga: 720000000,
    hargaCoret: 750000000,
    transmisi: "Otomatis",
    bahanBakar: "Listrik",
    kilometer: 8900,
    warna: "Gravity Gold Matte",
    kapasitasMesin: "Baterai 72.6 kWh (Jarak 481 KM)",
    platNomor: "B (Ganjil/Bebas Ganjil Genap) Jakarta",
    stok: 2,
    status: "Tersedia",
    fotoUtama: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRauGG1ddTHqqEMn83NuDHb1VxYRVfMhtXZ8SWj-_E6w_OKdjWoBOjq4jl_&s=10",
    galeri: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRauGG1ddTHqqEMn83NuDHb1VxYRVfMhtXZ8SWj-_E6w_OKdjWoBOjq4jl_&s=10"
      ],
    deskripsi: "Mobil listrik masa depan Hyundai Ioniq 5 varian tertinggi Signature Long Range dengan warna matte langka. Dilengkapi fitur V2L (Vehicle to Load) yang bisa menjadi genset portable, Relaxation Comfort Seats, Vision Roof, Hyundai SmartSense, dan audio premium Bose 8 speaker. Bebas aturan ganjil-genap selamanya di Jakarta!",
    fitur: [
      "Bebas Aturan Ganjil-Genap 100%",
      "Vehicle-to-Load (V2L) Colokan Listrik Luar & Dalam",
      "Relaxation Comfort Seats dengan Heating & Ventilation",
      "Bose Premium Sound System 8 Speaker",
      "Vision Roof Kaca Lebar",
      "Garansi Baterai Hyundai 8 Tahun / 160.000 KM"
    ],
    promoBadge: "Free Wallbox Charger",
    terlaris: true,
    unggulan: true
  },
  {
    id: "car-05",
    nama: "Toyota All New Avanza 1.5 G CVT TSS",
    merek: "Toyota",
    tipe: "MPV",
    tahun: 2023,
    harga: 245000000,
    hargaCoret: 260000000,
    transmisi: "Otomatis",
    bahanBakar: "Bensin",
    kilometer: 19500,
    warna: "Silver Mica Metallic",
    kapasitasMesin: "1.496 cc Dual VVT-i",
    platNomor: "D (Genap) Bandung",
    stok: 4,
    status: "Tersedia",
    fotoUtama: "https://astradigitaldigiroomuat.blob.core.windows.net/storage-uat-001/apa-itu-tss-pada-avanza.jpg",
    galeri: [
        "https://astradigitaldigiroomuat.blob.core.windows.net/storage-uat-001/apa-itu-tss-pada-avanza.jpg"
      ],
    deskripsi: "MPV sejuta umat terfavorit Toyota Avanza generasi terbaru dengan platform DNGA penggerak roda depan (FWD) yang super nyaman dan irit bensin. Sudah dilengkapi sistem keselamatan canggih Toyota Safety Sense (TSS) dan 6 airbag. Cocok untuk mobil keluarga dan operasional harian.",
    fitur: [
      "Toyota Safety Sense (Pre-Collision System, Lane Departure Assist)",
      "6 Airbags Keselamatan Lengkap",
      "Sofa Mode Interior Fleksibel",
      "Headunit 9 Inci Smartphone Connectivity",
      "Smart Entry & Engine Start-Stop Button",
      "Konsumsi BBM Sangat Irit (1:17 km/L)"
    ],
    promoBadge: "Angsuran Rp 4 Jutaan",
    terlaris: true,
    unggulan: false
  },
  {
    id: "car-06",
    nama: "Mitsubishi Xpander 1.5 Ultimate CVT",
    merek: "Mitsubishi",
    tipe: "MPV",
    tahun: 2023,
    harga: 285000000,
    hargaCoret: 298000000,
    transmisi: "Otomatis",
    bahanBakar: "Bensin",
    kilometer: 15300,
    warna: "Quartz White Pearl",
    kapasitasMesin: "1.499 cc MIVEC DOHC",
    platNomor: "F (Ganjil) Bogor",
    stok: 2,
    status: "Tersedia",
    fotoUtama: "https://imgcdn.oto.com/large/gallery/exterior/28/1635/mitsubishi-xpander-17705.jpg",
    galeri: [
        "https://imgcdn.oto.com/large/gallery/exterior/28/1635/mitsubishi-xpander-17705.jpg"
      ],
    deskripsi: "Mitsubishi Xpander Ultimate varian terlengkap dengan suspensi ternyaman di kelasnya. Dilengkapi Electric Parking Brake (EPB) with Auto Hold, Wireless Charger, AC Digital, dan interior two-tone mewah. Ruang kabin sangat senyap dan bagasi super lega.",
    fitur: [
      "Suspensi Lembut Khas Pajero Sport",
      "Electric Parking Brake with Brake Auto Hold",
      "Kamera Mundur & Sensor Parkir",
      "AC Digital dengan Max Cool",
      "Ground Clearance Tinggi 220 mm",
      "Bebas Bekas Tabrak & Banjir Bergaransi"
    ],
    promoBadge: "Diskon Khusus Pelajar/PNS",
    terlaris: false,
    unggulan: false
  },
  {
    id: "car-07",
    nama: "Honda Civic RS 1.5 VTEC Turbo",
    merek: "Honda",
    tipe: "Sedan",
    tahun: 2022,
    harga: 510000000,
    hargaCoret: 535000000,
    transmisi: "Otomatis",
    bahanBakar: "Bensin",
    kilometer: 21000,
    warna: "Ignite Red Metallic",
    kapasitasMesin: "1.498 cc VTEC Turbo (178 PS)",
    platNomor: "B (Genap) Jakarta Pusat",
    stok: 1,
    status: "Tersedia",
    fotoUtama: "https://imgcdn.oto.com/large/gallery/exterior/14/2482/honda-civic-rs-26026.jpg",
    galeri: [
        "https://imgcdn.oto.com/large/gallery/exterior/14/2482/honda-civic-rs-26026.jpg"
      ],
    deskripsi: "Sedan sporty prestisius Honda Civic RS generasi ke-11. Desain tajam aerodinamis, knalpot ganda sport exhaust, audio premium Bose 12 speaker, jok kulit suede beraksen jahitan merah, dan Honda Smart Key Card. Performa turbo responsif dan pengendalian presisi.",
    fitur: [
      "Honda Smart Key Card Tipis Eksklusif",
      "Bose Surround Sound System 12 Speaker",
      "Dual Sport Exhaust Muffler",
      "Honda SENSING Lengkap",
      "Full Digital 10.2 Inci Interactive Meter Cluster",
      "3 Driving Modes (Normal, Sport, Econ)"
    ],
    promoBadge: "Unit Favorit",
    terlaris: false,
    unggulan: true
  },
  {
    id: "car-08",
    nama: "Toyota Fortuner 2.8 GR Sport 4x2",
    merek: "Toyota",
    tipe: "SUV",
    tahun: 2023,
    harga: 615000000,
    hargaCoret: 635000000,
    transmisi: "Otomatis",
    bahanBakar: "Diesel",
    kilometer: 14200,
    warna: "Attitude Black Mica",
    kapasitasMesin: "2.755 cc 1GD-FTV Turbo Diesel",
    platNomor: "B (Ganjil) Bekasi",
    stok: 1,
    status: "Booking",
    fotoUtama: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcBPxMNUyRHdjxSv1ZY-6tucmQfY35OF1C2u1JGwZQVFFCzy1jFATxhywcv1Ndv3ZF_ZZx9hEQMzYyALesIcOxGD5SZrUYtvSKe7hLIKYs6jsK1ZiiJ5SBs8F_bWTWElehtn2LfjA?key=StYr8bg1s8wIrL26fe-C65mb",
    galeri: [
        "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcBPxMNUyRHdjxSv1ZY-6tucmQfY35OF1C2u1JGwZQVFFCzy1jFATxhywcv1Ndv3ZF_ZZx9hEQMzYyALesIcOxGD5SZrUYtvSKe7hLIKYs6jsK1ZiiJ5SBs8F_bWTWElehtn2LfjA?key=StYr8bg1s8wIrL26fe-C65mb"
      ],
    deskripsi: "Toyota Fortuner varian GR Sport bermesin monster 2.800 cc 1GD dengan tenaga buas 200 PS & torsi 500 Nm. Grille dan bodykit sporty Gazoo Racing, suspensi GR tuned, jok kulit berlogo GR, dan headunit support NFC saldo e-toll.",
    fitur: [
      "Mesin 1GD 2.8L Super Bertenaga 500 Nm",
      "GR Sport Body Aero Kit & Emblem Asli",
      "Surround Monitor 360 Derajat",
      "Power Backdoor with Kick Sensor",
      "NFC E-Money Check di Headunit",
      "Jaminan Sertifikat Inspeksi 175 Titik"
    ],
    promoBadge: "Sedang Dipesan",
    terlaris: true,
    unggulan: false
  }
];

export const initialOrders: Order[] = [
  {
    id: "ord-01",
    nomorPesanan: "ORD-202610-1092",
    idMobil: "car-01",
    mobilNama: "Toyota Kijang Innova Zenix 2.0 V Q Hybrid Modellista",
    mobilMerek: "Toyota",
    mobilTahun: 2024,
    mobilHarga: 595000000,
    mobilFoto: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    customer: {
      nama: "Bambang Trihatmodjo",
      noHp: "081289123456",
      email: "bambang.tri@gmail.com",
      nik: "3171051204850001",
      alamat: "Jl. Senopati Raya No. 42, Kebayoran Baru",
      kota: "Jakarta Selatan"
    },
    tanggal: "2026-10-06T14:32:00.000Z",
    metodePembayaran: "Kredit / Leasing",
    pilihanLeasing: "BCA Finance",
    persentaseDp: 30,
    uangMuka: 178500000,
    persentaseBunga: 5.5,
    totalBunga: 68722500,
    tenorBulan: 36,
    angsuranPerBulan: 13478400,
    catatan: "Mohon pelat nomor bantuan sementara disiapkan sebelum weekend.",
    dokumen: {
      ktp: "KTP_Bambang_Trihatmodjo.jpg",
      fotoRumah: "Foto_Rumah_Senopati_Jaksel.jpg",
      tagihanListrik: "Rekening_Listrik_PLN_3Bln.pdf",
      slipGaji: "Slip_Gaji_Direksi_Bambang.pdf"
    },
    status: "Diproses",
    catatanAdmin: "Berkas KTP, Foto Rumah, Tagihan Listrik & Slip Gaji sudah lengkap. Menunggu approval PO BCA Finance.",
    salesHandler: "Rian Hendrawan (Sales Executive)"
  },
  {
    id: "ord-02",
    nomorPesanan: "ORD-202610-1093",
    idMobil: "car-02",
    mobilNama: "Honda HR-V 1.5 SE CVT",
    mobilMerek: "Honda",
    mobilTahun: 2023,
    mobilHarga: 388000000,
    mobilFoto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    customer: {
      nama: "dr. Amanda Putri Sari",
      noHp: "081398765432",
      email: "amanda.putri@doctor.id",
      nik: "3275034509920003",
      alamat: "Cluster Victoria River Park No. B-12",
      kota: "Tangerang Selatan"
    },
    tanggal: "2026-10-07T09:15:00.000Z",
    metodePembayaran: "Tunai (Cash Keras)",
    catatan: "Kirim hari Jumat pagi ya pak, tolong dipoles ulang nano ceramic.",
    dokumen: {
      ktp: "KTP_dr_Amanda_Putri.jpg"
    },
    status: "Menunggu Konfirmasi",
    catatanAdmin: "Customer baru order via web, belum dihubungi via WA.",
    salesHandler: "Siti Rahmawati (Sales Counter)"
  },
  {
    id: "ord-03",
    nomorPesanan: "ORD-202610-1088",
    idMobil: "car-04",
    mobilNama: "Hyundai Ioniq 5 Signature Long Range",
    mobilMerek: "Hyundai",
    mobilTahun: 2023,
    mobilHarga: 720000000,
    mobilFoto: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    customer: {
      nama: "Ir. Hendra Gunawan, M.T.",
      noHp: "08119028341",
      email: "hendra.gunawan@techno.co.id",
      nik: "3174092108780004",
      alamat: "Menteng Residence Kav. 8",
      kota: "Jakarta Pusat"
    },
    tanggal: "2026-10-02T11:45:00.000Z",
    metodePembayaran: "Tunai (Cash Keras)",
    catatan: "Installasi wallbox charger di rumah sudah dijadwalkan bersama tim teknisi.",
    dokumen: {
      ktp: "KTP_Ir_Hendra_Gunawan.jpg"
    },
    status: "Selesai",
    catatanAdmin: "Unit dan BPKB asli telah diserahkan. Customer puas bintang 5.",
    salesHandler: "Rian Hendrawan (Sales Executive)"
  },
  {
    id: "ord-04",
    nomorPesanan: "ORD-202610-1075",
    idMobil: "car-05",
    mobilNama: "Toyota All New Avanza 1.5 G CVT TSS",
    mobilMerek: "Toyota",
    mobilTahun: 2023,
    mobilHarga: 245000000,
    mobilFoto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    customer: {
      nama: "Deden Kurniawan",
      noHp: "08561234908",
      email: "deden.kurnia@gmail.com",
      nik: "3273011405890002",
      alamat: "Jl. Dago Asri Raya No. 17",
      kota: "Bandung"
    },
    tanggal: "2026-09-28T16:20:00.000Z",
    metodePembayaran: "Kredit / Leasing",
    pilihanLeasing: "Mandiri Tunas Finance",
    persentaseDp: 20,
    uangMuka: 49000000,
    persentaseBunga: 4.8,
    totalBunga: 37632000,
    tenorBulan: 48,
    angsuranPerBulan: 4867300,
    dokumen: {
      ktp: "KTP_Deden_Kurniawan.jpg",
      fotoRumah: "Foto_Rumah_Dago_Bandung.jpg",
      tagihanListrik: "Rekening_PLN_Bandung.pdf",
      slipGaji: "Slip_Gaji_PT_Deden.pdf"
    },
    status: "Selesai",
    catatanAdmin: "Sudah serah terima unit di showroom cabang Bandung.",
    salesHandler: "Dewi Lestari (Sales Counter)"
  }
];

export const initialPromos: Promo[] = [
  {
    id: "promo-01",
    judul: "Pesta Kredit Hoki Akhir Tahun 2026",
    kode: "HOKI2026",
    deskripsi: "Bunga spesial mulai 2.2% per tahun untuk tenor hingga 4 tahun, ditambah gratis asuransi All-Risk 1 tahun pertama dan free coating senilai Rp 3.500.000.",
    diskonPersen: 5,
    bannerImg: "https://imgcdn.oto.com/large/gallery/exterior/14/2482/honda-civic-rs-26026.jpg",
    periodeBerlaku: "01 Okt 2026 - 31 Des 2026",
    aktif: true
  },
  {
    id: "promo-02",
    judul: "Trade-In Super Untung: Tukar Mobil Lama Dihargai Tinggi",
    kode: "TRADEINPLUS",
    deskripsi: "Tukarkan mobil lama merek apapun dengan mobil impian Anda. Dapatkan tambahan cashback ekstra hingga Rp 15.000.000 langsung dipotongkan ke DP.",
    potonganHarga: 15000000,
    bannerImg: "https://imgcdn.oto.com/large/gallery/exterior/28/2364/mitsubishi-pajero-sport-70257.jpg",
    periodeBerlaku: "Sampai Akhir Bulan",
    aktif: true
  },
  {
    id: "promo-03",
    judul: "Green Mobility: Subsidi Mobil Listrik & Hybrid",
    kode: "ECOGREEN",
    deskripsi: "Gratis instalasi home charging wallbox senilai Rp 12.000.000 + garansi tambahan servis gratis untuk setiap pembelian mobil listrik & hybrid.",
    potonganHarga: 10000000,
    bannerImg: "https://imgcdn.oto.com/large/gallery/exterior/38/2707/toyota-innova-zenix-hybrid-ev-front-angle-low-view-239610.jpg",
    periodeBerlaku: "Berlaku Selamanya",
    aktif: true
  }
];

export const initialUsers: AdminUser[] = [
  {
    id: "user-01",
    nama: "Fajar Pratama (Super Admin)",
    username: "admin",
    role: "Super Admin",
    email: "admin@autooto.co.id",
    passwordHash: "266e73dffb5bc25183805207409d010f:356f2934402e1bd20c6a8c22f6746d870cbfea99f4e8a29702f6bf5590bb3d107515383811de7eb7d25f4bbef0f496c914d3d3e76f27ffc2e0ef0dad9fba6da5",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-02",
    nama: "Rian Hendrawan",
    username: "sales",
    role: "Sales",
    email: "rian.sales@autooto.co.id",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-03",
    nama: "Siti Rahmawati",
    username: "kasir",
    role: "Kasir",
    email: "siti.kasir@autooto.co.id",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  }
];

