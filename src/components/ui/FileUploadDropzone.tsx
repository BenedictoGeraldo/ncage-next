"use client";

import React, { useRef, useState } from "react";

interface FileUploadDropzoneProps {
  label: string;
  name: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
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
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-800 mb-3">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors duration-200
          ${
            isDragging
              ? "border-[#8a1515] bg-red-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }
          ${error ? "border-red-500" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          name={name}
          accept={accept}
          className="hidden"
          onChange={handleFileInput}
        />

        {value ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <i className="ri-file-check-line text-2xl"></i>
            </div>
            <p className="text-sm font-semibold text-gray-800">{value.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(value.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="mt-4 text-xs text-red-600 font-semibold hover:underline"
            >
              Hapus & Ganti File
            </button>
          </div>
        ) : (
          <>
            <div className="text-[#8a1515] mb-3">
              <i className="ri-cloud-upload-line text-5xl"></i>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Drag & drop file di sini atau
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-[#8a1515] hover:bg-[#6e1010] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
            >
              Unggah Berkas
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Format {accept.replace(".", "").toUpperCase()}, Maksimal Size{" "}
              {maxSizeMB} MB
            </p>
          </>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
