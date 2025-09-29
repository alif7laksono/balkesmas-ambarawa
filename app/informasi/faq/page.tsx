import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FaqClient from "./FaqClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Frequently Asked Questions",
};

export default function JadwalPraktekDokter() {
  return (
    <div className="bg-white">
      <Navbar />
      <FaqClient />
      <Footer />
    </div>
  );
}
