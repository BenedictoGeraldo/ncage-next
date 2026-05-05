"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Notification {
  id: string;
  type: "warning" | "success" | "info" | "security";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  date: string;
}

const mockAllNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Masa Berlaku NCAGE Akan Habis",
    description: "Kode NCAGE Anda akan berakhir dalam 30 hari. Segera lakukan perpanjangan melalui menu pendaftaran ulang.",
    timestamp: "2 jam yang lalu",
    date: "05 Mei 2026",
    isRead: false,
  },
  {
    id: "2",
    type: "success",
    title: "Pengajuan Disetujui",
    description: "Selamat! Pengajuan NCAGE nomor NCG_0002042026 telah disetujui oleh tim verifikator Puskod Kemhan.",
    timestamp: "1 hari yang lalu",
    date: "04 Mei 2026",
    isRead: false,
  },
  {
    id: "3",
    type: "info",
    title: "Sertifikat Bisa Diunduh",
    description: "Sertifikat NCAGE Anda sudah tersedia dalam format digital dan dapat diunduh melalui dashboard Pantau Status.",
    timestamp: "3 hari yang lalu",
    date: "02 Mei 2026",
    isRead: true,
  },
  {
    id: "4",
    type: "security",
    title: "Pembaruan Kata Sandi",
    description: "Kata sandi akun Anda telah berhasil diperbarui demi menjaga keamanan data perusahaan Anda.",
    timestamp: "1 minggu yang lalu",
    date: "28 Apr 2026",
    isRead: true,
  },
  {
    id: "5",
    type: "info",
    title: "Update Profil Berhasil",
    description: "Data profil perusahaan Anda telah diperbarui sesuai dengan dokumen NIB terbaru.",
    timestamp: "2 minggu yang lalu",
    date: "21 Apr 2026",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockAllNotifications);

  const filteredNotifs = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  const typeStyles = {
    warning: { icon: "ri-error-warning-fill", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    success: { icon: "ri-checkbox-circle-fill", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    info: { icon: "ri-information-fill", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    security: { icon: "ri-shield-keyhole-fill", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen pt-14 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pl-4 md:pl-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-gray-900">Pusat Notifikasi</h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">Informasi terbaru mengenai pengajuan dan akun NCAGE Anda</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-[15px] border border-gray-200/50">
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-[12px] text-xs font-bold transition-all ${filter === "all" ? "bg-white text-[#86000D] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter("unread")}
              className={`px-6 py-2 rounded-[12px] text-xs font-bold transition-all ${filter === "unread" ? "bg-white text-[#86000D] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Belum Dibaca
            </button>
          </div>
        </div>

        {/* Notifications Container Box */}
        <div className="bg-white rounded-[15px] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden min-h-[400px]">
          <div className="divide-y divide-gray-50">
            {filteredNotifs.length > 0 ? (
              filteredNotifs.map((notif, index) => {
                const style = typeStyles[notif.type];
                return (
                  <motion.div 
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => markAsRead(notif.id)}
                    className={`group relative flex items-start gap-6 p-8 transition-all cursor-pointer hover:bg-gray-50/50 ${notif.isRead ? "" : "bg-[#86000D]/[0.01]"}`}
                  >
                    {/* Status Indicator */}
                    {!notif.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#86000D]"></div>
                    )}

                    {/* Icon */}
                    <div className={`w-14 h-14 shrink-0 rounded-[15px] flex items-center justify-center ${style.bg} ${style.color} border ${style.border} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      <i className={`${style.icon} text-2xl`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className={`text-base font-bold ${notif.isRead ? "text-gray-700" : "text-gray-900"}`}>{notif.title}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wider">{notif.date}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotif(notif.id);
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                      <p className={`text-[14px] leading-relaxed font-medium ${notif.isRead ? "text-gray-400" : "text-gray-600"}`}>
                        {notif.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <i className="ri-time-line text-gray-400 text-xs"></i>
                          <span className="text-[11px] font-bold text-gray-400 uppercase">{notif.timestamp}</span>
                        </span>
                        {!notif.isRead && (
                          <span className="px-2 py-0.5 bg-red-50 text-[9px] font-extrabold text-[#86000D] rounded-full uppercase border border-red-100">Baru</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-32 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <i className="ri-notification-off-line text-4xl text-gray-300"></i>
                </div>
                <div className="space-y-1 px-10">
                  <h4 className="text-lg font-bold text-gray-900">Tidak ada notifikasi</h4>
                  <p className="text-sm text-gray-500 font-medium">Seluruh notifikasi Anda sudah dibersihkan.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
