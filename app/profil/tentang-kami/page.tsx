import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import TentangKamiClient from "./TentangKamiClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Balai Kesehatan Masyarakat Wilayah Ambarawa - Tentang Kami",
};

export default function Sejarah() {
  return (
    <div className="bg-white">
      <Navbar />
      <TentangKamiClient />
      <Footer />
    </div>
  );
}
