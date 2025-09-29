// app/profil/layanan-unggulan/page.tsx
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LayananUnggulanClient from "./LayananUnggulanClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Balai Kesehatan Masyarakat Wilayah Ambarawa - InovLayanan Unggulan Poli Paru",
};

export default function LayananUnggulanPage() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <LayananUnggulanClient />
      <Footer />
    </div>
  );
}
