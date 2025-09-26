"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Geografis() {
  const images = [
    "/images/profil/gedung1.jpg",
    "/images/profil/gedung2.jpg",
    "/images/profil/gedung3.jpg",
    "/images/profil/gedung4.jpg",
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* Banner Section (unchanged) */}
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
            Geografis
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Geografis
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        {/* Section 1 - Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <p className="text-sm font-semibold text-[#dc3545] uppercase tracking-wide">
                Kondisi Geografis
              </p>
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                Balai Kesehatan Masyarakat Wilayah Ambarawa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-2">
              <p>
                <strong>Alamat:</strong> Jl. Dr. Cipto 112 Kranggan No. 20,
                Ambarawa
              </p>
              <p>
                <strong>Luas tanah:</strong> 5.830 m²
              </p>
              <p>
                <strong>Luas bangunan:</strong> 4.000 m² (direncanakan 5.000 m²)
              </p>
              <p>
                <strong>Status tanah:</strong> Milik Pemerintah Provinsi Jawa
                Tengah
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator />

        {/* Section 2 - Maps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Lokasi Balkesmas Ambarawa
          </h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.app.goo.gl/UmbcyssCYdqpctsX7"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        <Separator />

        {/* Section 3 - Gallery */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">Galeri Gedung</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((src, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative h-64 rounded-xl overflow-hidden shadow-md group"
              >
                <Image
                  src={src}
                  alt={`Gedung Balkesmas ${i + 1}`}
                  fill
                  className="object-cover transform group-hover:scale-110 transition duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
