import Image from "next/image";
import Link from "next/link";
import { register } from "../action";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEE8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B97A57]/20 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#B97A57]/20 rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="absolute top-6 left-10 flex items-center gap-3">
        <Image src="/logo-kemhan.png" alt="Logo" width={48} height={48} />
        <div>
          <h1 className="font-semibold text-black text-lg">Pelayanan NCAGE</h1>
          <p className="text-sm text-[#374151]">Pusat Kodifikasi</p>
        </div>
      </div>

      <div className="bg-white w-full max-w-5xl p-10 mt-15 rounded-2xl shadow-md z-10">
        <Link
          href="/login"
          className="inline-block mb-4 text-[#374151] text-xl"
        >
          <i className="ri-arrow-left-line"></i>
        </Link>

        <h2 className="text-center text-[#8B1E1E] font-semibold text-2xl">
          Buat Akun Layanan NCAGE
        </h2>
        <p className="text-center text-sm text-[#374151] mb-8">
          Silakan lengkapi data berikut untuk membuat akun.
        </p>

        <form action={register} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm text-[#374151] mb-1"
              >
                Nama Lengkap (PIC)
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Masukkan Nama Narahubung"
                className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#8B1E1E] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-[#374151] mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan alamat email"
                className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#8B1E1E] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm text-[#374151] mb-1"
              >
                Nama Perusahaan
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Masukkan Nama Perusahaan"
                className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#8B1E1E] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-[#374151] mb-1"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan Kata Sandi"
                  className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg pr-10 focus:ring-2 focus:ring-[#8B1E1E] outline-none"
                />
                <i className="ri-eye-off-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"></i>
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm text-[#374151] mb-1"
              >
                Nomor Telepon (WhatsApp)
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Masukkan Nomor Telepon"
                className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#8B1E1E] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-[#374151] mb-1"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Masukkan Ulang Kata Sandi"
                  className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg pr-10 focus:ring-2 focus:ring-[#8B1E1E] outline-none"
                />
                <i className="ri-eye-off-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"></i>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <input
              type="checkbox"
              id="tnc"
              className="w-4 h-4 cursor-pointer"
              required
            />
            <label
              htmlFor="tnc"
              className="text-sm text-[#374151] cursor-pointer"
            >
              Saya menyetujui syarat dan ketentuan serta kebijakan privasi.
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#5D3A3A] hover:bg-[#4a2e2e] text-white py-3.5 rounded-lg font-semibold transition-all active:scale-[0.99]"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-[#374151]">
          Sudah Punya Akun?{" "}
          <Link href="/login" className="text-[#8B1E1E] font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
