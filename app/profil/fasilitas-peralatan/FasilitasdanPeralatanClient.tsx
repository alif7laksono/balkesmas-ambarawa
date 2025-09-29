"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fadeIn } from "@/app/animations/animations";

export default function FasilitasdanPeralatanClient() {
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
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-left px-6 sm:px-10 lg:px-20 xl:px-32"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 drop-shadow">
            Fasilitas dan Peralatan
          </h1>
          <p className="text-base sm:text-lg lg:text-xl drop-shadow">
            <span className="text-[#dc3545] font-semibold">Profil</span> &gt;
            Fasilitas dan Peralatan
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">
        {/* Fasilitas Gedung dan SDM */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <Image
            src="/images/profil/gedung5.jpg"
            alt="Gedung Balkesmas"
            width={700}
            height={500}
            className="rounded-xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#dc3545]">
              Sumber Daya Manusia
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Dokter: 8 Orang (Umum 4, Spesialis 4)</li>
              <li>Perawat: 14 Orang (S.Kep 4, D3 10)</li>
              <li>Pranata Laborat: 3 Orang (D4 1, D3 2)</li>
              <li>Radiografer: 3 Orang (D4 1, D3 2)</li>
              <li>Farmasi: 5 Orang (Apoteker 2, Asisten 3)</li>
              <li>Rekam Medis: 3 Orang (Diploma)</li>
              <li>Administrasi & Keuangan: 13 Orang</li>
              <li>
                Poliklinik: Umum, Spesialis Paru, TB/Dots, Anak, Penyakit Dalam
              </li>
            </ul>
          </div>
        </motion.div>

        <Separator className="bg-[#dc3545]" />

        {/* Peralatan */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold text-center">
            Fasilitas & <span className="text-[#dc3545]">Peralatan Medis</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Diagnostik Umum */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Diagnostik Umum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Termometer</li>
                  <li>Tensimeter</li>
                  <li>Stetoskop</li>
                  <li>Senter</li>
                </ul>

                {/* Image alat5.jpg */}
                <div className="mt-4">
                  <Image
                    src="/images/alat/alat5.jpg"
                    alt="Peralatan Diagnostik Umum"
                    width={400}
                    height={250}
                    className="rounded-lg object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Diagnostik Khusus */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Diagnostik Khusus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Spirometer</li>
                  <li>EKG</li>
                  <li>Smoker Test</li>
                  <li>Bronkoskopi</li>
                </ul>

                {/* 3 images: alat1.png - alat3.png */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <Image
                    src="/images/alat/alat1.png"
                    alt="Alat Diagnostik Khusus 1"
                    width={400}
                    height={250}
                    className="rounded-lg object-contain"
                  />
                  <Image
                    src="/images/alat/alat2.png"
                    alt="Alat Diagnostik Khusus 2"
                    width={400}
                    height={250}
                    className="rounded-lg object-contain"
                  />
                  <Image
                    src="/images/alat/alat3.png"
                    alt="Alat Diagnostik Khusus 3"
                    width={400}
                    height={250}
                    className="rounded-lg object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Laboratorium */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Laboratorium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Chemistry Analyzer, Photometer, Haematology Analyzer,
                  Urinalyzer, Mikroskop Trinokuler, Biosafety Cabinet, Rotator,
                  GeneXpert TCM
                </p>
                <Image
                  src="/images/alat/alat4.png"
                  alt="Laboratorium"
                  width={400}
                  height={250}
                  className="rounded-lg mt-4"
                />
              </CardContent>
            </Card>

            {/* Radiologi */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Radiologi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Pesawat sinar-X stasioner 500mA</li>
                  <li>Computed Radiography</li>
                </ul>
                <Image
                  src="/images/alat/alat6.png"
                  alt="Radiologi"
                  width={400}
                  height={250}
                  className="rounded-lg mt-4"
                />
              </CardContent>
            </Card>

            {/* Rehabilitasi Medik */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Rehabilitasi Medik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Infrared</li>
                  <li>Nebulizer</li>
                  <li>SWD</li>
                  <li>Sepeda Statis</li>
                  <li>Massage Chair</li>
                </ul>
                <Image
                  src="/images/alat/alat7.png"
                  alt="Rehabilitasi"
                  width={400}
                  height={250}
                  className="rounded-lg mt-4"
                />
              </CardContent>
            </Card>

            {/* Tindakan & Gawat Darurat */}
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#dc3545]">
                  Peralatan Tindakan & Kegawatdaruratan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Terapi Oksigen, Nebulizer, Pulse Oxymetri, Bedside Monitor,
                  EKG, Spirometer, USG Thorax
                </p>
                <Image
                  src="/images/alat/alat8.png"
                  alt="Kegawatdaruratan"
                  width={400}
                  height={250}
                  className="rounded-lg mt-4"
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
}
