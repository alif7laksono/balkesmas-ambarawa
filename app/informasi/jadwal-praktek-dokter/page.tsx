"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function JadwalPraktekDokter() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Banner Section (don't modify) */}
      <div className="relative h-96 flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/banner/bg-1.jpg"
            alt="Background Balkesmas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-left px-6 sm:px-10 lg:px-20 xl:px-32"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Jadwal Praktek Dokter
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Informasi</span> &gt; Jadwal
            Praktek Dokter
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/informasi/jadwal_praktik_dokter_rawat_jalan.webp"
            alt="Jadwal Praktek Dokter Rawat Jalan"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
