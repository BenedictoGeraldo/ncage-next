"use client";

import React, { useState, useEffect } from "react";
import Stepper, { StepItem } from "@/src/components/ui/Stepper";

import Step1Upload from "./components/Step1Upload";
import SectionAIdentitas from "./components/step2-sections/SectionAIdentitas";
import SectionBContact from "./components/step2-sections/SectionBContact";
import SectionCBadanUsaha from "./components/step2-sections/SectionCBadanUsaha";
import SectionDInformasiLainnya from "./components/step2-sections/SectionDInformasiLainnya";
import Step3Review from "./components/Step3Review";

const NCAGE_STEPS: StepItem[] = [
  { id: 1, label: "Unggah Berkas", icon: "ri-file-upload-line" },
  { id: 2, label: "Isi Formulir", icon: "ri-draft-line" },
  { id: 3, label: "Konfirmasi Kirim", icon: "ri-send-plane-fill" },
];

export default function NcageRegistrationView() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const getVisualStep = (step: number) => {
    if (step === 1) return 1;
    if (step >= 2 && step <= 5) return 2;
    if (step === 6) return 3;
    return 1;
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden mb-12">
      {/* Lempar visual step ke Stepper */}
      <Stepper currentStep={getVisualStep(currentStep)} steps={NCAGE_STEPS} />

      <div className="p-6 md:p-10 border-t border-gray-100 bg-white">
        {/* Judul Form (Hanya muncul saat berada di rentang Step 2-5) */}
        {currentStep >= 2 && currentStep <= 5 && (
          <div className="text-center mb-10 animate-in fade-in">
            <h2 className="text-xl font-bold text-gray-800">
              Lengkapi Formulir Permintaan
            </h2>
          </div>
        )}

        {/* --- AREA RENDER KOMPONEN --- */}
        <div className={currentStep === 1 ? "block" : "hidden"}>
          <Step1Upload />
        </div>

        <div className={currentStep === 2 ? "block" : "hidden"}>
          <SectionAIdentitas />
        </div>

        <div className={currentStep === 3 ? "block" : "hidden"}>
          <SectionBContact />
        </div>

        <div className={currentStep === 4 ? "block" : "hidden"}>
          <SectionCBadanUsaha />
        </div>

        <div className={currentStep === 5 ? "block" : "hidden"}>
          <SectionDInformasiLainnya />
        </div>

        <div className={currentStep === 6 ? "block" : "hidden"}>
          <Step3Review />
        </div>

        {/* --- TOMBOL NAVIGASI BAWAH --- */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-6">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-6 py-2.5 font-semibold rounded-lg transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))} // Maksimal sampai 6
            className="px-8 py-2.5 bg-[#8a1515] hover:bg-[#6e1010] text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            {/* Ubah text tombol jika di langkah terakhir */}
            {currentStep === 6 ? "Kirim Pendaftaran" : "Lanjutkan"}
          </button>
        </div>
      </div>
    </div>
  );
}
