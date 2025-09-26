"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const layanan = [
  {
    title: "Pendaftaran dan Rekam Medis",
    description:
      "Melayani pendaftaran pasien baru dan lama serta pencatatan dan penyimpanan data rekam medis.",
    petugas: "1 orang petugas administrasi",
    pasien: "Pasien Umum dan BPJS",
    jadwal: "Senin–Kamis: 07.00–12.00 WIB, Jumat: 07.00–10.00 WIB",
  },
  {
    title: "Pelayanan Kasir",
    description: "Memberikan pelayanan pembayaran biaya pelayanan.",
    petugas: "1 orang petugas administrasi",
  },
  {
    title: "Klinik Umum Dewasa",
    description:
      "Melayani semua pasien dewasa dengan anamnesa, pemeriksaan fisik, diagnosis, pengobatan, dan rekomendasi pemeriksaan penunjang.",
    petugas: "1 Dokter, 1 Perawat",
  },
  {
    title: "Klinik Umum Anak",
    description:
      "Melayani pasien anak (selain TB) dengan anamnesa, pemeriksaan fisik, diagnosis, pengobatan, dan rekomendasi pemeriksaan penunjang.",
    petugas: "1 Dokter, 1 Perawat",
  },
  {
    title: "Klinik TB/DOTS",
    description:
      "Melayani pasien TB dengan anamnesa, pemeriksaan fisik, penyuluhan, pemberian makanan tambahan, serta pelayanan OAT FDC.",
    petugas: "1 Dokter, 1 Perawat",
  },
  {
    title: "Klinik Spesialis Paru",
    description:
      "Pelayanan spesialistik paru & pernafasan: anamnesa, pemeriksaan fisik, terapi khusus paru, serta rekomendasi pemeriksaan penunjang.",
    petugas: "1 Dokter Spesialis Paru, 2 Perawat",
  },
  {
    title: "Ruang Tindakan & Kegawatan Respirasi",
    description:
      "Pelayanan kegawatan respirasi: pemeriksaan, diagnosis, terapi inhalasi, injeksi, oksigenasi, EKG, Spirometri, Mantoux, USG Thorax, dll.",
    petugas: "1 Dokter, 2 Perawat",
  },
  {
    title: "TCM",
    description:
      "Membantu diagnosis TB dengan pemeriksaan molekuler. Termasuk penerimaan sampel, pengecekan administrasi, pencatatan & pelaporan.",
    petugas:
      "1 Dokter Spesialis Paru, 1 Dokter PJ Lab, 1 Perawat, 3 Analis Kesehatan",
  },
  {
    title: "Klinik VCT (Voluntary Counseling & Test)",
    description:
      "Pelayanan konseling & tes HIV/AIDS, serta perawatan, dukungan, & pengobatan (PDP).",
    petugas: "2 Konselor VCT, 1 Dokter PJ, 3 Analis Kesehatan",
  },
  {
    title: "Klinik Berhenti Merokok (KBM)",
    description:
      "Konsultasi dan konseling bagi pasien yang ingin berhenti merokok.",
    petugas: "2 Konselor KBM",
  },
  {
    title: "Klinik Gizi",
    description:
      "Konsultasi gizi bagi pasien dengan gangguan gizi melalui anamnesa dan konseling.",
    petugas: "2 Konselor Gizi",
  },
  {
    title: "Laboratorium",
    description:
      "Melayani pemeriksaan mikrobiologi, hematologi, kimia klinik, elektrolit, urin, feces, serta TCM.",
    petugas: "3 Analis Kesehatan",
  },
  {
    title: "Radiologi",
    description:
      "Melayani pemeriksaan foto toraks & foto lain atas permintaan dokter.",
    petugas: "2 Radiografer",
  },
  {
    title: "Rehabilitasi Medik",
    description:
      "Layanan rehabilitasi medik: terapi inhalasi, massage chair, infra red, SWD, postural drainage, sepeda stationer.",
    petugas: "2 Perawat",
  },
  {
    title: "Ruang Obat",
    description: "Pelayanan obat/farmasi sesuai dengan resep dokter.",
    petugas: "1 Apoteker, 1 Asisten Apoteker",
  },
];

export default function Perorangan() {
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
            Pelayanan Perorangan
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Pelayanan
            Perorangan
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Upaya Kesehatan Perorangan
          </h2>
          <Separator className="w-20 mx-auto bg-[#dc3545]" />
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Balkesmas Wilayah Ambarawa memberikan pelayanan kesehatan bagi
            masyarakat umum dan peserta BPJS yang merupakan rujukan dari
            Puskesmas, Klinik, maupun dokter keluarga. Pelayanan dilaksanakan
            setiap hari Senin–Jumat kecuali hari libur.
          </p>
        </motion.div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src="/images/profil/pelayanan1.png"
              alt="Pelayanan"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src="/images/profil/profil1-min.jpg"
              alt="Profil"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {layanan.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#dc3545]">
                    {i + 1}. {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  {item.petugas && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Petugas:</span>{" "}
                      {item.petugas}
                    </p>
                  )}
                  {item.pasien && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Jenis Pasien:</span>{" "}
                      {item.pasien}
                    </p>
                  )}
                  {item.jadwal && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Jadwal:</span>{" "}
                      {item.jadwal}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
