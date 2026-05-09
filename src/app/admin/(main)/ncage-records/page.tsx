import { createAdminClient } from "@/src/utils/supabase/admin";
import { DataTableNcageRecords } from "@/src/components/admin/DataTableNcageRecords";
import type { NcageRecord } from "@/src/data/fake-db/admin/NcageRecords";

async function getNcageRecords(): Promise<NcageRecord[]> {
  const supabase = createAdminClient();
  const now = new Date();

  const { data, error } = await supabase
    .from("ncage_records")
    .select(`
      id,
      ncage_code,
      entity_name,
      toec,
      ncagesd,
      issued_at,
      expires_at,
      creation_date,
      updated_at,
      domestic_certificate_path,
      ncage_application_id
    `)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[ncage-records] Gagal fetch data:", error.message);
    return [];
  }

  type NcageRecordRow = {
    id: string;
    ncage_code: string | null;
    entity_name: string | null;
    toec: string | null;
    ncagesd: string | null;
    issued_at: string | null;
    expires_at: string | null;
    creation_date: string | null;
    updated_at: string | null;
    domestic_certificate_path: string | null;
    ncage_application_id: string | null;
  };

  const rows = data as unknown as NcageRecordRow[];
  const pathsToSign = rows
    .map((r) => r.domestic_certificate_path)
    .filter(Boolean) as string[];

  const signedUrlsMap: Record<string, string> = {};

  if (pathsToSign.length > 0) {
    const { data: signedData } = await supabase.storage
      .from("ncage_documents")
      .createSignedUrls(pathsToSign, 3600); // 1 jam valid

    if (signedData) {
      signedData.forEach((item) => {
        if (!item.error && item.signedUrl && item.path) {
          signedUrlsMap[item.path] = item.signedUrl;
        }
      });
    }
  }

  return rows.map((row) => {
    const issuedAtRaw = row.issued_at ?? row.creation_date ?? row.updated_at;
    const expiresAtRaw =
      row.expires_at ??
      (issuedAtRaw
        ? new Date(
            new Date(issuedAtRaw).setFullYear(
              new Date(issuedAtRaw).getFullYear() + 5,
            ),
          ).toISOString()
        : null);

    const isActive = expiresAtRaw ? new Date(expiresAtRaw) > now : false;

    let sertifikat_url = null;
    if (row.domestic_certificate_path && signedUrlsMap[row.domestic_certificate_path]) {
      sertifikat_url = signedUrlsMap[row.domestic_certificate_path];
    }

    return {
      id: row.id,
      kode_ncage: row.ncage_code ?? "-",
      nama_perusahaan: row.entity_name ?? "-",
      status_kode: isActive ? "Aktif" : "Tidak Aktif",
      tipe_entitas: row.toec ?? "-",
      tanggal_terbit: issuedAtRaw
        ? new Date(issuedAtRaw).toISOString().split("T")[0]
        : "-",
      tanggal_kadaluarsa: expiresAtRaw
        ? new Date(expiresAtRaw).toISOString().split("T")[0]
        : "-",
      permohonan_id: row.ncage_application_id ?? "-",
      sertifikat_url,
    };
  });
}

export default async function NcageRecordsPage() {
  const records = await getNcageRecords();

  return (
    <div className="p-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-[28px] font-semibold text-gray-800 tracking-tight">
          NCAGE Records
        </h1>
        <p className="text-[14px] text-gray-500 mt-2.5 font-normal leading-relaxed">
          Rekap seluruh kode NCAGE yang telah diterbitkan beserta statusnya secara sistematis.
        </p>
      </div>

      <DataTableNcageRecords data={records} />
    </div>
  );
}
