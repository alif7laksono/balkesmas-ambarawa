"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { fadeIn } from "@/app/animations/animations";

const historyImages = [
  "/images/profil/sejarah4.png",
];

export default function TentangKamiClient() {
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
            Tentang Kami
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Pendahuluan
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* First Section - Image and Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Left Side - Image */}
          <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/profil/gedung1.jpg"
              alt="Gedung Balkesmas Ambarawa"
              fill
              className="object-cover"
            />
            <div
              className="absolute top-4 right-4 bg-[#dc3545] text-white px-4 py-2 rounded-lg shadow-md 
                  text-base sm:text-lg lg:text-xl font-semibold"
            >
              Telah Berdiri Sejak 1968
            </div>
          </div>

          {/* Right Side - Text with 2 images below */}
          <div>
            <motion.span
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="font-bold mb-4"
            >
              Tentang Kami
            </motion.span>

            <motion.h3
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Pendahuluan Balkesmas Ambarawa
            </motion.h3>

            <motion.p
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              Kedudukan Balkesmas dalam Sistem Kesehatan Nasional berada pada
              Subsistem Upaya Kesehatan pada tingkat kedua atau sekunder. Upaya
              kesehatan sekunder adalah upaya kesehatan rujukan lanjutan yang
              terdiri dari pelayanan kesehatan perorangan sekunder dan pelayanan
              kesehatan masyarakat sekunder
            </motion.p>

            {/* Two Images */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 gap-4 mt-6"
            >
              <div className="relative h-48 rounded-md overflow-hidden shadow-md">
                <Image
                  src={historyImages[0]}
                  alt="Sejarah Balkesmas"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Second Section - Full width text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mb-16 space-y-6"
        >
          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Pelayanan kesehatan perorangan sekunder adalah pelayanan kesehatan
            spesialistik yang menerima rujukan dari pelayanan kesehatan
            perorangan primer, yang meliputi rujukan kasus, spesimen, dan ilmu
            pengetahuan serta dapat merujuk kembali ke fasilitas pelayanan
            kesehatan yang merujuk.
          </motion.p>

          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Pelayanan kesehatan masyarakat sekunder menerima rujukan kesehatan
            dari pelayanan kesehatan masyarakat primer dan memberikan fasilitasi
            dalam bentuk sarana, teknologi, dan sumber daya manusia kesehatan
            serta didukung oleh pelayanan kesehatan masyarakat tersier (Perpres
            No 72 Tahun 2012).
          </motion.p>

          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Berdasarkan Peraturan Gubernur Jawa Tengah Nomor 99 Tahun 2016,
            Balkesmas Wilayah Ambarawa merupakan Unit Pelaksana Teknis (UPT)
            Dinas Kesehatan Provinsi Jawa Tengah yang dipimpin oleh Kepala Balai
            yang berkedudukan di bawah dan bertanggung jawab kepada Kepala Dinas
            Kesehatan Provinsi.
          </motion.p>

          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Balkesmas mempunyai tugas pokok melaksanakan sebagian kegiatan
            teknis operasional dan atau kegiatan teknis penunjang tertentu di
            bidang pelayanan kesehatan masyarakat yang mempunyai fungsi sebagai
            berikut:
          </motion.p>

          <ul className="list-disc list-inside text-gray-600 leading-relaxed ml-4">
            <li>
              Penyusunan rencana teknis operasional di bidang pelayanan dan
              penunjang pelayanan
            </li>
            <li>Koordinasi dan pelaksanaan teknis operasional</li>
            <li>Evaluasi dan pelaporan</li>
            <li>Pengelolaan ketatausahaan</li>
            <li>Pelaksanaan tugas lain sesuai arahan Kepala Dinas</li>
          </ul>

          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Sesuai dengan Lampiran II Peraturan Gubernur Jawa Tengah Nomor 99
            tahun 2016, Balkesmas Wilayah Ambarawa mempunyai tujuh
            Kabupaten/Kota wilayah kerja yang meliputi Kota Salatiga, Kabupaten
            Semarang, Kabupaten Temanggung, Kabupaten Wonosobo, Kabupaten
            Banjarnegara, Kabupaten Batang serta Kabupaten Kendal.
          </motion.p>

          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Seiring dengan tugas pokok dan fungsinya, Balkesmas Wilayah Ambarawa
            memiliki tujuan untuk meningkatkan status kesehatan melalui upaya
            kesehatan perorangan dan masyarakat secara menyeluruh dan proaktif.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
