// app/informasi/jam-kunjung-pasien/page.tsx

import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import JamKunjungPasienClient from "./JamKunjungPasienClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Jadwal Jam Kunjung Pasien",
};

export default function JamKunjungPasien() {
  return (
    <div className="bg-white">
      <Navbar />
      <JamKunjungPasienClient />
      <Footer />
    </div>
  );
}
