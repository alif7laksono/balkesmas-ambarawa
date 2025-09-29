import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import StrukturOrganisasiClient from "./StrukturOrganisasiClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Balai Kesehatan Masyarakat Wilayah Ambarawa - Struktur Organisasi",
};

export default function StrukturOrganisasi() {
  return (
    <div className="bg-white">
      <Navbar />
      <StrukturOrganisasiClient />
      <Footer />
    </div>
  );
}
