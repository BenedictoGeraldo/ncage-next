"use client";

import { useState, useRef, useEffect } from "react";

interface DownloadCertificateButtonProps {
  signedUrl: string;
  fileName?: string;
}

export function DownloadCertificateButton({
  signedUrl,
  fileName = "sertifikat-ncage.docx",
}: DownloadCertificateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current); }, []);

  async function handleDownload() {
    if (!signedUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch(signedUrl);
      if (!response.ok) {
        throw new Error(`Gagal mengambil file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      cleanupTimerRef.current = setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    } catch (err) {
      console.error("[DownloadCertificate] Error:", err);
      alert("Gagal mengunduh sertifikat. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 text-[13px] font-bold rounded-xl hover:bg-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] shadow-sm shadow-emerald-600/20"
    >
      {isLoading ? (
        <>
          <i className="ri-loader-4-line animate-spin" />
          Mengunduh...
        </>
      ) : (
        <>
          <i className="ri-download-2-line" />
          Unduh Sertifikat (DOCX)
        </>
      )}
    </button>
  );
}
