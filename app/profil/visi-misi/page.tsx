"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Sejarah() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Banner Section - DO NOT CHANGE */}
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
            Visi Misi
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Visi Misi
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
        {/* Visi Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#dc3545]">
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                Menjadi Institusi Penggerak Kemandirian Masyarakat dalam
                Mewujudkan Kesehatan Paripurna di Wilayah Kerja
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#dc3545]">
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg leading-relaxed">
                <li>Mendorong kemandirian masyarakat untuk hidup sehat</li>
                <li>
                  Memberikan pelayanan kesehatan kepada masyarakat yang bermutu,
                  aman, cepat, akurat, dan terjangkau
                </li>
                <li>
                  Meningkatkan sumber daya manusia yang profesional, akuntabel,
                  berorientasi pada pelanggan, serta berintegritas tinggi
                </li>
                <li>
                  Mengembangkan jejaring kemitraan dan koordinasi dengan
                  institusi terkait
                </li>
                <li>
                  Melaksanakan surveilans dan penelitian di bidang kesehatan
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Maklumat Pelayanan Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#dc3545]">
                Maklumat Pelayanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg mb-4">
                Sebagai salah satu bukti kesungguhan penyelenggaraan layanan
                publik terutama layanan kesehatan kepada masyarakat.
              </p>

              <div className="w-full h-[600px] rounded-lg overflow-hidden shadow">
                <iframe
                  src="/Maklumat-2024-v19.pdf"
                  className="w-full h-full"
                  title="Maklumat Pelayanan 2024"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
