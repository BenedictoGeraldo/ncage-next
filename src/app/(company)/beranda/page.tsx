"use client";

import Image from "next/image";
import { useState } from "react";

export default function BerandaPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const steps = [
    {
      title: "Registrasi Akun",
      icon: "ri-edit-box-line",
      description: "1. Membuat akun perusahaan dengan melengkapi data dasar serta informasi penanggung jawab (PIC)."
    },
    {
      title: "Ajukan Permohonan",
      icon: "ri-send-plane-fill",
      description: "2. Mengisi formulir permohonan NCAGE dengan mengunggah dokumen persyaratan yang diperlukan."
    },
    {
      title: "Pantau Status",
      icon: "ri-eye-fill",
      description: "3. Memantau status proses verifikasi permohonan yang sedang dilakukan oleh tim verifikator."
    },
    {
      title: "Unduh Sertifikat",
      icon: "ri-download-cloud-2-fill",
      description: "4. Mengunduh sertifikat NCAGE resmi setelah permohonan disetujui dan diterbitkan."
    }
  ];

  const faqs = [
    {
      question: "Apa itu kode NCAGE?",
      answer: "Kode NCAGE adalah kode identifikasi unik untuk perusahaan atau instansi yang digunakan dalam sistem pengadaan dan logistik internasional."
    },
    {
      question: "Siapa yang perlu memiliki kode NCAGE?",
      answer: "Perusahaan atau instansi yang ingin berpartisipasi dalam pengadaan barang dan jasa di lingkungan Kementerian Pertahanan dan TNI, atau institusi internasional."
    },
    {
      question: "Bagaimana cara mendaftar kode NCAGE?",
      answer: "Anda dapat mendaftar melalui platform ini dengan membuat akun dan melengkapi formulir serta dokumen persyaratan yang diminta."
    },
    {
      question: "Berapa lama proses pengajuan NCAGE?",
      answer: "Proses pengajuan biasanya memakan waktu beberapa hari kerja tergantung pada kelengkapan dokumen yang Anda unggah."
    },
    {
      question: "Bagaimana cara memantau status pengajuan?",
      answer: "Setelah login, Anda dapat memantau status pengajuan pada menu 'Pantau Status' di dashboard akun perusahaan Anda."
    }
  ];

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F8F5F2, #F3EAEA, #FDECEC)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch min-h-[500px]">
          {/* LEFT */}
          <div className="w-full md:w-[55%] px-8 py-16 md:pl-16 flex flex-col justify-center">
            <h1 className="text-4xl md:text-4xl font-semibold text-black">
              Platform Registrasi
            </h1>

            <h2 className="text-5xl md:text-5xl font-semibold mt-6 text-[#86000D]">
              Kode NCAGE Indonesia
            </h2>

            <p className="text-gray-600 mt-5 max-w-md text-lg leading-relaxed">
              Solusi digital untuk pengajuan kode NCAGE secara cepat, aman, dan terintegrasi dalam satu sistem.
            </p>

            <div>
              <button className="mt-10 bg-[#5D3A3A] text-white px-12 py-3.5 rounded-xl shadow hover:bg-[#4A2D2D] transition text-lg font-medium">
                Mulai Pendaftaran
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 flex items-end justify-end relative mt-8 md:mt-0">
            {/* subtle glow pink */}
            <div className="absolute w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 right-0 bottom-0 z-0"></div>

            <div className="relative z-10 flex">
              <Image
                src="/puskod.png"
                alt="gedung"
                width={500}
                height={600}
                className="w-auto h-[350px] md:h-[550px] object-cover object-bottom"
                priority
              />
              {/* OVERLAY */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(139, 30, 30, 0.4) 100%)"
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* TAHAPAN ALUR SECTION */}
      <section className="pt-10 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          
          {/* TITLE BANNER */}
          <div className="bg-gradient-to-r from-[#FDFBFB] via-[#F8EDEE] to-[#FDFBFB] py-5 px-8 mb-16 flex justify-center items-center">
            <h3 className="text-2xl font-medium text-black tracking-wide">
              Tahapan Alur Penggunaan Kode NCAGE
            </h3>
          </div>

          {/* STEPPER */}
          <div className="relative mb-12">
            {/* Connecting Lines Background */}
            <div className="absolute top-8 left-[12%] right-[12%] h-[3px] bg-gray-200 z-0 hidden md:block"></div>
            
            {/* Connecting Lines Active Fill */}
            <div 
              className="absolute top-8 left-[12%] h-[3px] bg-[#86000D] z-0 hidden md:block transition-all duration-500 ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 76}%` }}
            ></div>

            <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPassed = index <= activeStep;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center cursor-pointer group w-full md:w-1/4"
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Circle Icon */}
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 relative z-10 ${
                        isActive 
                          ? "bg-[#86000D] text-white scale-125 shadow-lg" 
                          : isPassed
                          ? "bg-[#86000D] text-white scale-100"
                          : "bg-[#E5E7EB] text-gray-500 group-hover:bg-gray-300 scale-100"
                      }`}
                    >
                      <i className={step.icon}></i>
                    </div>
                    
                    {/* Step Title */}
                    <p className={`mt-5 text-center transition-colors duration-300 ${
                      isActive ? "text-black font-semibold text-lg" : "text-gray-500 font-medium text-base"
                    }`}>
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DESCRIPTION BOX */}
          <div className="p-8 border border-gray-100 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-white min-h-[120px] flex items-center transition-all duration-300">
            <p className="text-lg text-black font-medium leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-[#F6F6F6] rounded-2xl p-10 md:p-14">
            <h3 className="text-3xl md:text-33xl font-medium text-center text-black mb-10">
              Pertanyaan Umum Seputar NCAGE
            </h3>
            
            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
              {faqs.map((faq, index) => {
                const isFaqActive = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300"
                    onClick={() => setActiveFaq(isFaqActive ? null : index)}
                  >
                    <div className="p-6 md:px-8 flex justify-between items-center">
                      <h4 className={`text-lg font-medium transition-colors duration-300 ${
                        isFaqActive ? "text-gray-500" : "text-black"
                      }`}>{faq.question}</h4>
                      <i className={`transition-transform duration-300 text-2xl ${
                        isFaqActive ? "ri-arrow-down-s-line text-[#86000D] -rotate-180" : "ri-arrow-down-s-line text-gray-400"
                      }`}></i>
                    </div>
                    {/* ACCORDION CONTENT */}
                    <div 
                      className={`px-6 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                        isFaqActive ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-black font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}