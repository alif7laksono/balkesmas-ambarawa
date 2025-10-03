// app/berita/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { News } from "@/app/utils/news";

export default function NewsDetailPage() {
  const { id } = useParams(); // ambil ID dari URL
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading berita...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Informasi
        </Link>{" "}
        &gt;{" "}
        <Link href="/berita" className="hover:underline">
          Berita
        </Link>{" "}
        &gt; <span className="text-gray-900">{news.title}</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => router.push("/berita")}
        className="mb-6 inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition"
      >
        ← Kembali ke Daftar Berita
      </button>

      {/* Image */}
      <div className="relative w-full h-80 md:h-[500px] mb-6 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title & Date */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(news.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Content */}
      <div className="prose max-w-none">
        <p>{news.content}</p>
      </div>
    </div>
  );
}
