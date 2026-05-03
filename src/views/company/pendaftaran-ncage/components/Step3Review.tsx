"use client";

import React, { useState } from "react";

// --- DATA DUMMY SEMENTARA ---
const fileReviews = [
  {
    label: "Surat Permohonan NCAGE *",
    name: "Surat Permohonan NCAGE_1.pdf",
    size: "4.4 MB",
  },
  {
    label: "Surat Pernyataan Kebenaran Data *",
    name: "Surat Pernyataan NCAGE_1.pdf",
    size: "2.2 MB",
  },
  {
    label: "Foto Kantor (dengan GPS Map Camera) *",
    name: "GMAPS_Kantor1.pdf",
    size: "200 KB",
  },
  { label: "SK Domisili", name: "SKDom.pdf", size: "1 MB" },
  { label: "Akta Notaris *", name: "Akta notaris1.pdf", size: "300 KB" },
  { label: "SK Kemenkumham *", name: "SK_Kemenkumham_1.pdf", size: "3 MB" },
  {
    label: "SIUP/NIB (Nomor Induk Berusaha) *",
    name: "NIB_Perusahaan_1.pdf",
    size: "2.1 MB",
  },
  {
    label: "Company Profile Perusahaan *",
    name: "Compro1.pdf",
    size: "4.5 MB",
  },
  { label: "NPWP Perusahaan *", name: "NPWP_1.pdf", size: "2.5 MB" },
  {
    label: "Surat Kuasa",
    name: "Surat kuasa perusahaan_1.pdf",
    size: "250 KB",
  },
  { label: "Daftar Isian SAM.GOV", name: "SAMGOV_1.pdf", size: "3.3 MB" },
];

const contactPerson = [
  { label: "Nama Pemohon *", value: "Budi Santoso" },
  { label: "Nomor Identitas (KTP/SIM) *", value: "3201234567890" },
  { label: "Alamat *", value: "Jl. Raya Pasar Minggu No. 12, Jakarta Selatan" },
  { label: "Nomor telepon/ HP (Pemohon) *", value: "081234567890" },
  { label: "Email (Pemohon) *", value: "budi.santoso@email.com" },
  { label: "Jabatan", value: "Direktur Utama" },
];

const badanUsaha = [
  { label: "Nama Badan Usaha *", value: "PT Maju Jaya Sejahtera" },
  { label: "Provinsi *", value: "DKI Jakarta" },
  { label: "Kota *", value: "Jakarta Selatan" },
  { label: "Alamat Kantor *", value: "Jl. TB Simatupang No. 89, Cilandak" },
  { label: "Kode Pos *", value: "12430" },
  { label: "PO.Box *", value: "12345" },
  { label: "No. Telepon (Kantor) *", value: "(021) 7654321" },
  { label: "No. FAX (Kantor)", value: "(021) 7654322" },
  { label: "Email (Kantor) *", value: "info@majujayasejahtera.co.id" },
  { label: "Website (Kantor)", value: "www.majujayasejahtera.co.id" },
  { label: "Perusahaan Afiliasi", value: "PT Global Industri Nusantara" },
];

// --- KOMPONEN PEMBANTU UNTUK BARIS FORM ---
const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <div className="sm:w-1/3 text-sm text-gray-500 font-medium">{label}</div>
    <div className="sm:w-2/3 text-sm text-gray-900 font-semibold flex gap-2">
      <span className="hidden sm:inline">:</span> {value}
    </div>
  </div>
);

export default function Step3Review() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-gray-800">
          Konfirmasi dan Kirim
        </h2>
      </div>

      <div className="space-y-12">
        {/* ================================
            SECTION 1: REVIEW BERKAS
        ================================ */}
        <div className="space-y-6">
          {fileReviews.map((file, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {file.label}
              </label>
              <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-500 text-white rounded flex items-center justify-center">
                    <i className="ri-file-text-line text-xl"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      {file.size} • Berhasil diunggah
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <i className="ri-check-line"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================================
            SECTION 2: REVIEW FORMULIR
        ================================ */}
        <div className="space-y-8 pt-8 border-t border-gray-200">
          <div className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">b. Contact Person</h3>
            </div>
            <div className="p-6 space-y-4">
              {contactPerson.map((item, idx) => (
                <ReviewRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">c. Detail Badan Usaha</h3>
            </div>
            <div className="p-6 space-y-4">
              {badanUsaha.map((item, idx) => (
                <ReviewRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">d. Informasi Lainnya</h3>
            </div>
            <div className="p-6 space-y-4">
              <ReviewRow
                label="Produk Yang Dihasilkan"
                value="Alat Elektronik Industri (Panel Kontrol & Sensor)"
              />
              <ReviewRow
                label="Kemampuan Produksi"
                value="± 1000 Unit per bulan"
              />
              <ReviewRow label="Jumlah Karyawan" value="120 Orang" />

              <div className="pt-4 mt-2">
                <h4 className="font-semibold text-red-700 mb-4 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>{" "}
                  Kantor Cabang
                </h4>
                <div className="pl-4 space-y-4">
                  <ReviewRow
                    label="Nama Kantor Cabang"
                    value="Cabang Surabaya"
                  />
                  <ReviewRow label="Nama Jalan" value="Jl. Ahmad Yani No. 45" />
                  <ReviewRow label="Kota" value="Surabaya" />
                  <ReviewRow label="Kode Pos" value="60231" />
                </div>
              </div>

              <div className="pt-4 mt-2">
                <h4 className="font-semibold text-red-700 mb-4 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>{" "}
                  Perusahaan Afiliasi
                </h4>
                <div className="pl-4 space-y-4">
                  <ReviewRow
                    label="Nama Perusahaan Afiliasi"
                    value="PT Global Industri Nusantara"
                  />
                  <ReviewRow
                    label="Nama Jalan"
                    value="Jl. Gatot Subroto No. 12"
                  />
                  <ReviewRow label="Kota" value="Jakarta Selatan" />
                  <ReviewRow label="Kode Pos" value="12950" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================
            CHECKBOX PERNYATAAN
        ================================ */}
        <div className="mt-8 p-5 border border-gray-200 rounded-xl bg-gray-50">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 accent-[#8a1515] rounded border-gray-300 cursor-pointer"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className="text-sm text-gray-700 leading-relaxed font-medium">
              Saya menyatakan data dan dokumen yang diunggah sudah benar dan
              dapat dipertanggung jawabkan
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
