"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "../action";

const LoginPage = () => {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEE8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#B97A57]/20 rounded-full translate-x-1/3 -translate-y-1/3" />

      <div className="absolute top-6 left-10 flex items-center gap-3">
        <Image
          src="/logo-kemhan.png"
          alt="Logo Kemhan"
          width={55}
          height={55}
          className="object-contain"
        />
        <div>
          <h1 className="font-semibold text-[#000000] text-lg">
            Pelayanan NCAGE
          </h1>
          <p className="text-sm text-[#374151]">Pusat Kodifikasi</p>
        </div>
      </div>

      <div className="bg-[#FFFFFF] w-full max-w-md p-8 rounded-2xl shadow-lg z-10">
        <h2 className="text-center text-[#8B1E1E] font-semibold text-xl mb-6">
          Selamat Datang di Layanan NCAGE
        </h2>

        {state?.error && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {state.error}
          </div>
        )}

        <form action={formAction} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-sm text-[#374151] mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan alamat email"
              className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm text-[#374151] mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              name="password"
              placeholder="Masukkan Kata Sandi"
              className="w-full px-4 text-gray-500 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]"
            />
          </div>

          <div className="text-right mb-4">
            <Link
              href="/forgot-password"
              className="text-sm text-[#8B1E1E] hover:underline"
            >
              Lupa Kata Sandi?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5D3A3A] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-[#000000]">
          Belum memiliki akun?{" "}
          <Link href="/register" className="text-[#8B1E1E] font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
