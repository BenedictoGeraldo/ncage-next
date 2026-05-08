// ─── Types ───────────────────────────────────────────────────────────────────
export type StatusKodeNcage = "Aktif" | "Tidak Aktif";

export interface NcageRecord {
  id: string;
  kode_ncage: string;
  nama_perusahaan: string;
  status_kode: StatusKodeNcage;
  tipe_entitas: string;
  tanggal_terbit: string;
  // Referensi ke permohonan asal
  permohonan_id: string;
  sertifikat_url?: string | null;
}

// ─── Fake Data ────────────────────────────────────────────────────────────────
export const fakeNcageRecordsData: NcageRecord[] = [
  {
    id: "REC-001",
    kode_ncage: "ID7A2B1",
    nama_perusahaan: "PT Maju Bersama Indonesia",
    status_kode: "Aktif",
    tipe_entitas: "A",
    tanggal_terbit: "2026-05-03",
    permohonan_id: "NCG-2026-001",
  },
  {
    id: "REC-002",
    kode_ncage: "ID3C9D4",
    nama_perusahaan: "PT Surya Cemerlang",
    status_kode: "Aktif",
    tipe_entitas: "B",
    tanggal_terbit: "2026-04-27",
    permohonan_id: "NCG-2026-008",
  },
  {
    id: "REC-003",
    kode_ncage: "ID5E8F2",
    nama_perusahaan: "PT Nusantara Persada",
    status_kode: "Aktif",
    tipe_entitas: "B",
    tanggal_terbit: "2026-04-22",
    permohonan_id: "NCG-2026-011",
  },
  {
    id: "REC-004",
    kode_ncage: "ID1A3K7",
    nama_perusahaan: "CV Nusa Raya Teknik",
    status_kode: "Tidak Aktif",
    tipe_entitas: "A",
    tanggal_terbit: "2022-03-10",
    permohonan_id: "NCG-2022-004",
  },
];
