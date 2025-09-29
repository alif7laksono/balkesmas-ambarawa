"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function JamKunjungPasienClient() {
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
            Jam Kunjung Pasien
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Informasi</span> &gt; Jam Kunjung
            Pasien
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src="/images/informasi/informasi_jam_besuk_rawat_inap.jpg"
            alt="Informasi Jam Kunjung Pasien Rawat Inap"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </>
  );
}
