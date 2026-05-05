"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative bg-white rounded-[15px] w-full max-w-lg overflow-hidden shadow-2xl px-10 py-14 text-center"
          >
            {/* Logout Icon */}
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center">
                <i className="ri-logout-box-r-line text-2xl text-red-500"></i>
              </div>
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">Keluar Akun?</h2>
            <p className="text-gray-500 text-sm mb-8 px-4 whitespace-nowrap">
              Apakah Anda yakin ingin keluar dari akun Anda?
            </p>

            {/* Actions */}
            <div className="flex gap-6 mt-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-[15px] transition-all duration-200"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-4 px-4 bg-[#8B1E1E] hover:bg-[#721818] text-white font-bold rounded-[15px] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
              >
                <i className="ri-logout-box-r-line font-normal"></i>
                Keluar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
