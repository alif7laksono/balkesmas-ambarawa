// app/berita/[slug]/NewsComponent.tsx

"use client";

import { News } from "@/app/utils/types";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface NewsComponentProps {
  data: News;
}

export default function NewsComponent({ data }: NewsComponentProps) {
  const news = data;

  console.log("Kategori berita:", data.category.name);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Main content section */}
      <main className="flex-1">
        <motion.section
          className="relative py-10 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-600 mb-6 flex flex-wrap items-center space-x-1">
              <Link
                href="/"
                className="hover:text-blue-600 hover:underline transition"
              >
                Informasi
              </Link>
              <span className="text-gray-400">›</span>
              <Link
                href="/berita"
                className="hover:text-blue-600 hover:underline transition"
              >
                Berita
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">
                {news.title}
              </span>
            </div>

            {/* Title & Category */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {news.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
                  {news.category.name}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {news.title}
              </h1>
              <p className="text-sm text-gray-500 mt-3">
                {new Date(news.eventDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {news.imageKey ? (
                <Image
                  src={news.imageKey}
                  alt={news.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <Image
                  src="/uploads/default-news.jpg"
                  alt="Default News Image"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-90"
                  priority
                />
              )}
            </motion.div>

            {/* Article Content */}
            <motion.article
              className="prose prose-lg max-w-none text-gray-800 prose-p:leading-relaxed prose-ul:list-disc prose-li:marker:text-blue-500 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: news.content }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            />

            {/* Share Section */}
            <motion.div
              className="mt-12 border-t pt-6 flex items-center justify-between flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-gray-600 font-medium">
                Bagikan artikel ini:
              </span>
              <div className="flex gap-3">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_BASE_URL + "/berita/" + news.slug
                  )}`}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-2.9h2V9.8c0-2 1.2-3.2 3-3.2.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.6L15 14.9h-2v7A10 10 0 0022 12z" />
                  </svg>
                </Link>

                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_BASE_URL + "/berita/" + news.slug
                  )}`}
                  target="_blank"
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.5 7.4c.01.16.01.33.01.5 0 5.1-3.8 11-10.7 11-2.1 0-4.1-.6-5.8-1.7a7.4 7.4 0 005.5-1.5 3.7 3.7 0 01-3.4-2.5c.5.1 1 .1 1.5-.1a3.7 3.7 0 01-3-3.6v-.1c.5.3 1.1.4 1.7.4a3.7 3.7 0 01-1.1-4.9 10.5 10.5 0 007.6 3.9 3.7 3.7 0 016.3-3.4 7.3 7.3 0 002.3-.9 3.7 3.7 0 01-1.6 2.1 7.4 7.4 0 002.1-.6 7.8 7.8 0 01-1.8 1.8z" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
