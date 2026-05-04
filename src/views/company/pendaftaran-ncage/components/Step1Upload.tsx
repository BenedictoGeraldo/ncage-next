"use client";

import React from "react";
import FileUploadDropzone from "@/src/components/ui/FileUploadDropzone";
import { useFormContext, Controller } from "react-hook-form";
import type { NcageRegistrationFormValues } from "@/src/schema";

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
  },
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
  const {
    control,
    formState: { errors },
  } = useFormContext<NcageRegistrationFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-100 px-6 py-4 rounded-t-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800">
          Unggah Dokumen Persyaratan
        </h3>
      </div>

      <div className="border border-t-0 border-gray-200 rounded-b-xl p-6 md:p-8 space-y-2">
        {documentRequirements.map((doc) => {
          const fieldError =
            errors[doc.name as keyof NcageRegistrationFormValues];

          return (
            <div key={doc.name}>
              <Controller
                name={doc.name as keyof NcageRegistrationFormValues}
                control={control}
                render={({ field }) => (
                  <FileUploadDropzone
                    label={doc.label}
                    name={doc.name}
                    required={doc.required}
                    accept={doc.accept}
                    value={field.value as File | null}
                    onChange={field.onChange}
                    error={fieldError?.message?.toString()}
                  />
                )}
              />

              {fieldError && (
                <p className="text-red-500 text-sm font-semibold mt-2 px-1">
                  {fieldError.message?.toString()}
                </p>
              )}

              {doc.name !==
                documentRequirements[documentRequirements.length - 1].name && (
                <hr className="my-8 border-gray-200 border-dashed" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
