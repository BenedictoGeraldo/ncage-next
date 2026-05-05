import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NCAGE Indonesia | Pelayanan NCAGE Pusat Kodifikasi",
  description: "Platform digital resmi untuk pendaftaran dan pemantauan status kode NCAGE Indonesia secara terintegrasi.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
