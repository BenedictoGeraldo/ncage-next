// ─── Types ───────────────────────────────────────────────────────────────────
export type StatusPermohonan =
  | "Menunggu Verifikasi"
  | "Sedang Diverifikasi"
  | "Disetujui"
  | "Revisi"
  | "Ditolak";

// ── List (untuk tabel) ────────────────────────────────────────────────────────
export interface Permohonan {
  id: string;
  nama_pemohon: string;
  nama_perusahaan: string;
  status: StatusPermohonan;
  tanggal_pengajuan: string;
}

// ── Detail (untuk halaman detail) ─────────────────────────────────────────────
export interface DokumenBerkas {
  nama: string;
  label: string;
  url: string | null; // null = belum diupload
}

export interface PermohonanDetail extends Permohonan {
  // Status & verifikasi
  diverifikasi_oleh: string | null;
  divalidasi_oleh: string | null;
  diminta_revisi_oleh: string | null;
  ditolak_oleh: string | null;

  // A. Identifikasi Entitas
  jenis_permohonan: string;
  jenis_ncage: string;
  tujuan_penerbitan: string;
  tipe_entitas: string;
  status_kepemilikan: string;
  is_ahu_registered: string;
  koordinat_kantor: string;
  nib: string;
  npwp: string;
  bidang_usaha: string;

  // B. Narahubung
  nomor_identitas: string;
  alamat_pemohon: string;
  no_hp_pemohon: string;
  email_pemohon: string;
  jabatan_pemohon: string | null;

  // C. Detail Badan Usaha
  provinsi: string;
  kota: string;
  alamat_kantor: string;
  kode_pos: string;
  po_box: string | null;
  no_telepon_kantor: string;
  no_fax_kantor: string | null;
  email_kantor: string;
  website_kantor: string | null;
  perusahaan_afiliasi: string | null;

  // D. Informasi Lainnya
  produk_dihasilkan: string | null;
  kemampuan_produksi: string | null;
  jumlah_karyawan: string | null;
  kantor_cabang: string | null;
  jalan_cabang: string | null;
  kota_cabang: string | null;
  kode_pos_cabang: string | null;
  perusahaan_afiliasi_info: string | null;
  jalan_afiliasi: string | null;
  kota_afiliasi: string | null;
  kode_pos_afiliasi: string | null;

  // Dokumen
  dokumen: DokumenBerkas[];
}

// ─── Fake Data List ───────────────────────────────────────────────────────────
export const fakePermohonanData: Permohonan[] = [
  {
    id: "NCG-2026-001",
    nama_pemohon: "Budi Santoso",
    nama_perusahaan: "PT Maju Bersama Indonesia",
    status: "Disetujui",
    tanggal_pengajuan: "2026-05-01",
  },
  {
    id: "NCG-2026-002",
    nama_pemohon: "Siti Rahayu",
    nama_perusahaan: "CV Teknologi Nusantara",
    status: "Sedang Diverifikasi",
    tanggal_pengajuan: "2026-05-02",
  },
  {
    id: "NCG-2026-003",
    nama_pemohon: "Ahmad Fauzi",
    nama_perusahaan: "PT Karya Mandiri Sejahtera",
    status: "Menunggu Verifikasi",
    tanggal_pengajuan: "2026-05-03",
  },
  {
    id: "NCG-2026-004",
    nama_pemohon: "Dewi Lestari",
    nama_perusahaan: "PT Global Solusi Teknik",
    status: "Revisi",
    tanggal_pengajuan: "2026-05-04",
  },
  {
    id: "NCG-2026-005",
    nama_pemohon: "Hendra Wijaya",
    nama_perusahaan: "UD Bintang Timur",
    status: "Ditolak",
    tanggal_pengajuan: "2026-04-28",
  },
  {
    id: "NCG-2026-006",
    nama_pemohon: "Rina Wulandari",
    nama_perusahaan: "PT Artha Prima Utama",
    status: "Menunggu Verifikasi",
    tanggal_pengajuan: "2026-05-05",
  },
  {
    id: "NCG-2026-007",
    nama_pemohon: "Doni Kusuma",
    nama_perusahaan: "CV Jaya Abadi Konstruksi",
    status: "Sedang Diverifikasi",
    tanggal_pengajuan: "2026-05-05",
  },
  {
    id: "NCG-2026-008",
    nama_pemohon: "Fitri Handayani",
    nama_perusahaan: "PT Surya Cemerlang",
    status: "Disetujui",
    tanggal_pengajuan: "2026-04-25",
  },
  {
    id: "NCG-2026-009",
    nama_pemohon: "Wahyu Pratama",
    nama_perusahaan: "PT Delta Engineering",
    status: "Revisi",
    tanggal_pengajuan: "2026-04-30",
  },
  {
    id: "NCG-2026-010",
    nama_pemohon: "Nurul Hidayah",
    nama_perusahaan: "CV Mandiri Teknik Utama",
    status: "Menunggu Verifikasi",
    tanggal_pengajuan: "2026-05-06",
  },
  {
    id: "NCG-2026-011",
    nama_pemohon: "Bambang Sukirno",
    nama_perusahaan: "PT Nusantara Persada",
    status: "Disetujui",
    tanggal_pengajuan: "2026-04-20",
  },
  {
    id: "NCG-2026-012",
    nama_pemohon: "Yanti Kusumawati",
    nama_perusahaan: "PT Citra Raya Perkasa",
    status: "Sedang Diverifikasi",
    tanggal_pengajuan: "2026-05-06",
  },
];

