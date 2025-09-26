"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const pdfFiles = [
  {
    title: "SOP Pemeliharaan Sarana",
    src: "/pdf/01_SOP_VII_2023-SOP-PEMELIHARAAN-SARANA.pdf",
    description: "Standar Operasional Prosedur mengenai pemeliharaan sarana.",
  },
  {
    title: "SOP Penanganan Keamanan",
    src: "/pdf/02_SOP_VII_2023-SOP-PENANGANAN-KEAMANAN.pdf",
    description: "Standar Operasional Prosedur mengenai penanganan keamanan.",
  },
  {
    title: "SOP Pengelolaan Limbah Padat Infeksius B3",
    src: "/pdf/03_SOP_VII_2023-SOP-PENGELOLAAN-LIMBAH-PADAT-INFEKSIUS-B3.pdf",
    description: "Prosedur pengelolaan limbah padat infeksius B3.",
  },
  {
    title: "SOP Pengelolaan Limbah Padat Non Infeksius",
    src: "/pdf/04_SOP_VII_2023-SOP-PENGELOLAAN-LIMBAH-PADAT-NON-INFEKSIUS_001.pdf",
    description: "Prosedur pengelolaan limbah padat non infeksius.",
  },
  {
    title: "SOP Pengelolaan Limbah Cair",
    src: "/pdf/05_SOP_VIII_2023 SOP PENGELOLAAN LIMBAH CAIR.pdf",
    description: "Prosedur pengelolaan limbah cair.",
  },
  {
    title: "SOP Pemeliharaan APAR",
    src: "/pdf/06_SOP_VIII_2023 SOP PEMELIARAAN ALAT PEMADAM API RINGAN (APAR).pdf",
    description: "Standar pemeliharaan alat pemadam api ringan (APAR).",
  },
  {
    title: "SOP Pemeliharaan Alat Medis",
    src: "/pdf/07_SOP_VII_2023 SOP PEMELIHARAAN ALAT MEDIS.pdf",
    description: "Prosedur pemeliharaan alat medis.",
  },
  {
    title: "SOP Kalibrasi Peralatan Medis",
    src: "/pdf/08_SOP_VII_2023 SOP KALIBRASI PERALATAN MEDIS.pdf",
    description: "Standar kalibrasi untuk peralatan medis.",
  },
  {
    title: "SOP Identifikasi Pasien",
    src: "/pdf/09_SOP_VII_2023 SOP IDENTIFIKASI PASIEN.pdf",
    description: "Prosedur identifikasi pasien.",
  },
  {
    title: "SOP Komunikasi Efektif",
    src: "/pdf/10_SOP_VII_2023 SOP  KOMUNIKASI EFEKTIF.pdf",
    description: "Prosedur komunikasi efektif dalam pelayanan.",
  },
  {
    title: "SOP Pengelolaan HAM",
    src: "/pdf/11_SOP_VII_2023 SOP PENGELOLAAN HAM.pdf",
    description: "Prosedur pengelolaan hak asasi manusia dalam pelayanan.",
  },
  {
    title: "SOP Penandaan Sisi Operasi",
    src: "/pdf/12_SOP_VII_2023 SOP PENANDAAN SISI OPERASI.pdf",
    description: "Prosedur penandaan sisi operasi pasien.",
  },
  {
    title: "SOP Pelaksanaan Surgical Safety Checklist",
    src: "/pdf/13_SOP_VII_2023 SOP PELAKSANAAN SURGICAL SAFETY CHECKLIST.pdf",
    description:
      "Checklist keselamatan bedah sebelum, saat, dan setelah operasi.",
  },
  {
    title: "SOP Kebersihan Tangan",
    src: "/pdf/14_SOP_VII_2023 SOP KEBERSIHAN TANGAN.pdf",
    description: "Standar kebersihan tangan dalam pelayanan kesehatan.",
  },
  {
    title: "SOP Pencegahan Pasien Risiko Jatuh",
    src: "/pdf/15_SOP_VII_2023 SOP PENCEGAHAN PASIEN RISIKO JATUH.pdf",
    description: "Prosedur pencegahan untuk pasien dengan risiko jatuh.",
  },
  {
    title: "SOP Pelaksanaan Program PPI",
    src: "/pdf/16_SOP_VII_2023 SOP PELAKSANAAN PROGRAM PPI.pdf",
    description:
      "Prosedur pelaksanaan program pencegahan dan pengendalian infeksi (PPI).",
  },
  {
    title: "SOP Pemenuhan Hak Pasien Berkebutuhan Khusus",
    src: "/pdf/17_SOP_VIII_2023 SOP PEMENUHAN HAK PASIEN BERKEBUTUHAN KHUSUS (Repaired).pdf",
    description: "Prosedur pemenuhan hak pasien dengan kebutuhan khusus.",
  },
  {
    title: "SOP Penanganan Keluhan/Komplain",
    src: "/pdf/18_SOP_VIII_2023 SOP PENANGANAN KELUHAN KOMPLAIN.pdf",
    description: "Prosedur penanganan keluhan atau komplain dari pasien.",
  },
  {
    title: "SOP Persetujuan Tindakan Kedokteran",
    src: "/pdf/19_SOP_VIII_2023 SOP PERSETUJUAN TINDAKAN KEDOKTERAN.pdf",
    description: "Standar prosedur persetujuan tindakan kedokteran.",
  },
  {
    title: "SOP Pendaftaran Pasien Rawat Jalan",
    src: "/pdf/20_SOP_VIII_2023 SOP PENDAFTARAN PASIEN RAWAT JALAN.pdf",
    description: "Prosedur pendaftaran pasien rawat jalan.",
  },
  {
    title: "SOP Skrining Pasien Rawat Jalan",
    src: "/pdf/21_SOP_VIII_2023 SOP SKRINGING PASIEN RAWAT JALAN.pdf",
    description: "Prosedur skrining pasien rawat jalan.",
  },
  {
    title: "SOP Penanganan Pasien Berisiko Tinggi",
    src: "/pdf/22_SOP_VIII_2023 SOP PENANGANAN PASIEN BERISIKO TINGGI BALKESMAS-1.pdf",
    description: "Prosedur penanganan pasien dengan risiko tinggi.",
  },
  {
    title: "SOP Tindakan Anestesi Lokal",
    src: "/pdf/23_SOP_VIII_2023 SOP TINDAKAN ANESTESI LOKAL.pdf",
    description: "Prosedur pelaksanaan tindakan anestesi lokal.",
  },
  {
    title: "SOP Tindakan Bedah Pungsi Pleura",
    src: "/pdf/24_SOP_VIII_2023 SOP TINDAKAN BEDAH PUNGSI PLEURA.pdf",
    description: "Prosedur pelaksanaan tindakan bedah pungsi pleura.",
  },
  {
    title: "SOP Rujukan Pasien",
    src: "/pdf/25_SOP_VIII_2023 SOP RUJUKAN PASIEN.pdf",
    description: "Prosedur rujukan pasien ke fasilitas lain.",
  },
  {
    title: "SOP Penyimpanan Rekam Medis",
    src: "/pdf/26_SOP_VIII_2023 SOP PENYIMPANAN REKAM MEDIS.pdf",
    description: "Prosedur penyimpanan dokumen rekam medis pasien.",
  },
  {
    title: "SOP Peminjaman Rekam Medis",
    src: "/pdf/27_SOP_VIII_2023 SOP PEMINJAMAN REKAM MEDIS.pdf",
    description: "Prosedur peminjaman dokumen rekam medis.",
  },
  {
    title: "SOP Retensi dan Pemusnahan Rekam Medis",
    src: "/pdf/28_SOP_VIII_2023 SOP RETENSI DAN PEMUSNAHAN RM.pdf",
    description: "Prosedur retensi dan pemusnahan rekam medis sesuai aturan.",
  },
  {
    title: "SOP Pelaporan & Pencatatan Hasil Lab Kritis",
    src: "/pdf/29_SOP_VIII_2023 SOP PELAPORAN, PENCATATAN dan TINDAK LANJUT HASIL LABORATORIUM KRITIS.pdf",
    description:
      "Prosedur pencatatan, pelaporan, dan tindak lanjut hasil laboratorium kritis.",
  },
  {
    title: "SOP Rujukan Spesimen",
    src: "/pdf/30_SOP_VIII_2023 SOP RUJUKAN SPESIMEN.pdf",
    description: "Prosedur rujukan spesimen laboratorium.",
  },
  {
    title: "31_SOP_VIII_2023 SOP PELAYANAN RADIOLOGI",
    description: "Standar operasional pelayanan radiologi.",
    src: "/pdf/31_SOP_VIII_2023 SOP PELAYANAN RADIOLOGI.pdf",
  },
  {
    title: "32_SOP_VIII_2023 SOP PENGELOLAAN PSIKOTROPIKA NARKOTIKA",
    description:
      "Pengelolaan psikotropika dan narkotika di fasilitas kesehatan.",
    src: "/pdf/32_SOP_VIII_2023 SOP PENGELOLAAN PSIKOTROPIKA NARKOTIKA.pdf",
  },
  {
    title: "33_SOP_VIII_2023 SOP PELAPORAN NARKOTIKA DAN PSIKOTROPIKA",
    description: "Prosedur pelaporan narkotika dan psikotropika.",
    src: "/pdf/33_SOP_VIII_2023 SOP PELAPORAN NARKOTIKA DAN PSIKOTROPIKA.pdf",
  },
  {
    title: "34_SOP_VIII_2023 SOP PENGELOLAAN OBAT DAN BMHP",
    description: "Standar pengelolaan obat dan BMHP.",
    src: "/pdf/34_SOP_VIII_2023 SOP PENGELOLAAN OBAT DAN BMHP.pdf",
  },
  {
    title: "35_SOP_VIII_2023 SOP PENGELOLAAN OBAT ED",
    description: "Pengelolaan obat kedaluwarsa (ED).",
    src: "/pdf/35_SOP_VIII_2023 SOP PENGELOLAAN OBAT ED.pdf",
  },
  {
    title: "36_SOP_VIII_2023 SOP IDENTIFIKASI PELAPORAN MEDICATION ERROR",
    description: "Identifikasi dan pelaporan medication error.",
    src: "/pdf/36_SOP_VIII_2023 SOP IDENTIFIKASI PELAPORAN MEDICATION ERROR.pdf",
  },
  {
    title: "37_SOP_VIII_2023 PENGEMBALIAN REKAM MEDIS",
    description: "Prosedur pengembalian rekam medis.",
    src: "/pdf/37_ SOP_VIII_2023 PENGEMBALIAN REKAM MEDIS.pdf",
  },
  {
    title: "38_SOP_VIII_2023 Penulisan dan Pembetulan Rekam Medis",
    description: "Aturan penulisan dan pembetulan rekam medis.",
    src: "/pdf/38_SOP_VIII_2023 Penulisan dan Pembetulan Rekam Medis.pdf",
  },
  {
    title: "39_SOP_VIII_2023 Kerahasiaan Rekam Medis",
    description: "Kerahasiaan dalam pengelolaan rekam medis.",
    src: "/pdf/39_SOP_VIII_2023 Kerahasiaan Rekam Medis.pdf",
  },
  {
    title: "40_SOP_VIII_2023 SOP KODING DIAGNOSA DAN TINDAKAN",
    description: "Standar koding diagnosis dan tindakan.",
    src: "/pdf/40_SOP_VIII_2023 SOP KODING DIAGNOSA DAN TINDAKAN.pdf",
  },
  {
    title: "41_SOP_VIII_2023 SOP PROGRAM PENGELOLAAN SISTEM UTILITAS",
    description: "Program pengelolaan sistem utilitas fasilitas kesehatan.",
    src: "/pdf/41_SOP_VIII_2023 SOP PROGRAM PENGELOLAAN SISTEM UTILITAS.pdf",
  },
  {
    title: "42_SOP_VIII_SOP PENGGUNAAN APAR (ALAT PEMADAM API RINGAN)",
    description: "Prosedur penggunaan alat pemadam api ringan (APAR).",
    src: "/pdf/42_SOP_VIII_SOP PENGGUNAAN APAR (ALAT PEMADAM API RINGAN).pdf",
  },
  {
    title: "43_SOP_VIII_2023 SOP IDENTIFIKASI PENGUNJUNG",
    description: "Prosedur identifikasi pengunjung di area fasilitas.",
    src: "/pdf/43_SOP_VIII_2023 SOP IDENTIFIKASI PENGUNJUNG.pdf",
  },
  {
    title: "44_SOP_VIII_2023 SOP SAFETY BRIEFING",
    description: "Standar pelaksanaan safety briefing.",
    src: "/pdf/44_SOP_VIII_2023 SOP SAFETY BRIEFING.pdf",
  },
  {
    title: "45_SOP_VIII_2023 SOP MONITORING SUHU PENYIMPANAN OBAT",
    description: "Monitoring suhu penyimpanan obat di fasilitas kesehatan.",
    src: "/pdf/45_SOP_VIII_2023 SOP MONITORING SUHU PENYIMPANAN OBAT.pdf",
  },
  {
    title: "46_SOP_VIII_2023 SOP STOK OPNAME",
    description: "Standar pelaksanaan stok opname.",
    src: "/pdf/46_SOP_VIII_2023 SOP STOK OPNAME.pdf",
  },
  {
    title: "47_SOP_VIII_2023 SOP PERESEPAN",
    description: "Prosedur penulisan resep obat oleh tenaga medis.",
    src: "/pdf/47_SOP_VIII_2023 SOP PERESEPAN.pdf",
  },
  {
    title: "48_SOP_VIII_2023 SOP PENGKAJIAN RESEP",
    description: "Prosedur pengkajian resep obat oleh apoteker.",
    src: "/pdf/48_SOP_VIII_2023 SOP PENGKAJIAN RESEP.pdf",
  },
  {
    title: "49_SOP_VIII_2023 SOP PELAYANAN RESEP OBAT",
    description: "Standar pelayanan resep obat di fasilitas kesehatan.",
    src: "/pdf/49_SOP_VIII_2023 SOP PELAYANAN RESEP OBAT.pdf",
  },
  {
    title: "50_SOP_VIII_2023 SOP PELAYANAN INFORMASI OBAT",
    description: "Standar pelayanan informasi obat untuk pasien.",
    src: "/pdf/50_SOP_VIII_2023 SOP PELAYANAN INFORMASI OBAT .pdf",
  },
  {
    title: "51_SOP_VIII_2023 SOP REKONSILIASI OBAT",
    description: "Standar operasional prosedur rekonsiliasi obat pasien.",
    src: "/pdf/51_SOP_VIII_2023 SOP REKONSILIASI OBAT.pdf",
  },
  {
    title: "52_SOP_VIII_2023 SOP PENGELOLAAN OBAT EMERGENSI",
    description: "Prosedur pengelolaan obat emergensi.",
    src: "/pdf/52_SOP_VIII_2023 SOP PENGELOLAAN OBAT EMERGENSI.pdf",
  },
  {
    title: "53_SOP_VIII_2023 SOP MONITORING EFEK SAMPING OBAT",
    description: "Monitoring efek samping obat (ESO) pada pasien.",
    src: "/pdf/53_SOP_VIII_2023 SOP MONITORING EFEK SAMPING OBAT.pdf",
  },
  {
    title: "54_SOP_VIII_2023 IDENTIFIKASI DAN PELAPORAN ME (1)",
    description: "Prosedur identifikasi dan pelaporan medication error.",
    src: "/pdf/54_SOP_VIII_2023 IDENTIFIKASI DAN PELAPORAN ME (1).pdf",
  },
  {
    title: "55_SOP_VIII_2023 TERAPI NEBULIZER (1)",
    description: "Standar terapi nebulizer di fasilitas kesehatan.",
    src: "/pdf/55_SOP_VIII_2023 TERAPI NEBULIZER (1).pdf",
  },
  {
    title: "56_SOP_VIII_2023 PEMBERIAN OKSIGEN (1)",
    description: "Prosedur pemberian oksigen pada pasien.",
    src: "/pdf/56_SOP_VIII_2023 PEMBERIAN OKSIGEN (1).pdf",
  },
  {
    title: "59_SOP_VIII_2023 CODE BLUE",
    description: "Standar penanganan keadaan darurat medis (Code Blue).",
    src: "/pdf/59_ SOP_VIII_2023 CODE BLUE  .pdf",
  },
  {
    title: "60_SOP_VIII_2023 SOP PENGELOLAAN BAHAN BERBAHAYA BERACUN (B3)",
    description: "Prosedur pengelolaan bahan berbahaya beracun (B3).",
    src: "/pdf/60_SOP_VIII_2023 SOP PENGELOLAAN BAHAN BERBAHAYA BERACUN (B3).pdf",
  },
  {
    title: "SOP Penerimaan Kasir",
    description: "Prosedur penerimaan pembayaran dari pasien oleh kasir.",
    src: "/pdf/61_SOP_VIII_2023 penerimaan kasir.pdf",
  },
  {
    title: "SOP Penyetoran Pendapatan Kasir",
    description: "Alur penyetoran pendapatan kasir ke rekening resmi.",
    src: "/pdf/62_SOP_VIII_2023 SOP PENYETORAN PENDAPATAN KASIR.pdf",
  },
  {
    title: "SOP Sterilisasi Alat Kesehatan",
    description: "Prosedur sterilisasi peralatan medis untuk mencegah infeksi.",
    src: "/pdf/63_SOP_IV_2024  STERILISASI ALAT KESEHATAN.pdf",
  },
  {
    title: "SOP Pengelolaan Linen Kotor & Linen Infeksius",
    description:
      "Tata cara penanganan linen kotor dan linen infeksius di fasilitas kesehatan.",
    src: "/pdf/64_SOP_IV_2024 PENGELOLAAN LINEN KOTOR & LINEN INFEKSIUS.pdf",
  },
  {
    title: "SOP Asuhan Gizi Pasien Rawat Inap",
    description: "Panduan pemberian asuhan gizi kepada pasien rawat inap.",
    src: "/pdf/96_SOP_VI_2024 SOP ASUHAN GIZI PASIEN RANAP.pdf",
  },
  {
    title: "SOP Asuhan Gizi Pasien Rawat Jalan",
    description: "Prosedur pelayanan gizi untuk pasien rawat jalan.",
    src: "/pdf/97_SOP_VI_2024 SOP ASUHAN GIZI PASIEN RAWAT JALAN edit.pdf",
  },
  {
    title: "SOP Gizi Pengambilan Alat Makan Pasien",
    description: "Tata cara pengambilan alat makan pasien oleh petugas gizi.",
    src: "/pdf/98_SOP_VI_2024 SOP GIZI  PENGAMBILAN ALAT MAKAN PASIEN.pdf",
  },
  {
    title: "SOP Gizi Distribusi Makanan",
    description: "Alur distribusi makanan pasien sesuai kebutuhan gizi.",
    src: "/pdf/99_SOP_VI_2024 SOP GIZI DISTRIBUSI MAKANAN.pdf",
  },
  {
    title: "SOP Gizi Pemesanan Makan Pasien Rawat Inap",
    description:
      "Prosedur pemesanan makanan untuk pasien rawat inap sesuai kebutuhan gizi.",
    src: "/pdf/100_SOP_VI_2024 SOP GIZI PEMESANAN MAKAN PASIEN RANAP.pdf",
  },
  {
    title: "SOP Konsultasi Gizi Pasien Rawat Inap",
    description: "Panduan pelaksanaan konsultasi gizi untuk pasien rawat inap.",
    src: "/pdf/101_SOP_VI_2024 SOP KONSULTASI GIZI PASIEN RAWAT INAP.pdf",
  },
  {
    title: "SOP Konsultasi Gizi Pasien Rawat Jalan",
    description: "Tata cara pelayanan konsultasi gizi bagi pasien rawat jalan.",
    src: "/pdf/102_SOP_VI_2024 SOP KONSULTASI GIZI PASIEN RAWAT JALAN.pdf",
  },
  {
    title: "SOP Screening Gizi Pasien",
    description:
      "Prosedur screening status gizi pasien untuk mendeteksi risiko gizi.",
    src: "/pdf/103_SOP_VI_2024 SOP SCREENING GIZI PASIEN.pdf",
  },
];

const ITEMS_PER_PAGE = 6;

export default function Module() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPdfFiles = pdfFiles.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPdfFiles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPdfFiles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset ke halaman 1 kalau query berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
            Standard Pelayanan Publik
          </h1>
          <p className="text-base sm:text-lg lg:text-xl">
            <span className="text-[#dc3545]">Home</span> &gt; Standard Pelayanan
            Publik
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Daftar Manual Book / Peraturan
          </h2>
          <Separator className="w-20 mx-auto bg-[#dc3545]" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Berikut adalah kumpulan dokumen peraturan dan manual book yang dapat
            Anda unduh atau lihat secara langsung.
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#dc3545]"
          />
        </div>

        {/* PDF Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((pdf, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-10 h-10 text-[#dc3545]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {pdf.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 flex-grow">
                {pdf.description}
              </p>
              <div className="mt-6 flex space-x-3">
                <Button
                  asChild
                  variant="default"
                  className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white rounded-xl"
                >
                  <a href={pdf.src} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href={pdf.src} download>
                    Download
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
