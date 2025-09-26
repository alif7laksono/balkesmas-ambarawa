"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const pdfFiles = [
  {
    title: "Pergub Jateng No. 79 Tahun 2021",
    src: "/pdf/pergub_79_th_2021.pdf",
    description: "Peraturan Gubernur Jawa Tengah Nomor 79 Tahun 2021.",
  },
  {
    title: "Pergub Tahun 2025",
    src: "/pdf/pergub-2025.pdf",
    description: "Peraturan Gubernur Jawa Tengah terbaru Tahun 2025.",
  },
  {
    title: "Pergub Jateng No. 99 Tahun 2016",
    src: "/pdf/Pergub-Jateng-No-99-Tahun-2016.pdf",
    description: "Peraturan Gubernur Jawa Tengah Nomor 99 Tahun 2016.",
  },
];

export default function Module() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Banner Section */}
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
            Manual Book
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Manual Book
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Daftar Manual Book / Peraturan
          </h2>
          <Separator className="w-20 mx-auto bg-[#dc3545]" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Berikut adalah kumpulan dokumen peraturan dan manual book yang dapat
            Anda unduh atau lihat secara langsung.
          </p>
        </motion.div>

        {/* PDF Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pdfFiles.map((pdf, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-10 h-10 text-[#dc3545]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {pdf.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 flex-grow">
                {pdf.description}
              </p>
              <div className="mt-6 flex space-x-3">
                <Button
                  asChild
                  variant="default"
                  className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white rounded-xl"
                >
                  <a href={pdf.src} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href={pdf.src} download>
                    Download
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
