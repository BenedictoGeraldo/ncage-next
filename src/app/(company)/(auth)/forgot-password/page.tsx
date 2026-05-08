"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 pb-12 bg-[#F5EEE8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#B97A57]/20 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#B97A57]/10 rounded-full -translate-x-1/4 translate-y-1/4" />

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

      <div className="bg-[#FFFFFF] w-full max-w-[560px] p-10 sm:p-14 rounded-[15px] shadow-xl z-10 border border-gray-100 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-[#8B1E1E] font-medium hover:opacity-70 transition-opacity gap-2"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="text-sm">Kembali ke Login</span>
          </Link>
        </div>

        <h2 className="text-center text-[#8B1E1E] font-semibold text-2xl mb-4 tracking-tight">
          Lupa Kata Sandi?
        </h2>

        {!isSubmitted ? (
          <>
            <p className="text-center text-gray-500 font-medium text-base mb-10 px-4">
              Masukkan alamat email Anda untuk menerima tautan pemulihan kata
              sandi.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Email Terdaftar
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda"
                  className="w-full px-5 py-3 border border-[#E5E7EB] rounded-xl text-[#374151] font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 focus:border-[#8B1E1E] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5D3A3A] text-white py-4 rounded-xl font-bold text-base hover:bg-[#4a2e2e] transition-all active:scale-[0.98] shadow-lg shadow-[#5D3A3A]/10"
              >
                Kirim Tautan Pemulihan
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-check-line text-4xl"></i>
            </div>
            <p className="text-gray-600 font-medium text-lg mb-2">
              Tautan Terkirim!
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Silakan periksa kotak masuk email Anda ({email}) untuk melanjutkan
              pemulihan kata sandi.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[#8B1E1E] font-bold hover:opacity-80 transition-opacity"
            >
              Kirim Ulang Tautan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
