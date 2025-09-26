"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// FAQ data
const faqs = [
  {
    question:
      "Apa layanan kesehatan yang tersedia di Balkesmas Wilayah Ambarawa?",
    answer:
      "Balkesmas Wilayah Ambarawa menyediakan berbagai layanan kesehatan, termasuk layanan spesialis paru, penyakit dalam, spesialis anak, dokter umum, UGD Paru, serta perawatan inap.",
  },
  {
    question:
      "Bagaimana cara mendaftar untuk mendapatkan layanan di Balkesmas Ambarawa?",
    answer:
      "Pendaftaran bisa dilakukan secara langsung di loket pendaftaran Balkesmas Wilayah Ambarawa. Informasi lebih lanjut dapat diperoleh melalui nomor kontak atau layanan pelanggan yang tersedia di situs kami.",
  },
  {
    question: "Apakah Balkesmas Ambarawa menyediakan layanan darurat?",
    answer:
      "Ya, kami menyediakan Unit Gawat Darurat (UGD) Paru yang siap melayani pasien dalam kondisi darurat yang membutuhkan penanganan segera.",
  },
  {
    question: "Apa saja jam operasional Balkesmas Wilayah Ambarawa?",
    answer:
      "Jam operasional layanan kesehatan di Balkesmas Wilayah Ambarawa dapat dilihat di situs kami. Jadwal layanan spesialis dan dokter umum juga sering diperbarui secara berkala.",
  },
  {
    question:
      "Bagaimana cara menghubungi Balkesmas Ambarawa untuk informasi lebih lanjut?",
    answer:
      "Anda dapat menghubungi kami melalui nomor telepon yang tertera di situs web, atau datang langsung ke alamat Balkesmas Wilayah Ambarawa untuk mendapatkan informasi lebih lanjut.",
  },
];

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
            <span className="text-[#dc3545]">Informasi</span> &gt; FAQ
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="uppercase text-[#dc3545] tracking-wide font-semibold">
            Informasi Umum
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            Pertanyaan yang Sering Diajukan
          </h2>
          <Separator className="my-6 mx-auto w-24 bg-[#dc3545]" />
        </motion.div>

        {/* Accordion FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg mb-4"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-[#dc3545] px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
