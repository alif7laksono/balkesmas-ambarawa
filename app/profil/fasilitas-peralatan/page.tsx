import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FasilitasdanPeralatanClient from "./FasilitasdanPeralatanClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Fasilitas dan Peralatan",
};

export default function FasilitasdanPeralatan() {
  return (
    <div className="bg-white">
      <Navbar />
      <FasilitasdanPeralatanClient />
      <Footer />
    </div>
  );
}