// ─── Fake Data Detail ─────────────────────────────────────────────────────────
export const fakePermohonanDetail: Record<string, PermohonanDetail> = {
  "NCG-2026-001": {
    id: "NCG-2026-001",
    nama_pemohon: "Budi Santoso",
    nama_perusahaan: "PT Maju Bersama Indonesia",
    status: "Disetujui",
    tanggal_pengajuan: "2026-05-01",
    diverifikasi_oleh: "Admin NCAGE",
    divalidasi_oleh: "Admin NCAGE",
    diminta_revisi_oleh: null,
    ditolak_oleh: null,
    jenis_permohonan: "Perusahaan / Kelompok",
    jenis_ncage: "Permohonan Baru",
    tujuan_penerbitan: "SAM.GOV",
    tipe_entitas: "Jasa Layanan / Organisasi Profesional",
    status_kepemilikan: "Sendiri",
    is_ahu_registered: "Terdaftar",
    koordinat_kantor: "https://teo",
    nib: "1234567890123",
    npwp: "12345678901231",
    bidang_usaha: "Teknologi Informasi",
    nomor_identitas: "1234567890123456",
    alamat_pemohon: "Jl. Pondok Labu No. 5, Jakarta Selatan",
    no_hp_pemohon: "081234567890",
    email_pemohon: "budi.santoso@gmail.com",
    jabatan_pemohon: "Direktur Utama",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    alamat_kantor: "Jl. Sudirman No. 88, Gedung Maju Lt. 12",
    kode_pos: "12190",
    po_box: null,
    no_telepon_kantor: "02112345678",
    no_fax_kantor: "02112345679",
    email_kantor: "info@majubersama.co.id",
    website_kantor: "https://www.majubersama.co.id",
    perusahaan_afiliasi: "PT Induk Bersama",
    produk_dihasilkan: "Perangkat Lunak Manajemen",
    kemampuan_produksi: "100 unit/bulan",
    jumlah_karyawan: "250",
    kantor_cabang: null,
    jalan_cabang: null,
    kota_cabang: null,
    kode_pos_cabang: null,
    perusahaan_afiliasi_info: null,
    jalan_afiliasi: null,
    kota_afiliasi: null,
    kode_pos_afiliasi: null,
    dokumen: [
      { nama: "surat_permohonan", label: "Surat Permohonan", url: "#" },
      { nama: "surat_pernyataan", label: "Surat Pernyataan", url: "#" },
      { nama: "foto_kantor", label: "Foto Kantor", url: "#" },
      { nama: "sk_domisili", label: "SK Domisili", url: null },
      { nama: "akta_notaris", label: "Akta Notaris", url: "#" },
      { nama: "sk_kemenkumham", label: "SK Kemenkumham", url: "#" },
      { nama: "siup_nib", label: "SIUP / NIB", url: "#" },
      { nama: "company_profile", label: "Company Profile", url: "#" },
      { nama: "npwp_perusahaan", label: "NPWP Perusahaan", url: "#" },
      { nama: "surat_kuasa", label: "Surat Kuasa", url: null },
      { nama: "daftar_isian_sam", label: "Daftar Isian SAM", url: null },
    ],
  },
  "NCG-2026-002": {
    id: "NCG-2026-002",
    nama_pemohon: "Siti Rahayu",
    nama_perusahaan: "CV Teknologi Nusantara",
    status: "Sedang Diverifikasi",
    tanggal_pengajuan: "2026-05-02",
    diverifikasi_oleh: "Admin NCAGE",
    divalidasi_oleh: null,
    diminta_revisi_oleh: null,
    ditolak_oleh: null,
    jenis_permohonan: "Perusahaan / Kelompok",
    jenis_ncage: "Permohonan Baru",
    tujuan_penerbitan: "NATO",
    tipe_entitas: "Manufaktur",
    status_kepemilikan: "Sewa",
    is_ahu_registered: "Terdaftar",
    koordinat_kantor: "-6.2146, 106.8451",
    nib: "9876543210987",
    npwp: "98765432109876",
    bidang_usaha: "Elektronika",
    nomor_identitas: "3201234567890001",
    alamat_pemohon: "Jl. Margonda Raya No. 12, Depok",
    no_hp_pemohon: "081298765432",
    email_pemohon: "siti.rahayu@teknologi.com",
    jabatan_pemohon: "Manajer Umum",
    provinsi: "Jawa Barat",
    kota: "Depok",
    alamat_kantor: "Jl. Margonda Raya No. 12",
    kode_pos: "16431",
    po_box: null,
    no_telepon_kantor: "02177889900",
    no_fax_kantor: null,
    email_kantor: "info@teknonus.co.id",
    website_kantor: null,
    perusahaan_afiliasi: null,
    produk_dihasilkan: "Komponen Elektronika",
    kemampuan_produksi: null,
    jumlah_karyawan: "75",
    kantor_cabang: null,
    jalan_cabang: null,
    kota_cabang: null,
    kode_pos_cabang: null,
    perusahaan_afiliasi_info: null,
    jalan_afiliasi: null,
    kota_afiliasi: null,
    kode_pos_afiliasi: null,
    dokumen: [
      { nama: "surat_permohonan", label: "Surat Permohonan", url: "#" },
      { nama: "surat_pernyataan", label: "Surat Pernyataan", url: "#" },
      { nama: "foto_kantor", label: "Foto Kantor", url: "#" },
      { nama: "sk_domisili", label: "SK Domisili", url: "#" },
      { nama: "akta_notaris", label: "Akta Notaris", url: "#" },
      { nama: "sk_kemenkumham", label: "SK Kemenkumham", url: "#" },
      { nama: "siup_nib", label: "SIUP / NIB", url: "#" },
      { nama: "company_profile", label: "Company Profile", url: "#" },
      { nama: "npwp_perusahaan", label: "NPWP Perusahaan", url: "#" },
      { nama: "surat_kuasa", label: "Surat Kuasa", url: null },
      { nama: "daftar_isian_sam", label: "Daftar Isian SAM", url: null },
    ],
  },
  "NCG-2026-004": {
    id: "NCG-2026-004",
    nama_pemohon: "Dewi Lestari",
    nama_perusahaan: "PT Global Solusi Teknik",
    status: "Revisi",
    tanggal_pengajuan: "2026-05-04",
    diverifikasi_oleh: "Admin NCAGE",
    divalidasi_oleh: null,
    diminta_revisi_oleh: "Admin NCAGE",
    ditolak_oleh: null,
    jenis_permohonan: "Perusahaan / Kelompok",
    jenis_ncage: "Permohonan Baru",
    tujuan_penerbitan: "SAM.GOV",
    tipe_entitas: "Distributor",
    status_kepemilikan: "Milik Sendiri",
    is_ahu_registered: "Tidak Terdaftar",
    koordinat_kantor: "-6.3000, 106.9000",
    nib: "1122334455667",
    npwp: "11223344556677",
    bidang_usaha: "Perdagangan",
    nomor_identitas: "3201999888777001",
    alamat_pemohon: "Jl. Bekasi Raya No. 55",
    no_hp_pemohon: "08119988776",
    email_pemohon: "dewi.lestari@global.com",
    jabatan_pemohon: "Direktur",
    provinsi: "Jawa Barat",
    kota: "Bekasi",
    alamat_kantor: "Jl. Bekasi Raya No. 55, Bekasi Timur",
    kode_pos: "17111",
    po_box: null,
    no_telepon_kantor: "02188990011",
    no_fax_kantor: "02188990012",
    email_kantor: "office@globalsolusi.co.id",
    website_kantor: "https://globalsolusi.co.id",
    perusahaan_afiliasi: null,
    produk_dihasilkan: null,
    kemampuan_produksi: null,
    jumlah_karyawan: "40",
    kantor_cabang: null,
    jalan_cabang: null,
    kota_cabang: null,
    kode_pos_cabang: null,
    perusahaan_afiliasi_info: null,
    jalan_afiliasi: null,
    kota_afiliasi: null,
    kode_pos_afiliasi: null,
    dokumen: [
      { nama: "surat_permohonan", label: "Surat Permohonan", url: "#" },
      { nama: "surat_pernyataan", label: "Surat Pernyataan", url: "#" },
      { nama: "foto_kantor", label: "Foto Kantor", url: "#" },
      { nama: "sk_domisili", label: "SK Domisili", url: null },
      { nama: "akta_notaris", label: "Akta Notaris", url: "#" },
      { nama: "sk_kemenkumham", label: "SK Kemenkumham", url: "#" },
      { nama: "siup_nib", label: "SIUP / NIB", url: "#" },
      { nama: "company_profile", label: "Company Profile", url: "#" },
      { nama: "npwp_perusahaan", label: "NPWP Perusahaan", url: "#" },
      { nama: "surat_kuasa", label: "Surat Kuasa", url: null },
      { nama: "daftar_isian_sam", label: "Daftar Isian SAM", url: null },
    ],
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────
export function getPermohonanById(id: string): PermohonanDetail | null {
  // Cari di detail list, kalau tidak ada buat data generik dari list
  if (fakePermohonanDetail[id]) return fakePermohonanDetail[id];

  const listItem = fakePermohonanData.find((p) => p.id === id);
  if (!listItem) return null;

  // Fallback: generate detail minimal dari data list
  return {
    ...listItem,
    diverifikasi_oleh: null,
    divalidasi_oleh: null,
    diminta_revisi_oleh: null,
    ditolak_oleh: null,
    jenis_permohonan: "Perusahaan / Kelompok",
    jenis_ncage: "Permohonan Baru",
    tujuan_penerbitan: "SAM.GOV",
    tipe_entitas: "-",
    status_kepemilikan: "-",
    is_ahu_registered: "-",
    koordinat_kantor: "-",
    nib: "-",
    npwp: "-",
    bidang_usaha: "-",
    nomor_identitas: "-",
    alamat_pemohon: "-",
    no_hp_pemohon: "-",
    email_pemohon: "-",
    jabatan_pemohon: null,
    provinsi: "-",
    kota: "-",
    alamat_kantor: "-",
    kode_pos: "-",
    po_box: null,
    no_telepon_kantor: "-",
    no_fax_kantor: null,
    email_kantor: "-",
    website_kantor: null,
    perusahaan_afiliasi: null,
    produk_dihasilkan: null,
    kemampuan_produksi: null,
    jumlah_karyawan: null,
    kantor_cabang: null,
    jalan_cabang: null,
    kota_cabang: null,
    kode_pos_cabang: null,
    perusahaan_afiliasi_info: null,
    jalan_afiliasi: null,
    kota_afiliasi: null,
    kode_pos_afiliasi: null,
    dokumen: [
      { nama: "surat_permohonan", label: "Surat Permohonan", url: null },
      { nama: "surat_pernyataan", label: "Surat Pernyataan", url: null },
      { nama: "foto_kantor", label: "Foto Kantor", url: null },
      { nama: "sk_domisili", label: "SK Domisili", url: null },
      { nama: "akta_notaris", label: "Akta Notaris", url: null },
      { nama: "sk_kemenkumham", label: "SK Kemenkumham", url: null },
      { nama: "siup_nib", label: "SIUP / NIB", url: null },
      { nama: "company_profile", label: "Company Profile", url: null },
      { nama: "npwp_perusahaan", label: "NPWP Perusahaan", url: null },
      { nama: "surat_kuasa", label: "Surat Kuasa", url: null },
      { nama: "daftar_isian_sam", label: "Daftar Isian SAM", url: null },
    ],
  };
}
