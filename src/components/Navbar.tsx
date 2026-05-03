"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Beranda", href: "/beranda" },
  { label: "Pendaftaran NCAGE", href: "/pendaftaran-ncage" },
  { label: "Pantau Status", href: "/pantau-status" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <nav
        className={`transition-all duration-500 ease-in-out w-full bg-white/90 backdrop-blur-md flex items-center justify-between px-6 py-5 ${
          scrolled
            ? "max-w-[98%] rounded-2xl border border-gray-200 shadow-lg mt-1"
            : "max-w-full rounded-none border-b border-gray-200 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/logo-kemhan.png"
            alt="Logo Kemhan"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <p className="font-semibold text-sm leading-tight">
              Pelayanan NCAGE
            </p>
            <p className="text-xs">Pusat Kodifikasi</p>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-all px-3 py-2.5 rounded-lg ${
                    isActive
                      ? "bg-[#FDECEC] text-[#8B1E1E]"
                      : "text-[#374151] hover:text-[#8B1E1E]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">
            <i className="ri-notification-3-line text-lg text-[#374151]"></i>
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#8B1E1E] cursor-pointer">
            <Image
              src="/avatar.png"
              alt="avatar"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
