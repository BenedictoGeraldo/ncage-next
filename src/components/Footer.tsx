import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#5D3A3A] text-white pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Address */}
          <div className="flex flex-col md:pl-4">
            <div className="flex items-center gap-4 mb-3">
              <Image 
                src="/logo-kemhan.png" 
                alt="Logo Kemhan" 
                width={64} 
                height={64} 
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold tracking-wide">Pelayanan NCAGE</h3>
                <p className="text-lg font-medium">Pusat Kodifikasi</p>
              </div>
            </div>
            <p className="text-sm leading-[1.8] opacity-90 max-w-sm mt-6">
              Jl. Pd. Labu Raya, RT.6/RW.6 Pd. Labu, Cilandak, Kota Jakarta Selatan Daerah Khusus Ibukota Jakarta
            </p>
          </div>

          {/* Column 2: Tautan */}
          <div className="flex flex-col md:pl-50">
            <h3 className="text-xl font-semibold mb-6">Tautan</h3>
            <ul className="flex flex-col gap-5">
              <li>
                <Link href="/beranda" className="inline-block text-sm opacity-90 hover:opacity-100 hover:translate-x-1.5 transition-all duration-300 font-medium">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran-ncage" className="inline-block text-sm opacity-90 hover:opacity-100 hover:translate-x-1.5 transition-all duration-300 font-medium">
                  Pendaftaran NCAGE
                </Link>
              </li>
              <li>
                <Link href="/pantau-status" className="inline-block text-sm opacity-90 hover:opacity-100 hover:translate-x-1.5 transition-all duration-300 font-medium">
                  Pantau Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak */}
          <div className="flex flex-col md:justify-self-end md:pl-20">
            <h3 className="text-xl font-semibold mb-5 ml-10">Kontak</h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-6 flex justify-center mt-0.5">
                  <i className="ri-phone-fill text-2xl"></i>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-sm font-medium opacity-90">Call Center Puskod</span>
                  <span className="text-sm font-medium">0812-8882-4545</span>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-6 flex justify-center mt-0.5">
                  <i className="ri-time-fill text-2xl"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium opacity-90">Jam Pelayanan</span>
                  <span className="text-sm font-medium whitespace-nowrap">Senin - Jumat, Jam 08.00 - 15.30 WIB</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT LINE */}
        <div className="border-t border-white/20 pt-8 mt-4 text-center">
          <p className="text-sm font-medium tracking-wide">
            &copy; 2210512016_Sebtina Cinta Anugrahini_Sistem Informasi
          </p>
        </div>
      </div>
    </footer>
  )
}
