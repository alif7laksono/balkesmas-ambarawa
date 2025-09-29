// app/profil/layanan-unggulan/LayananUnggulanClient.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { fadeIn } from "@/app/animations/animations";

export default function LayananUnggulanClient() {
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Layanan Unggulan
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Layanan Unggulan
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        {/* First Section - Profil Dokter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/dokter/foto_dr_hayu.jpg"
              alt="dr. Hayu Ratna Arya Taufiqi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              dr. Hayu Ratna Arya Taufiqi. Sp.P, M.Kes
            </h2>
            <p className="text-lg text-gray-600">
              Dokter Spesialis Paru di Balkesmas Wilayah Ambarawa
            </p>
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Second Section - Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Pelayanan Bronkoskopi Balkesmas Ambarawa
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Layanan unggulan dengan teknologi terkini untuk diagnosis dan terapi
            masalah paru.
          </p>
        </motion.div>

        {/* Apa Itu Bronkoskopi */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">
              Apa Itu Bronkoskopi?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Prosedur medis untuk melihat langsung saluran pernapasan dan
              paru-paru menggunakan bronkoskop. Prosedur ini membantu dokter
              memeriksa kondisi paru-paru secara detail dan mengambil tindakan
              bila diperlukan.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/profil/ruangan_bronkoskopi.jpg"
              alt="Ruangan Bronkoskopi"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/AU9VjU8FGq8"
            title="Bronkoskopi Balkesmas Ambarawa"
            allowFullScreen
          />
        </motion.div>

        {/* Manfaat Bronkoskopi */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Mengidentifikasi penyebab penyumbatan pada paru-paru atau saluran
              pernapasan.
            </li>
            <li>
              Mendeteksi penyebab infeksi paru-paru yang tidak ditemukan dari
              pemeriksaan lain.
            </li>
            <li>
              Mengetahui asal gejala infeksi paru, seperti sesak napas, batuk,
              dan kadar oksigen rendah.
            </li>
            <li>
              Mengambil sampel jaringan (biopsi) jika ada dugaan kanker
              paru-paru.
            </li>
            <li>Mengkonfirmasi hasil pemeriksaan radiologi yang abnormal.</li>
            <li>Mengeluarkan partikel asing dari saluran pernapasan.</li>
            <li>Mengontrol perdarahan dalam paru-paru atau saluran napas.</li>
          </ul>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/profil/alat_bronkoskopi_1.jpg"
              alt="Alat Bronkoskopi"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">
            Tarif Layanan Bronkoskopi
          </h3>
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Jenis Pelayanan</th>
                <th className="px-4 py-2">Satuan</th>
                <th className="px-4 py-2">Jasa Sarana (Rp.)</th>
                <th className="px-4 py-2">Jasa Pelayanan (Rp.)</th>
                <th className="px-4 py-2">Jumlah (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Bronchoscopi Diagnostic</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">400.000</td>
                <td className="px-4 py-2">700.000</td>
                <td className="px-4 py-2 font-semibold">1.100.000</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Bronchoscopi Terapetic</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">750.000</td>
                <td className="px-4 py-2">1.000.000</td>
                <td className="px-4 py-2 font-semibold">1.750.000</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
}
