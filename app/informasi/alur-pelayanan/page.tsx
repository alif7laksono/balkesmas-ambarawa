import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AlurPelayananClient from "./AlurPasienClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Alur Pendaftaran Pasien",
};

export default function AlurPelayanan() {
  return (
    <div className="bg-white">
      <Navbar />
      <AlurPelayananClient />
      <Footer />
    </div>
  );
}
