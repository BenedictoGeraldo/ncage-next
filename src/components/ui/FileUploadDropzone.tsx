"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadDropzoneProps {
  label: string;
  name: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  downloadUrl?: string;
}

export default function FileUploadDropzone({
  label,
  name,
  required = false,
  accept = ".pdf",
  maxSizeMB = 5,
  value,
  onChange,
  error,
  downloadUrl,
}: FileUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Gagal! Ukuran file maksimal adalah ${maxSizeMB}MB`);
      return;
    }
    onChange(file);
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-3 px-1">
        <label className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900">
          {label} {required && <span className="text-[#86000D]">*</span>}
        </label>
        
        {downloadUrl && (
          <a 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full transition-all hover:bg-blue-100 border border-blue-100 no-underline"
          >
            <i className="ri-download-line"></i>
            Unduh Template
          </a>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden transition-all duration-500 rounded-[15px]
          ${
            value 
              ? "border border-[#E1F2E8]/60 bg-[#F2FAF5]" 
              : isDragging
              ? "border-2 border-dashed border-[#86000D] bg-red-50/50 shadow-inner"
              : error
              ? "border-2 border-dashed border-red-300 bg-red-50/30"
              : "border-2 border-dashed border-slate-200/60 bg-white hover:border-slate-300/60 hover:bg-slate-50/50"
          }
        `}
      >
        <input
          type="file"
          ref={inputRef}
          name={name}
          accept={accept}
          className="hidden"
          onChange={handleFileInput}
        />

        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-red-500 rounded-[15px] flex items-center justify-center border border-[#E1F2E8] shadow-sm">
                  <i className="ri-file-pdf-2-fill text-2xl"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 truncate max-w-[180px] sm:max-w-[280px]">
                    {value.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-gray-500 font-medium">
                      {(value.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <span className="w-1 h-1 bg-emerald-200 rounded-full"></span>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 uppercase">
                      <i className="ri-checkbox-circle-fill"></i>
                      Berhasil diunggah
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white rounded-full transition-all border border-transparent hover:border-red-100 hover:shadow-sm"
                title="Hapus File"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 px-8 flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              {/* Modern Icon with Subtle Background */}
              <div className="relative mb-3">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#86000D]/10 group-hover:scale-110 transition-all duration-500">
                  <i className="ri-upload-cloud-2-line text-3xl text-gray-300 group-hover:text-[#86000D]"></i>
                </div>
                {isDragging && (
                   <motion.div 
                    layoutId="pulse"
                    className="absolute inset-0 bg-[#86000D]/10 rounded-[15px] scale-125"
                    animate={{ scale: [1.25, 1.45, 1.25], opacity: [0.5, 0.1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                   />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-[#86000D]">Klik untuk unggah</span> atau drag & drop
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Format {accept.replace(".", "").toUpperCase()} (Maks. {maxSizeMB}MB)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-2 text-xs font-semibold text-red-500 flex items-center gap-1 px-1"
        >
          <i className="ri-error-warning-line"></i>
          {error}
        </motion.p>
      )}
    </div>
  );
}
