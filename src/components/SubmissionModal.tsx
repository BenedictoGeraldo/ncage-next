import React from "react";

interface SubmissionModalProps {
  isOpen: boolean;
  type: "confirm" | "success";
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export default function SubmissionModal({
  isOpen,
  type,
  onClose,
  onConfirm,
  isLoading,
}: SubmissionModalProps) {
  if (!isOpen) return null;

  const isConfirm = type === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[#fcf0f0] rounded-full flex items-center justify-center mb-6">
            <i
              className={`text-5xl text-[#8a1515] ${
                isConfirm ? "ri-send-plane-fill" : "ri-send-plane-fill"
              }`}
            ></i>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#8a1515] mb-4">
            {isConfirm
              ? "Konfirmasi Pengiriman Dokumen"
              : "Sukses! Pengajuan berhasil dikirim ke sistem"}
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-8">
            {isConfirm
              ? "Apakah Anda yakin ingin mengirim form pendaftaran ini?"
              : "Status pengajuan anda dapat dipantau melalui menu Pantau Status."}
          </p>

          <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-[#8a1515] text-[#8a1515] font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-arrow-left-s-line text-lg"></i>
              {isConfirm ? "Kembali" : "Selesai"}
            </button>

            {isConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#8a1515] text-white font-semibold hover:bg-[#6e1010] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Kirim Pengajuan"}
                {!isLoading && (
                  <i className="ri-arrow-right-s-line text-lg"></i>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
