"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import {
  getPermohonanById,
  type StatusPermohonan,
} from "@/src/data/fake-db/admin/DataPermohonan";

const statusConfig: Record<
  StatusPermohonan,
  { label: string; className: string; icon: string }
> = {
  "Menunggu Verifikasi": {
    label: "Menunggu Verifikasi",
    className: "bg-gray-100 text-gray-600",
    icon: "ri-time-line",
  },
  "Sedang Diverifikasi": {
    label: "Sedang Diverifikasi",
    className: "bg-amber-100 text-amber-700",
    icon: "ri-loader-4-line",
  },
  Disetujui: {
    label: "Disetujui",
    className: "bg-emerald-100 text-emerald-700",
    icon: "ri-checkbox-circle-line",
  },
  Revisi: {
    label: "Revisi",
    className: "bg-orange-100 text-orange-700",
    icon: "ri-error-warning-line",
  },
  Ditolak: {
    label: "Ditolak",
    className: "bg-red-100 text-red-600",
    icon: "ri-close-circle-line",
  },
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <h2 className="text-[13px] font-bold text-gray-700 uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[14px] text-gray-800 font-medium">
        {value || <span className="text-gray-300 font-normal">—</span>}
      </p>
    </div>
  );
}

export default function DetailPermohonanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const data = getPermohonanById(id);

  const [selectedDoc, setSelectedDoc] = useState<string>("");

  if (!data) return notFound();

  const statusCfg = statusConfig[data.status];
  const availableDocs = data.dokumen.filter((d) => d.url !== null);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-2">
            <Link
              href="/admin/data-permohonan"
              className="hover:text-[#8B1E1E] transition-colors"
            >
              Data Permohonan
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-gray-600 font-medium">{id}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Detail NCAGE — {data.nama_perusahaan}
          </h1>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1E1E] text-white text-[13px] font-semibold hover:bg-[#6e1818] active:scale-95 transition-all shadow-sm shadow-[#8B1E1E]/20 shrink-0"
        >
          <i className="ri-arrow-left-line" />
          Kembali
        </button>
      </div>

      <SectionCard title="Status Permohonan">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <Field label="Nama Pemohon" value={data.nama_pemohon} />

          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold w-fit ${statusCfg.className}`}
            >
              <i className={statusCfg.icon} />
              {statusCfg.label}
            </span>
          </div>

          <Field label="Diverifikasi Oleh" value={data.diverifikasi_oleh} />
          <Field label="Divalidasi Oleh" value={data.divalidasi_oleh} />
          <Field label="Diminta Revisi Oleh" value={data.diminta_revisi_oleh} />
          <Field label="Ditolak Oleh" value={data.ditolak_oleh} />
        </div>
      </SectionCard>

      <SectionCard title="Dokumen Terlampir">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.dokumen.map((doc) => (
              <div
                key={doc.nama}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-[13px] font-medium transition-all ${
                  doc.url
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700"
                    : "border-gray-100 bg-gray-50 text-gray-400"
                }`}
              >
                <i
                  className={`${doc.url ? "ri-file-check-line" : "ri-file-line"} text-base shrink-0`}
                />
                <span className="truncate">{doc.label}</span>
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto shrink-0 text-emerald-600 hover:text-emerald-800 transition-colors"
                    title="Lihat dokumen"
                  >
                    <i className="ri-external-link-line text-sm" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100">
            <p className="text-[12px] font-semibold text-gray-500 mb-2">
              Preview Dokumen
            </p>
            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/10 focus:border-[#8B1E1E] transition-all mb-3"
            >
              <option value="">— Pilih dokumen —</option>
              {availableDocs.map((doc) => (
                <option key={doc.nama} value={doc.url ?? ""}>
                  {doc.label}
                </option>
              ))}
            </select>

            {selectedDoc ? (
              <iframe
                src={selectedDoc}
                className="w-full h-[480px] rounded-xl border border-gray-200 bg-gray-50"
                title="Preview Dokumen"
              />
            ) : (
              <div className="w-full h-28 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
                <p className="text-[13px] text-gray-400">
                  Belum ada dokumen yang dipilih.
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="A. Identifikasi Entitas">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
          <Field
            label="Tanggal Pengajuan"
            value={new Date(data.tanggal_pengajuan).toLocaleDateString(
              "id-ID",
              { day: "2-digit", month: "long", year: "numeric" },
            )}
          />
          <Field label="Jenis Permohonan" value={data.jenis_permohonan} />
          <div />
          <Field label="Jenis Permohonan NCAGE" value={data.jenis_ncage} />
          <Field label="Tujuan Penerbitan" value={data.tujuan_penerbitan} />
          <Field label="Tipe Entitas" value={data.tipe_entitas} />
          <Field
            label="Status Kepemilikan Bangunan"
            value={data.status_kepemilikan}
          />
          <Field label="AHU Terdaftar" value={data.is_ahu_registered} />
          <Field label="Koordinat Kantor" value={data.koordinat_kantor} />
          <Field label="NIB" value={data.nib} />
          <Field label="NPWP" value={data.npwp} />
          <Field label="Bidang Usaha" value={data.bidang_usaha} />
        </div>
      </SectionCard>

      <SectionCard title="B. Narahubung">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
          <Field label="Nama" value={data.nama_pemohon} />
          <Field label="Nomor Identitas" value={data.nomor_identitas} />
          <Field label="Alamat" value={data.alamat_pemohon} />
          <Field label="Nomor Telepon" value={data.no_hp_pemohon} />
          <Field label="Email" value={data.email_pemohon} />
          <Field label="Jabatan" value={data.jabatan_pemohon} />
        </div>
      </SectionCard>

      <SectionCard title="C. Detail Badan Usaha">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
          <Field label="Nama Perusahaan" value={data.nama_perusahaan} />
          <Field label="Provinsi" value={data.provinsi} />
          <Field label="Kota" value={data.kota} />
          <Field label="Jalan" value={data.alamat_kantor} />
          <Field label="Kode Pos" value={data.kode_pos} />
          <Field label="PO Box" value={data.po_box} />
          <Field label="Nomor Telepon" value={data.no_telepon_kantor} />
          <Field label="Fax" value={data.no_fax_kantor} />
          <Field label="Email" value={data.email_kantor} />
          <Field label="Website" value={data.website_kantor} />
          <Field label="Perusahaan Afiliasi" value={data.perusahaan_afiliasi} />
        </div>
      </SectionCard>

      <SectionCard title="D. Informasi Lainnya">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
          <Field label="Produk" value={data.produk_dihasilkan} />
          <Field label="Kapasitas Produksi" value={data.kemampuan_produksi} />
          <Field label="Jumlah Karyawan" value={data.jumlah_karyawan} />
          <Field label="Nama Cabang" value={data.kantor_cabang} />
          <Field label="Jalan Cabang" value={data.jalan_cabang} />
          <Field label="Kota Cabang" value={data.kota_cabang} />
          <Field label="Kode Pos Cabang" value={data.kode_pos_cabang} />
          <Field
            label="Perusahaan Afiliasi"
            value={data.perusahaan_afiliasi_info}
          />
          <Field
            label="Jalan Perusahaan Afiliasi"
            value={data.jalan_afiliasi}
          />
          <Field label="Kota Perusahaan Afiliasi" value={data.kota_afiliasi} />
          <Field
            label="Kode Pos Perusahaan Afiliasi"
            value={data.kode_pos_afiliasi}
          />
        </div>
      </SectionCard>
    </div>
  );
}
