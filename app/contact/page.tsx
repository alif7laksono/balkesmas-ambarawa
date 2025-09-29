// app/contact/page.tsx

import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactForm from "./ContactForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Balai Kesehatan Masyarakat Wilayah Ambarawa - Kontak dan Saran",
  description:
    "Hubungi Balkesmas Ambarawa untuk pertanyaan, kritik, dan saran melalui formulir kontak atau informasi yang tersedia.",
};

export default function ContactPage() {
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

        <div className="relative z-10 text-left px-6 sm:px-10 lg:px-20 xl:px-32">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Hubungi Kami
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Informasi</span> &gt; Kontak
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
}
