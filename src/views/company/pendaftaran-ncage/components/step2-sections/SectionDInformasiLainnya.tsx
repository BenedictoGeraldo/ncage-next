import React from "react";

export default function SectionDInformasiLainnya() {
  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#8a1515] focus:ring-1 focus:ring-[#8a1515] outline-none transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-8">
        d. Informasi Lainnya
      </h3>

      <div className="space-y-6 mb-10">
        <div>
          <label className={labelClass}>Produk Yang Dihasilkan</label>
          <input
            type="text"
            placeholder="Masukkan produk yang dihasilkan"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Kemampuan Produksi</label>
          <input
            type="text"
            placeholder="Masukkan kemampuan produksi"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Jumlah Karyawan</label>
          <input
            type="text"
            placeholder="Masukkan jumlah karyawan"
            className={inputClass}
          />
        </div>
      </div>

      <h4 className="font-bold text-gray-800 text-center mb-6">
        Kantor Cabang
      </h4>
      <div className="space-y-6 mb-10">
        <div>
          <label className={labelClass}>Kantor Cabang</label>
          <input
            type="text"
            placeholder="Masukkan kantor cabang"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Nama Jalan</label>
            <input
              type="text"
              placeholder="Masukkan nama jalan"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Kota</label>
            <input
              type="text"
              placeholder="Masukkan kota"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Kode Pos</label>
          <input
            type="text"
            placeholder="Masukkan kode pos"
            className={inputClass}
          />
        </div>
      </div>

      <h4 className="font-bold text-gray-800 text-center mb-6">
        Perusahaan Afiliasi
      </h4>
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Perusahaan Afiliasi</label>
          <input
            type="text"
            placeholder="Masukkan perusahaan afiliasi"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Nama Jalan</label>
            <input
              type="text"
              placeholder="Masukkan nama jalan"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Kota</label>
            <input
              type="text"
              placeholder="Masukkan kota"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Kode Pos</label>
          <input
            type="text"
            placeholder="Masukkan kode pos"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
