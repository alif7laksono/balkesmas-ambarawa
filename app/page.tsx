import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TentangKami from "./components/TentangKami";
import Testimoni from "./components/Testimoni";
import Footer from "./components/Footer";
import JamPelayanan from "./components/JamPelayanan";
import Faq from "./components/Faq";
import InformasiPublik from "./components/InformasiPublik";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - UPT Dinkes Provinsi Jawa Tengah",
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TentangKami />
        <InformasiPublik />
        <JamPelayanan />
        <Faq />
        <Testimoni />
      </main>
      <Footer />
    </div>
  );
}
