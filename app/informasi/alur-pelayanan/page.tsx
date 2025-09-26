"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AlurPelayanan() {
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
            Alur Pasien
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Informasi</span> &gt; Alur Pasien
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
        {/* PDF 1 */}
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full h-[700px] shadow-lg rounded-2xl overflow-hidden"
        >
          <iframe
            src="/alur-pasien/ALUR-PASIEN-RAWAT-JALAN-DAN-INAP.pdf"
            width="100%"
            height="100%"
            className="rounded-2xl"
          />
        </motion.div>

        {/* PDF 2 */}
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full h-[700px] shadow-lg rounded-2xl overflow-hidden"
        >
          <iframe
            src="/alur-pasien/ALUR-PASIEN-BESAR.pdf"
            width="100%"
            height="100%"
            className="rounded-2xl"
          />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
