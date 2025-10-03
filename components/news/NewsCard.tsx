// component/NewsCard.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function NewsCard({
  _id,
  title,
  content,
  imageUrl,
  createdAt,
}: NewsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200"
    >
      {/* Gambar */}
      <div className="h-48 w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        ) : (
          <Image
            src="/uploads/default-news.jpg" // ✅ bikin gambar default di /public
            alt="default"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        )}
      </div>

      {/* Konten */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{content}</p>

        {/* Link ke detail */}
        <Link
          href={`/berita/${_id}`}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </motion.div>
  );
}
