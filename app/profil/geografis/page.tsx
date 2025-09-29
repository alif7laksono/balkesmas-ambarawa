import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GeografisClient from "./GeografisClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - Geografis Balkesmas Ambarawa",
};

export default function Geografis() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <GeografisClient />
      <Footer />
    </div>
  );
}
