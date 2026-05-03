import React from "react";

export default function SectionCBadanUsaha() {
  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#8a1515] focus:ring-1 focus:ring-[#8a1515] outline-none transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-8">
        c. Detail Badan Usaha
      </h3>
      <div className="space-y-6">
        <div>
          <label className={labelClass}>
            Nama Badan Usaha <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama badan usaha"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>
              Provinsi <span className="text-red-500">*</span>
            </label>
            <select className={inputClass}>
              <option value="">Pilih Provinsi</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Kota <span className="text-red-500">*</span>
            </label>
            <select className={inputClass}>
              <option value="">Pilih Kota</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Alamat Kantor <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Masukkan alamat kantor"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Kode Pos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan kode pos"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            PO.Box <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan PO.Box"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            No. Telepon (Kantor) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nomor telepon"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>No. FAX (Kantor)</label>
          <input
            type="text"
            placeholder="Masukkan nomor FAX"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Email (Kantor) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Masukkan alamat email kantor"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Website (Kantor)</label>
          <input
            type="text"
            placeholder="Masukkan website"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Perusahaan Afiliasi</label>
          <input
            type="text"
            placeholder="Masukkan perusahaan afiliasi"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
