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
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity animate-in fade-in duration-300"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Container */}
      <div
        className="relative bg-white border border-gray-100 rounded-[15px] w-full max-w-lg overflow-hidden shadow-xl px-10 py-14 text-center animate-in zoom-in-95 duration-300 z-20"
      >
        <div className="text-center">
          {/* Icon Container */}
          <div className="mx-auto w-20 h-20 mb-6">
            <div className={`w-full h-full rounded-full flex items-center justify-center ${isConfirm ? 'bg-red-50 text-[#8a1515]' : 'bg-emerald-50 text-emerald-600'}`}>
              <i className={`${isConfirm ? 'ri-send-plane-fill' : 'ri-checkbox-circle-fill'} text-4xl`}></i>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
            {isConfirm ? "Kirim Pendaftaran?" : "Berhasil Dikirim!"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {isConfirm 
              ? "Pastikan data sudah benar. Data yang telah dikirim tidak dapat diubah selama proses verifikasi."
              : "Pengajuan berhasil masuk. Pantau statusnya secara berkala melalui dashboard."
            }
          </p>

          <div className="flex flex-col gap-3">
            {isConfirm ? (
              <>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="w-full py-4 px-4 bg-[#8a1515] hover:bg-[#6e1010] text-white font-medium rounded-[15px] transition-colors shadow-lg shadow-red-900/10 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : "Kirim Sekarang"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="w-full py-4 px-4 text-gray-500 font-medium rounded-[15px] hover:bg-gray-50 transition-colors active:scale-95"
                >
                  Cek Kembali
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 px-4 bg-[#8a1515] hover:bg-[#6e1010] text-white font-medium rounded-[15px] transition-colors shadow-lg shadow-red-900/10 active:scale-95"
              >
                Ke Halaman Pantau Status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


