// app/inovasi/InovasiContent.tsx

"use client";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Clock, Share2 } from "lucide-react";

export default function InovasiContent() {
  return (
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

        <div className="w-full h-60 sm:h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
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
            <strong>SIMAS WILYAM</strong> (Sistem Informasi Manajemen Kesehatan
            Wilayah Ambarawa) merupakan inovasi terbaru dari Balkesmas Ambarawa
            yang dirancang khusus untuk:
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

      {/* Keunggulan */}
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
                Proses pendaftaran dan pelayanan pasien lebih cepat dengan waktu
                tunggu minimal.
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
                Minimalkan kesalahan input dengan sistem validasi dan pencatatan
                digital.
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
                Akses real-time oleh semua unit pelayanan untuk koordinasi lebih
                baik.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
