"use client";

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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
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

      <nav className="flex-1 px-3 pt-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3.5 px-4 py-3.5 rounded-xl
                font-medium text-[14px] transition-all duration-200
                ${
                  isActive
                    ? "bg-[#FEE2E2] text-[#8B1E1E]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#374151]"
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
            bg-[#FEE2E2] text-[#8B1E1E] font-semibold text-[14px]
            hover:bg-[#FECACA] active:scale-[0.98] cursor-pointer
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
    </aside>
  );
}
