export default function SectionAIdentitas() {
  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#8a1515] focus:ring-1 focus:ring-[#8a1515] outline-none transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-8">
        a. Identifikasi Entitas
      </h3>
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Tanggal Pengajuan</label>
          <input type="date" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>
            Jenis Permohonan <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="jenis_permohonan"
                className="accent-[#8a1515]"
              />{" "}
              Perorangan
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="jenis_permohonan"
                className="accent-[#8a1515]"
              />{" "}
              Perusahaan / Kelompok
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Jenis Permohonan NCAGE <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="jenis_ncage"
                className="accent-[#8a1515]"
              />{" "}
              Permohonan Baru
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="jenis_ncage"
                className="accent-[#8a1515]"
              />{" "}
              Perbaharui Data / Update
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Tujuan Penerbitan NCAGE <span className="text-red-500">*</span>
          </label>
          <select className={inputClass}>
            <option value="">Pilih tujuan penerbitan NCAGE</option>
            <option value="export">Keperluan Ekspor</option>
            <option value="tender">Tender Internasional</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            Tipe Entitas <span className="text-red-500">*</span>
          </label>
          <select className={inputClass}>
            <option value="">Pilih tipe entitas</option>
            <option value="pt">PT (Perseroan Terbatas)</option>
            <option value="cv">CV</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            Status Kepemilikan Bangunan <span className="text-red-500">*</span>
          </label>
          <select className={inputClass}>
            <option value="">Pilih status kepemilikan bangunan</option>
            <option value="milik_sendiri">Milik Sendiri</option>
            <option value="sewa">Sewa</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            Terdaftar (AHU.Online) <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="radio" name="ahu" className="accent-[#8a1515]" />{" "}
              Sudah
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="radio" name="ahu" className="accent-[#8a1515]" />{" "}
              Belum
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Koordinat Kantor (GPS Map) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan titik koordinat kantor"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            NIB (Nomor Induk Berusaha) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan NIB"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            NPWP (Nomor Pokok Wajib Pajak){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan NPWP"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Bidang Usaha <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan jenis bidang usaha"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
