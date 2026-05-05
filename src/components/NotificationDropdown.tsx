"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface Notification {
  id: string;
  type: "warning" | "success" | "info" | "security";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  isOpen, 
  onClose, 
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead
}) => {
  const typeStyles = {
    warning: { icon: "ri-error-warning-line", color: "text-amber-500", bg: "bg-amber-50" },
    success: { icon: "ri-checkbox-circle-line", color: "text-emerald-500", bg: "bg-emerald-50" },
    info: { icon: "ri-information-line", color: "text-blue-500", bg: "bg-blue-50" },
    security: { icon: "ri-shield-keyhole-line", color: "text-purple-500", bg: "bg-purple-50" },
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute right-0 mt-3 w-[420px] bg-white rounded-[15px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 z-20 origin-top-right overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div>
                <h3 className="text-base font-bold text-gray-900">Notifikasi</h3>
                <p className="text-[11px] font-medium text-gray-400 mt-1.5">
                  {unreadCount > 0 ? `Ada ${unreadCount} pesan belum dibaca` : "Semua pesan sudah dibaca"}
                </p>
              </div>
              <button 
                onClick={onMarkAllAsRead}
                className="px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm active:scale-95 transition-all flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-[#5D3A3A] border border-transparent hover:border-gray-100"
              >
                <i className="ri-mail-open-line text-xs"></i>
                Tandai Semua Dibaca
              </button>
            </div>

            {/* List */}
            <div className="max-h-[450px] overflow-y-auto px-6 pt-6 pb-2 custom-scrollbar relative bg-white">
              {notifications.length > 0 ? (
                <>
                  {/* Timeline Connector Line */}
                  <div className="absolute left-[47px] top-10 bottom-10 w-0.5 bg-gray-100 z-0"></div>

                  <div className="space-y-8 relative z-10 pb-4">
                    {notifications.map((notif) => {
                      const style = typeStyles[notif.type];
                      return (
                        <div 
                          key={notif.id} 
                          onClick={() => onMarkAsRead(notif.id)}
                          className="flex gap-5 group cursor-pointer relative"
                        >
                          {/* Icon with Circle */}
                          <div className="shrink-0 relative">
                            <div className={`w-11 h-11 rounded-full ${style.bg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative`}>
                              <i className={`${style.icon} ${style.color} text-xl`}></i>
                              {!notif.isRead && (
                                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pt-1 pr-12">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`text-[13px] font-bold ${notif.isRead ? "text-gray-900" : "text-[#86000D]"} truncate transition-colors`}>
                                {notif.title}
                              </p>
                              <span className="text-[10px] font-bold text-gray-400 shrink-0 uppercase ml-2">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className={`text-xs ${notif.isRead ? "text-gray-400" : "text-gray-600"} leading-relaxed font-medium line-clamp-2 transition-colors`}>
                              {notif.description}
                            </p>
                          </div>

                          {/* Actions Bar (Hover) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(notif.id);
                            }}
                            className="absolute right-0 top-0.5 w-8 h-8 rounded-full text-gray-300 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-50 hover:text-red-400"
                            title="Hapus"
                          >
                            <i className="ri-delete-bin-line text-base"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="py-10 text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <i className="ri-notification-off-line text-2xl text-gray-300"></i>
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Tidak ada notifikasi</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <Link 
              href="/notifications" 
              onClick={onClose}
              className="block w-full py-3 text-center bg-gray-50/50 hover:bg-gray-100/80 border-t border-gray-50 transition-colors"
            >
              <span className="text-[11px] font-extrabold text-[#86000D] uppercase tracking-wider">Lihat Semua</span>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
