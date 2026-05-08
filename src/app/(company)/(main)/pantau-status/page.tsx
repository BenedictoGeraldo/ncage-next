import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const statusConfig: Record<
  number,
  { label: string; bgClass: string; textClass: string; icon: string }
> = {
  1: {
    label: "Permohonan Dikirim",
    bgClass: "bg-gray-100",
    textClass: "text-gray-700",
    icon: "ri-send-plane-line",
  },
  2: {
    label: "Verifikasi Berkas & Data",
    bgClass: "bg-[#FFF3CD]",
    textClass: "text-[#856404]",
    icon: "ri-loader-4-line",
  },
  3: {
    label: "Butuh Perbaikan",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    icon: "ri-error-warning-line",
  },
  4: {
    label: "Sertifikat Diterbitkan",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
    icon: "ri-checkbox-circle-line",
  },
  5: {
    label: "Permohonan Ditolak",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    icon: "ri-close-circle-line",
  },
};

export default async function PantauStatusPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("ncage_applications")
    .select(
      `
      id,
      created_at,
      updated_at,
      status_id,
      revision_notes,
      ncage_code,
      domestic_certificate_path,
      statuses ( name ),
      application_identities (
        application_type,
        ncage_request_type,
        purpose,
        entity_type
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Gagal fetch data status:", error.message);
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight mb-8">
          Pantau Status Pengajuan
        </h1>
        <div className="bg-white rounded-3xl border border-gray-100/50 p-12 text-center shadow-xl shadow-gray-200/30 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 hover:scale-110 shadow-inner">
            <i className="ri-inbox-line text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Belum Ada Pengajuan
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Anda belum melakukan pendaftaran NCAGE. Silakan ajukan permohonan
            baru melalui menu Pendaftaran NCAGE.
          </p>
          <Link
            href="/pendaftaran-ncage"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8C1E1E] hover:bg-[#721818] text-white font-semibold rounded-xl transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#8C1E1E]/20"
          >
            Mulai Pendaftaran
          </Link>
        </div>
      </div>
    );
  }

  let domesticCertificateUrl: string | null = null;
  if (data.domestic_certificate_path) {
    const { data: signedData } = await supabase.storage
      .from("ncage_documents")
      .createSignedUrl(data.domestic_certificate_path, 3600);
    if (signedData) {
      domesticCertificateUrl = signedData.signedUrl;
    }
  }

  const identity = Array.isArray(data.application_identities)
    ? data.application_identities[0]
    : data.application_identities;

  const statusId = data.status_id ?? 1;
  const cfg = statusConfig[statusId] || statusConfig[1];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight mb-8">
        Pantau Status Pengajuan
      </h1>

      <div className="bg-white rounded-3xl border border-gray-100/50 p-8 md:p-10 shadow-xl shadow-gray-200/30 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="flex flex-col divide-y divide-gray-100/60">
          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5 first:pt-0">
            <span className="text-gray-500 font-medium text-[15px]">
              ID Permohonan
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {data.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5">
            <span className="text-gray-500 font-medium text-[15px]">
              Tanggal Pengajuan
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5">
            <span className="text-gray-500 font-medium text-[15px]">
              Jenis Permohonan
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {identity?.application_type ?? "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5">
            <span className="text-gray-500 font-medium text-[15px]">
              Jenis Permohonan NCAGE
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {identity?.ncage_request_type ?? "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5">
            <span className="text-gray-500 font-medium text-[15px]">
              Tujuan Penerbitan NCAGE
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {identity?.purpose ?? "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5">
            <span className="text-gray-500 font-medium text-[15px]">
              Tipe Entitas
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <span className="text-gray-800 font-semibold text-[15px]">
              {identity?.entity_type ?? "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start md:items-center py-5 last:pb-0">
            <span className="text-gray-500 font-medium text-[15px]">
              Status Saat Ini
            </span>
            <span className="hidden md:block text-gray-300">:</span>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold tracking-wide shadow-sm ${cfg.bgClass} ${cfg.textClass}`}
              >
                <i className={`${cfg.icon} text-base`}></i>
                {cfg.label}
              </span>
            </div>
          </div>

          {statusId === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start pt-5 pb-2 last:pb-0">
              <span className="text-gray-500 font-medium text-[15px] pt-1">
                Catatan Revisi
              </span>
              <span className="hidden md:block text-gray-300 pt-1">:</span>
              <div className="flex flex-col items-start gap-4">
                {data.revision_notes && (
                  <div className="w-full p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-900 text-[14px] leading-relaxed">
                    <i className="ri-error-warning-line mr-2 text-orange-500 text-base"></i>
                    {data.revision_notes}
                  </div>
                )}
                <Link
                  href="/pendaftaran-ncage"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white text-[13px] font-semibold rounded-xl hover:bg-orange-700 transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] shadow-sm shadow-orange-600/20"
                >
                  <i className="ri-edit-2-line"></i>
                  Perbaiki Permohonan
                </Link>
              </div>
            </div>
          )}

          {statusId === 4 && data.domestic_certificate_path && (
            <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-2 md:gap-4 items-start pt-5 pb-2 last:pb-0">
              <span className="text-gray-500 font-medium text-[15px] pt-1">
                Dokumen Sertifikat
              </span>
              <span className="hidden md:block text-gray-300 pt-1">:</span>
              <div className="flex flex-col items-start gap-4">
                <a
                  href={domesticCertificateUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 text-[13px] font-bold rounded-xl hover:bg-emerald-200 transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] shadow-sm shadow-emerald-600/20"
                >
                  <i className="ri-download-2-line"></i>
                  Unduh Sertifikat (DOCX)
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
