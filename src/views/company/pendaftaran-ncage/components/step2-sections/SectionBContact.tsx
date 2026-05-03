import React from "react";

export default function SectionBContact() {
  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#8a1515] focus:ring-1 focus:ring-[#8a1515] outline-none transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-8">
        b. Contact Person
      </h3>
      <div className="space-y-6">
        <div>
          <label className={labelClass}>
            Nama Pemohon <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama pemohon"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Nomor Identitas (KTP/SIM) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nomor identitas"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Alamat <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Masukkan alamat"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Nomor telepon/ HP (Pemohon) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nomor telepon / HP"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Email (Pemohon) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Masukkan alamat email"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Jabatan</label>
          <input
            type="text"
            placeholder="Masukkan jabatan"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
