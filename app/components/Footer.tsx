"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandYoutube,
  IconMapPin,
  IconPhone,
  IconSquareArrowUp,
} from "@tabler/icons-react";

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const mainMenus = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil/tentang-kami" },
    { name: "Layanan", href: "/informasi/jadwal-praktek-dokter" },
    // { name: "Artikel", href: "/artikel" },
    { name: "Kontak", href: "/informasi/kontak" },
  ];

  const visitLinks = [
    { name: "Kemenkes RI", href: "https://kemkes.go.id/id/home" },
    {
      name: "Dinkes Provinsi Jateng",
      href: "https://dinkes.jatengprov.go.id/",
    },
    { name: "BPJS Kesehatan", href: "https://www.bpjs-kesehatan.go.id/#/" },
    {
      name: "Paijo GR",
      href: "https://dinkes.jatengprov.go.id/aplikasi-paijo-gr/",
    },
  ];

  const instagramPosts = [
    { id: 1, image: "/images/profil/gedung1.jpg", url: "#" },
    { id: 2, image: "/images/profil/gedung2.jpg", url: "#" },
    { id: 3, image: "/images/profil/gedung3.jpg", url: "#" },
    { id: 4, image: "/images/profil/gedung4.jpg", url: "#" },
  ];

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          {/* Grid 1: Logo and Description */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <Image
                src="/images/logo.png"
                alt="Balkesmas Ambarawa Logo"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-slate-300 mb-6">
              Menjadi Institusi Penggerak Kemandirian Masyarakat dalam
              Mewujudkan Kesehatan Paripurna di Wilayah Kerja
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/Balkesmas/?_rdc=1&_rdr#"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <IconBrandFacebook size={24} />
              </a>
              <a
                href="https://x.com/balkesmas_amb"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <IconBrandTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/balkesmas_ambarawa/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <IconBrandInstagram size={24} />
              </a>
              <a
                href="https://www.youtube.com/@balkesmaswilayahambarawa"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <IconBrandYoutube size={24} />
              </a>
            </div>
          </motion.div>

          {/* Grid 2: Main Menu */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gray-500">
              Menu
            </h3>
            <ul className="space-y-3">
              {mainMenus.map((menu, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={menu.href}
                    className="text-slate-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2"></span>
                    {menu.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Grid 3: Visit Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gray-500">
              Kunjungi Juga
            </h3>
            <ul className="space-y-3">
              {visitLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Grid 4: Instagram Feed */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gray-500">
              Instagram
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {instagramPosts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={post.image}
                    alt={`Instagram post ${post.id}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full hover:opacity-90 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-slate-700"
          variants={footerVariants}
        >
          <motion.div
            className="flex items-center text-slate-300"
            variants={itemVariants}
          >
            <IconMapPin className="text-gray-500 mr-3 flex-shrink-0" />
            <span>
              Jl. Dr. Cipto No.102, Kepatihan, Kranggan, Kec. Ambarawa,
              Kabupaten Semarang, Jawa Tengah 50613
            </span>
          </motion.div>
          <motion.div
            className="flex items-center text-slate-300"
            variants={itemVariants}
          >
            <IconPhone className="text-gray-500 mr-3 flex-shrink-0" />
            <span>+62 811-2891-084</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="relative">
        <div className="border-t border-slate-700 py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-left text-slate-400 text-sm">
              © {new Date().getFullYear()} Balai Kesehatan Masyarakat Wilayah
              Ambarawa. All rights reserved.
            </div>

            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-300 hover:text-white cursor-pointer"
              aria-label="Back to top"
            >
              <IconSquareArrowUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
