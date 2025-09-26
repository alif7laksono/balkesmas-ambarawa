"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function KritikSaran() {
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
            Kritik dan Saran
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Informasi</span> &gt; Kritik dan
            Saran
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-2xl shadow-lg"
        >
          {/* Optional Image */}
          <div className="mb-8">
            <Image
              src="/images/profil/kontak.jpg"
              alt="Kritik dan Saran"
              width={1200}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Form Kritik dan Saran
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                placeholder="Masukkan Nama"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                No. Telp / Whatsapp
              </label>
              <input
                type="text"
                placeholder="Masukkan No Telp/Whatsapp"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Judul</label>
              <input
                type="text"
                placeholder="Masukkan Judul"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Isi Pesan</label>
              <textarea
                rows={5}
                placeholder="Masukkan Isi Pesan"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white px-6 py-3 rounded-xl"
              >
                Kirim
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
