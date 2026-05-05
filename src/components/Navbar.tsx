"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/src/utils/supabase/client";
import LogoutModal from "./LogoutModal";
import NotificationDropdown, { Notification } from "./NotificationDropdown";

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Masa Berlaku NCAGE Akan Habis",
    description: "Kode NCAGE Anda akan berakhir dalam 30 hari. Segera lakukan perpanjangan.",
    timestamp: "2 jam yang lalu",
    isRead: false,
  },
  {
    id: "2",
    type: "success",
    title: "Pengajuan Disetujui",
    description: "Selamat! Pengajuan NCAGE nomor NCG_0002042026 telah disetujui.",
    timestamp: "1 hari yang lalu",
    isRead: false,
  },
  {
    id: "3",
    type: "info",
    title: "Sertifikat Bisa Diunduh",
    description: "Sertifikat NCAGE Anda sudah tersedia dan dapat diunduh sekarang.",
    timestamp: "3 hari yang lalu",
    isRead: true,
  },
  {
    id: "4",
    type: "security",
    title: "Pembaruan Kata Sandi",
    description: "Kata sandi akun Anda telah berhasil diperbarui demi keamanan.",
    timestamp: "1 minggu yang lalu",
    isRead: true,
  },
];

const navLinks = [
  { label: "Beranda", href: "/beranda" },
  { label: "Pendaftaran NCAGE", href: "/pendaftaran-ncage" },
  { label: "Pantau Status", href: "/pantau-status" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string; company: string } | null>(null);
  const pathname = usePathname();
  const supabase = createClient();
  const isBeranda = pathname === "/beranda";

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("users")
        .select("name, company_name")
        .eq("id", session.user.id)
        .single();
      
      if (data && !error) {
        setUserData({ name: data.name, company: data.company_name });
      }
    }
  };

  useEffect(() => {
    if (!isBeranda) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBeranda]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session) fetchUserData();
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) fetchUserData();
      else setUserData(null);
    });

    // Listen for profile updates from other components
    window.addEventListener("profileUpdated", fetchUserData);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("profileUpdated", fetchUserData);
    };
  }, [supabase]);

  const getInitials = (name: string) => {
    if (!name) return "??";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    router.push("/login");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center">
      <nav
        className={`w-full flex items-center justify-between px-6 md:px-12 ${
          isBeranda
            ? `transition-all duration-500 ease-in-out bg-white/90 backdrop-blur-md py-5 ${
                scrolled
                  ? "max-w-[98%] rounded-2xl border border-gray-200 shadow-lg mt-1"
                  : "max-w-full rounded-none border-b border-gray-200 shadow-sm"
              }`
            : "bg-white border-b border-gray-200 shadow-sm py-4"
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
          <div className="flex flex-col gap-0.5">
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
                  className={`text-sm transition-all px-4 py-2.5 rounded-xl ${
                    isActive
                      ? "bg-[#FDECEC] text-[#8B1E1E] font-semibold"
                      : "text-[#374151] hover:text-[#8B1E1E] font-medium"
                  }`} >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {!isLoggedIn ? (
          <div className="flex items-center gap-5">
            <Link 
              href="/login" 
              className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-black hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 rounded-full bg-[#5D3A3A] text-sm font-medium text-white hover:bg-[#4A2D2D] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shadow-sm"
            >
              Daftar
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 relative group ${
                  isNotifOpen 
                    ? "bg-[#86000D] text-white shadow-lg shadow-[#86000D]/20" 
                    : "bg-white hover:bg-[#86000D]/5 text-[#86000D]/60 border border-[#86000D]/15 shadow-sm"
                }`}
              >
                <i className={`ri-notification-3-line text-[22px] transition-transform group-hover:rotate-12 ${isNotifOpen ? "text-white" : "text-[#86000D]/60"}`}></i>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#86000D] border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationDropdown 
                isOpen={isNotifOpen} 
                onClose={() => setIsNotifOpen(false)} 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotif}
                onMarkAllAsRead={handleMarkAllRead}
              />
            </div>
            
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-11 h-11 rounded-full overflow-hidden cursor-pointer transition-all duration-300 flex items-center justify-center font-bold text-xs tracking-widest border-2 ${
                    isProfileOpen ? "bg-[#86000D] text-white border-[#86000D] scale-105 shadow-md" : "bg-white text-[#86000D]/80 border-[#86000D]/15 hover:bg-[#86000D]/5 shadow-sm"
                  }`}
                >
                  {userData ? getInitials(userData.name) : "??"}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      {/* Invisible Backdrop */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsProfileOpen(false)}
                      ></motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10, x: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 py-2.5 z-20 origin-top-right overflow-hidden"
                      >
                        <div className="px-5 py-4 border-b border-gray-50 mb-1.5 bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                              <i className="ri-building-2-line text-xl text-[#86000D]"></i>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <p className="text-[13px] font-bold text-gray-900 truncate uppercase tracking-tight">
                                {userData?.name || "Memuat..."}
                              </p>
                              <p className="text-[11px] font-medium text-gray-500 truncate">
                                {userData?.company || "Perusahaan"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-2 space-y-0.5">
                          <Link 
                            href="/profile" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#8B1E1E] hover:bg-[#FDECEC]/50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-[#8B1E1E] transition-all">
                              <i className="ri-user-line text-lg"></i>
                            </div>
                            <span className="font-semibold">Profil Saya</span>
                          </Link>
                          
                          <div className="px-3 py-1">
                            <div className="h-px bg-gray-100 w-full"></div>
                          </div>

                          <button 
                            onClick={() => {
                              setIsProfileOpen(false);
                              setIsLogoutModalOpen(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-red-500 transition-all">
                              <i className="ri-logout-box-line text-lg"></i>
                            </div>
                            <span className="font-semibold text-gray-500 group-hover:text-red-600">Keluar Akun</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
          </div>
        )}
      </nav>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Navbar;
