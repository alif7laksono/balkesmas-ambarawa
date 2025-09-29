import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import VisiMisiClient from "./VisiMisiClient";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Balai Kesehatan Masyarakat Wilayah Ambarawa - Visi Misi",
};

export default function VisiMisi() {
  return (
    <div className="bg-white">
      <Navbar />
      <VisiMisiClient />
      <Footer />
    </div>
  );
}
