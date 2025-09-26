import { NavLink } from "./nav";

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Profil",
    href: "/profil",
    subLinks: [
      { name: "Tentang Kami", href: "/profil/tentang-kami" },
      { name: "Sejarah", href: "/profil/sejarah" },
      { name: "Visi Misi", href: "/profil/visi-misi" },
      { name: "Layanan Unggulan", href: "/profil/layanan-unggulan" },
      { name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
      { name: "Dasar Hukum", href: "/profil/dasar-hukum" },
      { name: "Fasilitas dan Peralatan", href: "/profil/fasilitas-peralatan" },
      { name: "Geografis", href: "/profil/geografis" },
    ],
  },
  {
    name: "Pelayanan",
    href: "/pelayanan",
    subLinks: [
      { name: "Perorangan", href: "/pelayanan/perorangan" },
      { name: "Masyarakat", href: "/pelayanan/masyarakat" },
    ],
  },
  // {
  //   name: "Layanan",
  //   href: "/layanan",
  //   subLinks: [
  //     {
  //       name: "Standar Operasional Prosedur",
  //       href: "/layanan/sop",
  //       subLinks: [
  //         { name: "SOP Dinkes", href: "/layanan/sop/dinkes" },
  //         {
  //           name: "SOP Pelayanan Publik",
  //           href: "/layanan/sop/pelayanan-publik",
  //         },
  //       ],
  //     },
  //     { name: "Survey Kepuasan Masyarakat", href: "/layanan/survey-kepuasan" },
  //     { name: "Laporan SKM", href: "/layanan/laporan-skm" },
  //     {
  //       name: "Laporan Layanan Informasi",
  //       href: "/layanan/laporan-informasi",
  //       subLinks: [
  //         {
  //           name: "Layanan Informasi",
  //           href: "/layanan/laporan-informasi/layanan",
  //         },
  //         {
  //           name: "Aduan Masyarakat",
  //           href: "/layanan/laporan-informasi/aduan",
  //         },
  //       ],
  //     },
  //     {
  //       name: "SOP Aduan",
  //       href: "/layanan/sop-aduan",
  //     },
  //     { name: "Alur Aduan", href: "/layanan/alur-aduan" },
  //     { name: "SK Tim Aduan", href: "/layanan/sk-tim-aduan" },
  //     { name: "Call Center", href: "/layanan/call-center" },
  //     { name: "Aplikasi PAIJO GR", href: "/layanan/paijo-gr" },
  //   ],
  // },
  // { name: "PPID", href: "/ppid" },
  // {
  //   name: "Informasi Publik",
  //   href: "/informasi-publik",
  //   subLinks: [
  //     { name: "Hasil Kajian/Penelitian", href: "/informasi-publik/kajian" },
  //     { name: "Satu Sehat", href: "/informasi-publik/satu-sehat" },
  //     { name: "Laporan Kinerja", href: "/informasi-publik/laporan-kinerja" },
  //     {
  //       name: "Permohonan Informasi",
  //       href: "/informasi-publik/permohonan-informasi",
  //     },
  //     {
  //       name: "Anggaran Kegiatan",
  //       href: "/informasi-publik/anggaran-kegiatan",
  //     },
  //     { name: "Pengadaan", href: "/informasi-publik/pengadaan" },
  //     { name: "LPSE", href: "/informasi-publik/lpse" },
  //     { name: "SKDR", href: "/informasi-publik/skdr" },
  //   ],
  // },
  // { name: "Pengaduan", href: "/pengaduan" },
  {
    name: "Standard Pelayanan Publik",
    href: "/pelayanan",
    subLinks: [
      { name: "Standard Palayanan", href: "/pelayanan/publik" },
      { name: "Module", href: "/pelayanan/module" },
    ],
  },
  // { name: "Berita", href: "/berita" },
  {
    name: "Informasi",
    href: "/#",
    subLinks: [
      { name: "Kontak", href: "/informasi/kontak" },
      {
        name: "Jadwal Praktek Dokter",
        href: "/informasi/jadwal-praktek-dokter",
      },
      {
        name: "Informasi Jam Kunjung Pasien",
        href: "/informasi/jam-kunjung-pasien",
      },
      { name: "FAQ", href: "/informasi/faq" },
      { name: "Alur Pelayanan", href: "/informasi/alur-pelayanan" },
    ],
  },
  { name: "Inovasi", href: "/inovasi" },
];

