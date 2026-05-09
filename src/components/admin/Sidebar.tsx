"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/src/utils/supabase/client";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "ri-home-4-fill",
  },
  {
    label: "Data Permohonan NCAGE",
    href: "/admin/data-permohonan",
    icon: "ri-bar-chart-2-line",
  },
  {
    label: "NCAGE Records",
    href: "/admin/ncage-records",
    icon: "ri-file-chart-line",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    setShowLogoutModal(false);
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-100 flex flex-col z-40 shadow-[4px_0_24px_rgba(0,0,0,0.04)]">
      <div className="px-5 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-kemhan.png"
            alt="Logo Kemhan"
            width={52}
            height={52}
            className="object-contain shrink-0"
          />
          <div>
            <p className="font-bold text-[15px] text-[#1a1a1a] leading-tight">
              Pelayanan NCAGE
            </p>
            <p className="text-[12px] text-[#6B7280] mt-0.5">
              Pusat Kodifikasi
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 pt-4 flex flex-col gap-2.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3.5 px-4 py-3.5 rounded-xl
                text-[14px] transition-all duration-200
                ${
                  isActive
                    ? "bg-[#8B1E1E]/10 text-[#8B1E1E] font-semibold"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#374151] font-medium"
                }
              `}
            >
              <i
                className={`
                  ${item.icon} text-[18px] shrink-0 transition-colors
                  ${isActive ? "text-[#8B1E1E]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"}
                `}
              />
              <span className="leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl
            bg-[#8B1E1E]/10 text-[#8B1E1E] font-semibold text-[14px]
            hover:bg-[#8B1E1E]/15 active:scale-[0.98] cursor-pointer
            transition-all duration-200 group
          "
        >
          <i className="ri-logout-box-r-line text-[18px] shrink-0" />
          <span className="flex-1 text-left">Logout</span>

          <div className="w-8 h-8 rounded-full bg-[#8B1E1E] flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white text-[11px] font-bold tracking-wide">
              AD
            </span>
          </div>
        </button>
      </div>

      {/* Beautiful Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 transition-opacity animate-in fade-in duration-300"
            onClick={() => !isLoggingOut && setShowLogoutModal(false)}
          />
          <div className="relative bg-white border border-gray-100/40 rounded-[15px] shadow-xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-300 z-20">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#8B1E1E]">
              <i className="ri-logout-box-r-line text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Apakah Anda ingin keluar?
            </h3>
            <p className="text-[13px] text-gray-500 text-center leading-relaxed mb-6">
              Anda harus memasukkan kembali email dan kata sandi Anda untuk mengakses dashboard admin ini.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 py-3 px-4 rounded-[15px] border border-gray-300 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex-1 py-3 px-4 rounded-[15px] bg-[#8B1E1E] hover:bg-[#721818] text-white text-[13px] font-semibold transition-all duration-200 disabled:opacity-50 shadow-sm shadow-[#8B1E1E]/10"
              >
                {isLoggingOut ? "Keluar..." : "Ya, Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
