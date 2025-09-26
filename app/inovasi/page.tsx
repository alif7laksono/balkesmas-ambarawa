"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Clock, Share2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Inovasi() {
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
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-left px-6 sm:px-10 lg:px-20 xl:px-32"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Inovasi
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Inovasi
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">
        {/* Video & Deskripsi */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">
            SIMAS WILYAM <span className="text-[#dc3545]">Terintegrasi</span>
          </h2>

          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/QmUJz55tOzA"
              title="SIMAS WILYAM"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              <strong>SIMAS WILYAM</strong> (Sistem Informasi Manajemen
              Kesehatan Wilayah Ambarawa) merupakan inovasi terbaru dari
              Balkesmas Ambarawa yang dirancang khusus untuk:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Mengoptimalkan pengelolaan rekam medis pasien secara digital
              </li>
              <li>Meningkatkan efisiensi pelayanan kesehatan</li>
              <li>Menjawab tantangan pengelolaan data kesehatan</li>
              <li>Mempercepat proses administrasi pasien</li>
            </ul>
            <p className="mt-4">
              Sistem ini telah terintegrasi secara menyeluruh dengan semua unit
              pelayanan di Balkesmas Ambarawa, memastikan alur data yang lancar
              dan akurat.
            </p>
          </div>
        </motion.div>

        {/* Keunggulan SIMAS WILYAM */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">
            Keunggulan <span className="text-[#dc3545]">SIMAS WILYAM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-xl transition rounded-2xl">
              <CardHeader>
                <Clock className="w-10 h-10 text-[#dc3545]" />
                <CardTitle className="text-xl font-semibold">
                  Efisiensi Waktu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Proses pendaftaran dan pelayanan pasien lebih cepat dengan
                  waktu tunggu minimal.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition rounded-2xl">
              <CardHeader>
                <Database className="w-10 h-10 text-[#dc3545]" />
                <CardTitle className="text-xl font-semibold">
                  Akurasi Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Minimalkan kesalahan input dengan sistem validasi dan
                  pencatatan digital.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition rounded-2xl">
              <CardHeader>
                <Shield className="w-10 h-10 text-[#dc3545]" />
                <CardTitle className="text-xl font-semibold">
                  Keamanan Informasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Data pasien aman dengan enkripsi dan kontrol akses berlapis.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition rounded-2xl">
              <CardHeader>
                <Share2 className="w-10 h-10 text-[#dc3545]" />
                <CardTitle className="text-xl font-semibold">
                  Terintegrasi Penuh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Akses real-time oleh semua unit pelayanan untuk koordinasi
                  lebih baik.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
