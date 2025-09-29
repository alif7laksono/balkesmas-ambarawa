import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import DasarHukumClient from "./DasarHukumClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Dasar Hukum Balkesmas Ambarawa",
};

export default function DasarHukum() {
  return (
    <div className="bg-white">
      <Navbar />
      <DasarHukumClient />
      <Footer />
    </div>
  );
}
