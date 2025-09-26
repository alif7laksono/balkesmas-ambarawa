"use client";
import React from "react";
import Image from "next/image";
import {
  containerVariants,
  itemVariants,
  imageVariants,
} from "../animations/animations";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  IconClock,
  IconCalendar,
  IconEmergencyBed,
  IconStethoscope,
} from "@tabler/icons-react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";

export default function JamPelayanan() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const services = [
    {
      icon: <IconEmergencyBed className="w-6 h-6" />,
      title: "UGD Paru",
      schedule: "24 jam / 7 Hari",
    },
    {
      icon: <IconStethoscope className="w-6 h-6" />,
      title: "Rawat Jalan",
      schedule: "Senin-Sabtu: 07.00 - Selesai",
    },
    {
      icon: <IconCalendar className="w-6 h-6" />,
      title: "Rawat Inap",
      schedule: "Setiap Hari",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left Side - Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              variants={itemVariants}
            >
              Klinik Utama Balkesmas Ambarawa
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Hallo Sobat Mantap! Kami hadir dengan update terbaru jadwal
              layanan di Klinik Utama Balkesmas Wilayah Ambarawa. Dapatkan
              layanan kesehatan terbaik dari spesialis paru, penyakit dalam,
              spesialis anak, dokter umum, UGD Paru, hingga perawatan inap.
              Jangan lewatkan kesempatan untuk menjaga kesehatan Anda!
            </motion.p>

            <motion.div className="space-y-4 pt-4" variants={itemVariants}>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                  variants={itemVariants}
                >
                  <div className="mt-1">{service.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <IconClock className="w-4 h-4" />
                      {service.schedule}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button size={isMobile ? "default" : "lg"}>Selengkapnya</Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="w-full lg:w-1/2 relative aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            <Image
              src="/assets/images/jadwal/jadwal.jpg"
              alt="Jadwal Layanan Balkesmas Ambarawa"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