export const services = [
  "Poli Umum",
  "Poli Spesialis Paru",
  "Poli TB / Dots",
  "Poli Anak",
];

export const testimonials = [
  {
    id: 1,
    date: "September, 2024",
    content:
      "Pelayanan oke, terdapat rawat inap, pelayanan laboratorium ramah cepat dan tanggap, Good🫶🏻🫶🏻",
    author: "Sonnia Syanubari",
    source: "Google Review",
    rating: 5,
  },
  {
    id: 2,
    date: "Agustus, 2024",
    content:
      "Pelayanannya cepat dan profesional👏👏. Tempat nyaman, bersih, dan harga terjangkau.",
    author: "Muhammad Ifan",
    source: "",
    rating: 4,
  },
  {
    id: 3,
    date: "Februari, 2024",
    content:
      "Pelayanan staf sangat baik, ramah dan penuh senyum. Terus konsisten menyehatkan warga ambarawa.",
    author: "Rosyad Nurdien",
    source: "Google Review",
    rating: 5,
  },
];

export const faqs = [
  {
    question:
      "Apa layanan kesehatan yang tersedia di Balkesmas Wilayah Ambarawa?",
    answer:
      "Balkesmas Wilayah Ambarawa menyediakan berbagai layanan kesehatan, termasuk layanan spesialis paru, penyakit dalam, spesialis anak, dokter umum, UGD Paru, serta perawatan inap.",
  },
  {
    question:
      "Bagaimana cara mendaftar untuk mendapatkan layanan di Balkesmas Ambarawa?",
    answer:
      "Pendaftaran bisa dilakukan secara langsung di loket pendaftaran Balkesmas Wilayah Ambarawa. Informasi lebih lanjut dapat diperoleh melalui nomor kontak atau layanan pelanggan yang tersedia di situs kami.",
  },
  {
    question: "Apakah Balkesmas Ambarawa menyediakan layanan darurat?",
    answer:
      "Ya, kami menyediakan layanan UGD (Unit Gawat Darurat) Paru yang siap melayani pasien dalam kondisi darurat yang membutuhkan penanganan segera.",
  },
  {
    question: "Apa saja jam operasional Balkesmas Wilayah Ambarawa?",
    answer:
      "Jam operasional layanan kesehatan di Balkesmas Wilayah Ambarawa dapat dilihat di situs kami. Jadwal layanan spesialis dan dokter umum juga sering diperbarui secara berkala.",
  },
  {
    question:
      "Bagaimana cara menghubungi Balkesmas Ambarawa untuk informasi lebih lanjut?",
    answer:
      "Anda dapat menghubungi kami melalui nomor telepon yang tertera di situs web, atau datang langsung ke alamat Balkesmas Wilayah Ambarawa untuk mendapatkan informasi lebih lanjut.",
  },
  {
    question: "Apakah Balkesmas Ambarawa menerima BPJS Kesehatan?",
    answer:
      "Ya, Balkesmas Wilayah Ambarawa bekerja sama dengan BPJS Kesehatan. Pasien dapat menggunakan layanan kami dengan menunjukkan kartu BPJS yang masih aktif.",
  },
  {
    question: "Apakah tersedia layanan rawat inap di Balkesmas Ambarawa?",
    answer:
      "Ya, kami menyediakan fasilitas rawat inap dengan ruangan yang nyaman dan perawatan yang berkualitas oleh tenaga medis profesional.",
  },
  {
    question: "Bagaimana prosedur rujukan ke Balkesmas Ambarawa?",
    answer:
      "Pasien dapat dirujuk ke Balkesmas Ambarawa dengan membawa surat rujukan dari fasilitas kesehatan tingkat pertama. Proses pendaftaran untuk pasien rujukan dapat dilakukan di loket khusus.",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Pelayanan Kesehatan Paru Terpadu",
    image: "/assets/images/blog/blog-image-1.png",
    url: "/berita/pelayanan-kesehatan-paru",
  },
  {
    id: 2,
    title: "Program Pencegahan TB di Wilayah Ambarawa",
    image: "/assets/images/blog/blog-image-2.jpg",
    url: "/berita/program-pencegahan-tb",
  },
  {
    id: 3,
    title: "Layanan Kesehatan Anak Berkualitas",
    image: "/assets/images/blog/blog-image-3.png",
    url: "/berita/layanan-kesehatan-anak",
  },
];
