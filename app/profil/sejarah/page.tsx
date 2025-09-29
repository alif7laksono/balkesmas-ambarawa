import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SejarahClient from "./SejarahClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Sejarah Balkesmas Wilayah Ambarawa",
};

export default function Sejarah() {
  return (
    <div className="bg-white">
      <Navbar />
      <SejarahClient />
      <Footer />
    </div>
  );
}
