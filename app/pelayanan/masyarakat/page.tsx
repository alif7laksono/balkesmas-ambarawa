"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Masyarakat() {
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
            Pelayanan Masyarakat
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            Profil &gt; Pelayanan Masyarakat
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        {/* Intro */}
        <motion.div initial="hidden" animate="show" className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            <strong>Upaya Kesehatan Masyarakat</strong> – Pelayanan Kesehatan
            Masyarakat adalah pelayanan kesehatan kepada masyarakat dengan
            melakukan kegiatan di dalam maupun di luar gedung yang bertujuan
            mendukung program pemerintah dalam penanggulangan penyakit prioritas
            yang ada di wilayah kerja.
          </p>

          <Image
            src="/images/profil/pelayanan4.png"
            alt="Pelayanan Masyarakat"
            width={1000}
            height={600}
            className="rounded-2xl shadow-lg mx-auto"
          />
        </motion.div>

        {/* Jenis Kegiatan */}
        <motion.div initial="hidden" animate="show" className="space-y-8">
          <h2 className="text-2xl font-bold text-[#dc3545]">
            Jenis - Jenis Kegiatan
          </h2>

          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Promosi Kesehatan dan Pemberdayaan Masyarakat</strong>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Penyuluhan Dalam Gedung</strong> – di ruang tunggu
                    pasien, untuk semua pengunjung Balkesmas. Materi: profil
                    Balkesmas, penyakit paru, PTM, GERMAS, gizi, radiologi,
                    laboratorium, dll.
                  </li>
                  <li>
                    <strong>Penyuluhan Luar Gedung</strong> – untuk kelompok
                    potensial, kader kesehatan, organisasi sosial, dll. Materi:
                    profil Balkesmas, GERMAS, masalah kesehatan wilayah kerja.
                  </li>
                  <li>
                    <strong>Promosi Media Elektronik</strong> – melalui koran
                    cetak maupun online/website.
                  </li>
                  <li>
                    <strong>Pembuatan Media Promosi</strong> – leaflet, buku
                    saku, profil, banner, spanduk.
                  </li>
                  <li>
                    <strong>Klub Senam Paru Sehat</strong> – setiap Jumat pukul
                    07.00–08.00 WIB di halaman Balkesmas.
                  </li>
                  <li>
                    <strong>Pertemuan PMO</strong> – keluarga pasien TB,
                    pendamping PMO, pengelola TB puskesmas. Materi: profil
                    Balkesmas, TB & pencegahan, cara berdahak benar, dll.
                  </li>
                  <li>
                    <strong>Pemberdayaan Kader Kesehatan</strong> – workshop,
                    pendataan Survey Mawas Diri, pembekalan kader kesehatan.
                  </li>
                  <li>
                    <strong>Fasilitas Teknis</strong> – wawancara dengan petugas
                    puskesmas & konfirmasi data.
                  </li>
                  <li>
                    <strong>Medical Check Up (MCU)</strong> – masyarakat umum &
                    karyawan perusahaan. Tahapan: koordinasi, pendaftaran,
                    pemeriksaan, rekap hasil.
                  </li>
                  <li>
                    <strong>Penanganan KLB & Bencana</strong> – ikut serta
                    membantu kabupaten/kota terdampak bersama Dinkes Provinsi &
                    Dinkes Kab/Kota.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Pembinaan SBH di Wilayah Kerja</strong> – Saka Bakti
                Husada sebagai wadah pembinaan pramuka di bidang kesehatan:
                Lingkungan Sehat, Keluarga Sehat, Penanggulangan Penyakit, Gizi,
                Obat, serta PHBS.
              </li>
            </ol>
          </div>

          <Image
            src="/images/profil/pelayanan5.png"
            alt="Jenis Kegiatan Pelayanan"
            width={1000}
            height={600}
            className="rounded-2xl shadow-lg mx-auto"
          />
        </motion.div>

        {/* Closing */}
        <motion.div
          initial="hidden"
          animate="show"
          className="text-center space-y-6"
        >
          <p className="text-lg text-gray-700">
            Melalui berbagai kegiatan ini, Balkesmas Wilayah Ambarawa
            berkomitmen mendukung peningkatan derajat kesehatan masyarakat
            secara menyeluruh.
          </p>
          <Image
            src="/images/profil/profil3.jpg"
            alt="Balkesmas Masyarakat"
            width={1000}
            height={600}
            className="rounded-2xl shadow-lg mx-auto"
          />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
