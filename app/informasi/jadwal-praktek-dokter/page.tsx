// app/informasi/jadwal-praktek-dokter/page.tsx

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import JadwalPraktekDokterClient from "./JadwalPraktekDokterClient";

import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Jadwal Praktek Dokter Balkesmas Ambarawa",
};

export default function JadwalPraktekDokterPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <JadwalPraktekDokterClient />
      <Footer />
    </div>
  );
}
