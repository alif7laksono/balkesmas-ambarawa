"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
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
            Dasar Hukum
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Dasar Hukum
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={container}
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-8"
        >
          {/* Intro */}
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Balkesmas Ambarawa — Dasar Hukum & Tugas
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">
              Beridirinya Balai Kesehatan Masyarakat Wilayah Ambarawa mempunyai
              dasar hukum dan tugas yang mengatur organisasi, tata kerja, serta
              cakupan tugas operasional. Di bawah ini adalah peraturan gubernur
              penting yang menjadi landasan.
            </p>
          </motion.div>

          <Separator />

          {/* Cards Grid for Pergub */}
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Pergub 99/2016 */}
            <Card className="rounded-2xl shadow-lg border border-gray-100">
              <CardHeader className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    PERATURAN GUBERNUR NO 99 TAHUN 2016
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Organisasi & Tata Kerja UPT Dinas Kesehatan Prov. Jawa
                    Tengah
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                    <a
                      href="/pergub/Pergub-Jateng-No-99-Tahun-2016.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buka Pergub 99 Tahun 2016"
                    >
                      Buka PDF
                    </a>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Pergub ini mengatur tugas pokok dan fungsi, termasuk
                  penyusunan rencana teknis operasional, koordinasi pelaksanaan
                  teknis, evaluasi & pelaporan, serta pengelolaan ketatausahaan.
                </p>

                {/* inline viewer (collapsible) */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-[#dc3545] font-medium mb-3 list-none">
                    Lihat dokumen di halaman (klik untuk buka/tutup)
                  </summary>

                  <div className="mt-3 rounded-lg overflow-hidden shadow-sm border">
                    <iframe
                      src="/pergub/Pergub-Jateng-No-99-Tahun-2016.pdf"
                      title="Pergub Jateng No 99 Tahun 2016"
                      className="w-full h-[60vh] min-h-[360px]"
                    />
                  </div>

                  {/* small download button for mobile / after viewer */}
                  <div className="mt-3 sm:hidden">
                    <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                      <a
                        href="/pergub/Pergub-Jateng-No-99-Tahun-2016.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download / Buka di tab baru
                      </a>
                    </Button>
                  </div>
                </details>
              </CardContent>
            </Card>

            {/* Pergub 79/2021 */}
            <Card className="rounded-2xl shadow-lg border border-gray-100">
              <CardHeader className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    PERATURAN GUBERNUR NO 79 TAHUN 2021
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Pembaruan Organisasi & Tata Kerja UPT Dinas Kesehatan
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                    <a
                      href="/profil/pergub/pergub_79_th_2021.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buka Pergub 79 Tahun 2021"
                    >
                      Buka PDF
                    </a>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Menetapkan organisasi dan tata kerja UPT Dinas Kesehatan;
                  mengatur tugas & fungsi teknis pelayanan serta penunjang
                  layanan kesehatan.
                </p>

                <details className="group">
                  <summary className="cursor-pointer text-sm text-[#dc3545] font-medium mb-3 list-none">
                    Lihat dokumen di halaman (klik untuk buka/tutup)
                  </summary>

                  <div className="mt-3 rounded-lg overflow-hidden shadow-sm border">
                    <iframe
                      src="/profil/pergub/pergub_79_th_2021.pdf"
                      title="Pergub Jateng No 79 Tahun 2021"
                      className="w-full h-[60vh] min-h-[360px]"
                    />
                  </div>

                  <div className="mt-3 sm:hidden">
                    <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                      <a
                        href="/profil/pergub/pergub_79_th_2021.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download / Buka di tab baru
                      </a>
                    </Button>
                  </div>
                </details>
              </CardContent>
            </Card>

            {/* Pergub 9/2025 */}
            <Card className="rounded-2xl shadow-lg border border-gray-100 col-span-1 lg:col-span-2">
              <CardHeader className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    PERATURAN GUBERNUR NO 9 TAHUN 2025
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Perubahan atas Pergub No.79 Tahun 2021 (Organisasi & Tata
                    Kerja)
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                    <a
                      href="/profil/pergub/pergub-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buka Pergub 9 Tahun 2025"
                    >
                      Buka PDF
                    </a>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Perubahan yang menjelaskan sub koordinator pelayanan &
                  penunjang, tugasnya, serta penyesuaian teknis operasional.
                </p>

                <details className="group">
                  <summary className="cursor-pointer text-sm text-[#dc3545] font-medium mb-3 list-none">
                    Lihat dokumen di halaman (klik untuk buka/tutup)
                  </summary>

                  <div className="mt-3 rounded-lg overflow-hidden shadow-sm border">
                    <iframe
                      src="/profil/pergub/pergub-2025.pdf"
                      title="Pergub Jateng No 9 Tahun 2025"
                      className="w-full h-[70vh] min-h-[420px]"
                    />
                  </div>

                  <div className="mt-3 sm:hidden">
                    <Button asChild className="bg-[#dc3545] hover:bg-red-700">
                      <a
                        href="/profil/pergub/pergub-2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download / Buka di tab baru
                      </a>
                    </Button>
                  </div>
                </details>
              </CardContent>
            </Card>
          </motion.div>

          {/* Helpful note and contact */}
          <motion.div variants={fadeIn} className="mt-4">
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p className="text-gray-700">
                Jika dokumen tidak muncul (tergantung browser atau setting
                file-server), kamu dapat klik tombol{" "}
                <span className="font-medium text-[#dc3545]">Buka PDF</span>{" "}
                untuk membuka file di tab baru atau mendownloadnya.
              </p>

              <div className="mt-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Button asChild className="bg-[#0b74ff] hover:bg-blue-700">
                  <a
                    href="/pergub/Pergub-Jateng-No-99-Tahun-2016.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pergub No.99/2016
                  </a>
                </Button>
                <Button asChild className="bg-[#0b74ff] hover:bg-blue-700">
                  <a
                    href="/pergub/pergub_79_th_2021.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pergub No.79/2021
                  </a>
                </Button>
                <Button asChild className="bg-[#0b74ff] hover:bg-blue-700">
                  <a
                    href="/pergub/pergub-2025.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pergub No.9/2025
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
