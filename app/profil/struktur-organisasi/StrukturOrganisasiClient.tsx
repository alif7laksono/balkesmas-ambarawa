"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { fadeIn } from "@/app/animations/animations";

export default function StrukturOrganisasiClient() {
  return (
    <>
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 drop-shadow">
            Struktur Organisasi
          </h1>
          <p className="text-base sm:text-lg lg:text-xl drop-shadow">
            <span className="text-[#dc3545] font-semibold">Profil</span> &gt;
            Struktur Organisasi
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="uppercase text-[#dc3545] tracking-wide font-semibold">
            Struktur Organisasi
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            Balai Kesehatan Masyarakat Wilayah Ambarawa
          </h2>
          <Separator className="my-6 mx-auto w-24 bg-[#dc3545]" />
        </motion.div>

        {/* Struktur Organisasi Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/images/profil/struktur-organisasi-update.png"
            alt="Struktur Organisasi Balkesmas Ambarawa"
            width={900}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </>
  );
}
