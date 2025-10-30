"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IconChecks } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import {
  containerVariants,
  itemVariants,
  imageVariants,
} from "../animations/animations";
import { services } from "../data/data";

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between min-h-screen py-20">
        {/* Left side */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            variants={itemVariants}
          >
            Selamat Datang di Balai Kesehatan Masyarakat Wilayah Ambarawa
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-2xl"
            variants={itemVariants}
          >
            Menjadi Institusi Penggerak Kemandirian Masyarakat dalam Mewujudkan
            Kesehatan Paripurna di Wilayah Kerja
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <a
              href="https://simaswilyam.dinkesjatengprov.go.id/daftar/#/home"
              className="text-black font-bold hover:text-red-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size={isMobile ? "default" : "lg"}
                className="bg-gray-950 hover:bg-gray-800 text-white cursor-pointer"
              >
                PENDAFTARAN
              </Button>
            </a>

            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="border-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <a
                href="https://balkesambarawa.dinkesjatengprov.go.id/profil/tentang-kami"
                className="text-black font-bold hover:text-red-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                TENTANG KAMI
              </a>
            </Button>
          </motion.div>

          <motion.div className="pt-4" variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconChecks size={20} />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Only show on desktop */}
        {!isMobile && (
          <motion.div
            className="hidden md:block w-1/2 h-full relative"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="relative w-full aspect-square max-w-xl ml-auto">
              <Image
                src="/assets/images/banner/foto-dokter-1.png"
                alt="Foto Dokter Balkesmas Wilayah Ambarawa"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
