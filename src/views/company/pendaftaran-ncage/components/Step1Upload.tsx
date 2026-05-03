"use client";

import React, { useState } from "react";
import FileUploadDropzone from "@/src/components/ui/FileUploadDropzone";

const documentRequirements = [
  {
    name: "surat_permohonan",
    label: "Surat Permohonan NCAGE",
    required: true,
    accept: ".pdf",
  },
  {
    name: "surat_pernyataan",
    label: "Surat Pernyataan Kebenaran Data",
    required: true,
    accept: ".pdf",
  },
  {
    name: "foto_kantor",
    label: "Foto Kantor (Dengan GPS Map Camera)",
    required: true,
    accept: "image/*",
  }, // Khusus ini foto
  { name: "ktp_direksi", label: "KTP Direksi", required: true, accept: ".pdf" },
  {
    name: "akta_notaris",
    label: "Akta Notaris",
    required: true,
    accept: ".pdf",
  },
  {
    name: "sk_kemenkumham",
    label: "SK Kemenkumham",
    required: true,
    accept: ".pdf",
  },
  {
    name: "siup_nib",
    label: "SIUP/NIB (Nomor Induk Berusaha)",
    required: true,
    accept: ".pdf",
  },
  {
    name: "company_profile",
    label: "Company Profile Perusahaan",
    required: true,
    accept: ".pdf",
  },
  {
    name: "npwp_perusahaan",
    label: "NPWP Perusahaan",
    required: true,
    accept: ".pdf",
  },
  {
    name: "surat_kuasa",
    label: "Surat Kuasa",
    required: false,
    accept: ".pdf",
  },
  {
    name: "letter_sam_gov",
    label: "Letter From SAM GOV",
    required: false,
    accept: ".pdf",
  },
];

export default function Step1Upload() {
  // STATE SEMENTARA: Menyimpan file yang diupload dalam bentuk object { fieldName: File }
  // Nanti ini akan digantikan oleh react-hook-form
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, File | null>
  >({});

  const handleFileChange = (name: string, file: File | null) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-100 px-6 py-4 rounded-t-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800">
          Unggah Dokumen Persyaratan
        </h3>
      </div>

      <div className="border border-t-0 border-gray-200 rounded-b-xl p-6 md:p-8 space-y-2">
        {documentRequirements.map((doc) => (
          <div key={doc.name}>
            <FileUploadDropzone
              label={doc.label}
              name={doc.name}
              required={doc.required}
              accept={doc.accept}
              value={uploadedFiles[doc.name] || null}
              onChange={(file) => handleFileChange(doc.name, file)}
            />
            {doc.name !==
              documentRequirements[documentRequirements.length - 1].name && (
              <hr className="my-8 border-gray-200 border-dashed" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
