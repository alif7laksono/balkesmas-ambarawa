"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Mock images - replace with your actual images
const historyImages = [
  "/images/profil/history1.jpg",
  "/images/profil/sejarah1.png",
];

const additionalImages = [
  "/images/profil/sejarah2.png",
  "/images/profil/sejarah3.png",
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Sejarah() {
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
            Profil Sejarah
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Sejarah
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
            <motion.h2
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-6"
            >
              Tentang Kami
            </motion.h2>

            <motion.h3
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Sejarah Balkesmas Ambarawa
            </motion.h3>

            <motion.p
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              Balkesmas Wilayah Ambarawa awalnya merupakan barak Pes (1962).
              Melalui surat Kepala Perwakilan DKR Propinsi Djawa Tengah tanggal
              6 Nopember 1968 Nomor : 243/Sekret/68 perihal menempati bangunan,
              oleh Kepala Djawatan Kesehatan Rakjat Propinsi Jawa Tengah
              digunakan sebagai penampungan penderita penyakit paru. Pada
              tanggal 30 September 1972 memohon ijin kepada Komando Konstruksi
              Kologdam VII Diponegoro Zi Bang Seksi 073-10 Ambarawa untuk tetap
              menempati tanah yang ditempati untuk kantor Urusan Kesehatan dalam
              Bidang BP4 (Balai Pencegahan dan Pengobatan Penyakit Paru) beserta
              seluruh tanah halaman sekitarnya.
            </motion.p>

            {/* Two Images */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 gap-4 mt-6"
            >
              <div className="relative h-48 rounded-md overflow-hidden shadow-md">
                <Image
                  src={historyImages[1]}
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
          className="mb-16"
        >
          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Berdasarkan Keputusan Menteri Kesehatan Republik Indonesia Nomor :
            909/MENKES.SK/VIII/2001 terjadi pengalihan Unit Pelaksana Teknis BP4
            menjadi Perangkat Daerah, dilaksanakan dengan memperhatikan tugas,
            fungsi, serta kewenangan masing-masing, sehingga BP4 tidak dapat
            dialih fungsikan dan dikembangkan diluar pelayanan pengobatan
            penyakit paru.
          </motion.p>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-gray-600 leading-relaxed mt-4"
          >
            Surat Bupati Semarang tanggal 17 Maret 2004 Nomor : 445/00980
            mengusulkan penyerahan kembali urusan bidang pelayanan pengobatan
            penyakit paru yang berlokasi di Kecamatan Ambarawa kepada Pemerintah
            Provinsi Jawa Tengah dengan alasan antara lain :
          </motion.p>

          <motion.ul
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="list-disc pl-6 text-gray-600 mt-4 space-y-2"
          >
            <li>
              Biaya operasional BP4 Ambarawa cukup tinggi dan cenderung
              meningkat setiap tahunnya.
            </li>
            <li>
              Pelayanan kesehatan yang diberikan BP4 Ambarawa meliputi Kabupaten
              Semarang dan kabupaten/kota diluar Kabupaten Semarang (lintas
              Kab/Kota)
            </li>
          </motion.ul>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="text-gray-600 leading-relaxed mt-4"
          >
            Usulan Bupati Semarang tersebut mendapat rekomendasi dari DPRD
            Kabupaten Semarang dengan Keputusan DPRD Nomor 12 Tahun 2003 tanggal
            23 Agustus 2003. Berdasarkan Berita Acara Nomor : 440/12424/2006
            tentang Serah terima BP4 Kabupaten Semarang beserta Personil,
            Peralatan, Pembiayaan, serta Dokumen (P3D) dari Pemerintah Kabupaten
            Semarang kepada Pemerintah Provinsi Jawa Tengah, serah terima ini
            tidak disertai dengan penyerahan/pelimpahan tanahnya.
          </motion.p>
        </motion.div>

        {/* Two Images Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
        >
          {additionalImages.map((img, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="relative h-48 sm:h-60 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={img}
                alt={`Dokumentasi Balkesmas ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-8" />

        {/* Final Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mt-8"
        >
          <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed">
            Pengintegrasian BP4 Kabupaten Semarang kedalam Perangkat Daerah
            Pemerintah Provinsi Jawa Tengah berdasarkan pada Peraturan Gubernur
            Jawa Tengah Nomor 96 Tahun 2006 tanggal 11 Nopember 2006, sehingga
            sejak tahun 2007 pembiayaan kegiatan-kegiatan dan program BP4
            Ambarawa berasal dari APBD Provinsi Jawa Tengah. Berdasarkan
            Peraturan Gubernur No.42 Tahun 2008 tanggal 20 Juni 2008, BP4
            Ambarawa berubah menjadi Balai Kesehatan Paru Masyarakat (BKPM)
            Wilayah Ambarawa.
          </motion.p>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-gray-600 leading-relaxed mt-4"
          >
            Melalui APBD Provinsi Jawa Tengah Tahun 2012, BKPM Wilayah Ambarawa
            membeli sebidang tanah seluas 5.830m² di Kelurahan Kranggan
            Kecamatan Ambarawa. Tanah tersebut menjadi aset Pemerintah Provinsi
            Jawa Tengah. Tahun 2013 telah disusun rencana pengembangan
            pembangunan gedung BKPM (masterplan). Pembangunan dilaksanakan
            secara bertahap. Tahun 2013 dilaksanakan pembangunan tahap I, berupa
            satu unit bangunan gedung untuk kegiatan pelayanan dan manajemen.
            Tanggal 24 Februari 2014 BKPM Wilayah Ambarawa mulai menempati
            gedung baru di Jl. Dr. Cipto No 112 Ambarawa.
          </motion.p>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-gray-600 leading-relaxed mt-4"
          >
            Tahun 2014 dilaksanakan pembangunan tahap II berupa gedung pelayanan
            apotek, IGD, laboratorium dan radiologi, serta gedung klinik
            spesialis. Gedung tersebut mulai digunakan awal tahun 2015.
          </motion.p>

          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="text-gray-600 leading-relaxed mt-4"
          >
            Peraturan Gubernur Jawa Tengah nomor 99 Tahun 2016 Tentang
            Organisasi dan Tata Kerja Unit Pelaksana Teknis Dinas Kesehatan
            Provinsi Jawa Tengah BAB II Pasal 2 Tentang Perubahan Bentuk BKPM
            Menjadi Balai Kesehatan Masyarakat (Balkesmas).
          </motion.p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
