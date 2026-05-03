import { z } from "zod";

export const identitasSchema = z.object({
  tanggal_pengajuan: z.string().optional(),
  jenis_permohonan: z.string().min(1, "Jenis permohonan wajib dipilih."),
  jenis_ncage: z.string().min(1, "Jenis permohonan NCAGE wajib dipilih."),
  tujuan_penerbitan: z.string().min(1, "Tujuan penerbitan NCAGE wajib dipilih."),
  tipe_entitas: z.string().min(1, "Tipe entitas wajib dipilih."),
  status_kepemilikan: z.string().min(1, "Status kepemilikan bangunan wajib dipilih."),
  is_ahu_registered: z.string().min(1, "Pilihan pendaftaran AHU wajib diisi."),
  koordinat_kantor: z.string().min(1, "Koordinat kantor wajib diisi."),
  nib: z.string().min(1, "NIB wajib diisi."),
  npwp: z.string().min(1, "NPWP wajib diisi."),
  bidang_usaha: z.string().min(1, "Bidang usaha wajib diisi."),
});

export const kontakSchema = z.object({
  nama_pemohon: z.string().min(1, "Nama pemohon wajib diisi."),
  nomor_identitas: z.string().min(1, "Nomor identitas wajib diisi."),
  alamat_pemohon: z.string().min(1, "Alamat wajib diisi."),
  no_hp_pemohon: z.string().min(1, "Nomor HP wajib diisi."),
  email_pemohon: z
    .string()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),
  jabatan_pemohon: z.string().optional(),
});

export const badanUsahaSchema = z.object({
  nama_badan_usaha: z.string().min(1, "Nama badan usaha wajib diisi."),
  provinsi: z.string().min(1, "Provinsi wajib dipilih."),
  kota: z.string().min(1, "Kota wajib dipilih."),
  alamat_kantor: z.string().min(1, "Alamat kantor wajib diisi."),
  kode_pos: z.string().min(1, "Kode pos wajib diisi."),
  po_box: z.string().min(1, "PO.Box wajib diisi."),
  no_telepon_kantor: z.string().min(1, "Nomor telepon kantor wajib diisi."),
  no_fax_kantor: z.string().optional(),
  email_kantor: z
    .string()
    .min(1, "Email kantor wajib diisi.")
    .email("Format email tidak valid."),
  website_kantor: z.string().optional(),
  perusahaan_afiliasi: z.string().optional(),
});

export const informasiLainnyaSchema = z.object({
  produk_dihasilkan: z.string().optional(),
  kemampuan_produksi: z.string().optional(),
  jumlah_karyawan: z.string().optional(),
  kantor_cabang: z.string().optional(),
  jalan_cabang: z.string().optional(),
  kota_cabang: z.string().optional(),
  kode_pos_cabang: z.string().optional(),
  perusahaan_afiliasi_info: z.string().optional(),
  jalan_afiliasi: z.string().optional(),
  kota_afiliasi: z.string().optional(),
  kode_pos_afiliasi: z.string().optional(),
});
