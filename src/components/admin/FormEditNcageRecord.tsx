"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  ncageRecordSchema,
  type NcageRecordFormValues,
} from "@/src/schema/ncageRecordSchema";
import {
  updateNcageRecord,
  deleteNcageRecord,
} from "@/src/app/admin/(main)/ncage-records/[id]/actions";

interface FormEditNcageRecordProps {
  id: string;
  initialData: any;
}

export function FormEditNcageRecord({
  id,
  initialData,
}: FormEditNcageRecordProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NcageRecordFormValues>({
    resolver: zodResolver(ncageRecordSchema),
    defaultValues: {
      ncage_code: initialData?.ncage_code || "",
      entity_name: initialData?.entity_name || "",
      ncagesd: initialData?.ncagesd || "",
      toec: initialData?.toec || "",
      is_sam_requested: initialData?.is_sam_requested || false,
      street: initialData?.street || "",
      city: initialData?.city || "",
      stt: initialData?.stt || "",
      psc: initialData?.psc || "",
      country: initialData?.country || "",
      ctr: initialData?.ctr || "",
      ste: initialData?.ste || "",
      pob: initialData?.pob || "",
      pcc: initialData?.pcc || "",
      pcs: initialData?.pcs || "",
      tel: initialData?.tel || "",
      fax: initialData?.fax || "",
      ema: initialData?.ema || "",
      www: initialData?.www || "",
      national: initialData?.national || "",
      nac: initialData?.nac || "",
      idn: initialData?.idn || "",
      bar: initialData?.bar || "",
      nai: initialData?.nai || "",
      cpv: initialData?.cpv || "",
      uns: initialData?.uns || "",
      sic: initialData?.sic || "",
      rp1_5: initialData?.rp1_5 || "",
      nmcrl_ref_count: initialData?.nmcrl_ref_count || 0,
      ncage_application_id: initialData?.ncage_application_id || "",
    },
  });

  const isSamRequested = watch("is_sam_requested");

  const onSubmit = async (data: NcageRecordFormValues) => {
    setIsSaving(true);
    const result = await updateNcageRecord(id, data);
    setIsSaving(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data NCAGE Record berhasil disimpan.",
        confirmButtonColor: "#8B1E1E",
      });
      router.push("/admin/ncage-records");
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result.message || "Terjadi kesalahan saat menyimpan data.",
        confirmButtonColor: "#8B1E1E",
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#aa0c0c",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const deleteRes = await deleteNcageRecord(id);
      if (deleteRes.success) {
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Data berhasil dihapus.",
          confirmButtonColor: "#8B1E1E",
        });
        router.push("/admin/ncage-records");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: deleteRes.message || "Terjadi kesalahan.",
          confirmButtonColor: "#8B1E1E",
        });
      }
    }
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/10 focus:border-[#8B1E1E] transition-all";
  const labelClass = "block text-[13px] font-semibold text-gray-700 mb-1.5";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => router.push("/admin/ncage-records")}
            >
              Ncage Records
            </span>{" "}
            &gt; <span className="text-gray-900">Edit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit Ncage Record
          </h1>
        </div>
        <button
          onClick={handleDelete}
          type="button"
          className="bg-red-800 hover:bg-red-900 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm shadow-red-500/20 active:scale-95"
        >
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-[15px] font-bold text-gray-800">
              Informasi Utama & Status
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                Ncage code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("ncage_code")}
                className={inputClass}
              />
              {errors.ncage_code && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.ncage_code.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Entity name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("entity_name")}
                className={inputClass}
              />
              {errors.entity_name && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.entity_name.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelClass}>Status Kode (NCAGESD)</label>
              <input
                type="text"
                {...register("ncagesd")}
                className={inputClass}
              />
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <label className={labelClass}>Tipe Entitas (TOEC)</label>
                <input
                  type="text"
                  {...register("toec")}
                  className={inputClass}
                />
              </div>
              <div className="pt-7 flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={isSamRequested}
                  onClick={() => setValue("is_sam_requested", !isSamRequested)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSamRequested ? "bg-[#8B1E1E]" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSamRequested ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Diminta untuk SAM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-[15px] font-bold text-gray-800">
              Alamat Fisik
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className={labelClass}>Jalan</label>
              <textarea
                {...register("street")}
                rows={2}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Kota</label>
                <input
                  type="text"
                  {...register("city")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Provinsi (STT)</label>
                <input
                  type="text"
                  {...register("stt")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Kode Pos (PSC)</label>
                <input
                  type="text"
                  {...register("psc")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Negara</label>
                <input
                  type="text"
                  {...register("country")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Kode Negara (CTR)</label>
                <input
                  type="text"
                  {...register("ctr")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Kode State (STE)</label>
                <input
                  type="text"
                  {...register("ste")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-[15px] font-bold text-gray-800">
              Alamat Surat
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>PO BOX</label>
              <input type="text" {...register("pob")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kota (Alamat Pos)</label>
              <input type="text" {...register("pcc")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kode Pos (Alamat Pos)</label>
              <input type="text" {...register("pcs")} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-[15px] font-bold text-gray-800">Kontak</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Telepon</label>
              <input type="text" {...register("tel")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Fax</label>
              <input type="text" {...register("fax")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="text" {...register("ema")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input type="text" {...register("www")} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-[15px] font-bold text-gray-800">
              Klasifikasi & Referensi
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>National</label>
              <input
                type="text"
                {...register("national")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>NAC</label>
              <input type="text" {...register("nac")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>IDN</label>
              <input type="text" {...register("idn")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>BAR</label>
              <input type="text" {...register("bar")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>NAI</label>
              <input type="text" {...register("nai")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>CPV</label>
              <input type="text" {...register("cpv")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>UNS</label>
              <input type="text" {...register("uns")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SIC</label>
              <input type="text" {...register("sic")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Digantikan oleh (RP1_5)</label>
              <input
                type="text"
                {...register("rp1_5")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Jml. Ref. NMCRL</label>
              <input
                type="number"
                {...register("nmcrl_ref_count")}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>ID Aplikasi Terkait</label>
              <input
                type="text"
                {...register("ncage_application_id")}
                className={inputClass}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/ncage-records")}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-[14px] hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#8B1E1E] text-white font-semibold text-[14px] hover:bg-[#6e1010] active:scale-95 transition-all shadow-sm shadow-[#8B1E1E]/20 disabled:opacity-70 flex items-center gap-2"
          >
            {isSaving && <i className="ri-loader-4-line animate-spin" />}
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
