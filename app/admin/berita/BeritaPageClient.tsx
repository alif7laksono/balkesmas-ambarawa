// app/admin/berita/BeritaPageClient.tsx

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { NewsType } from "@/app/utils/types";

interface BeritaPageClientProps {
  news: NewsType[];
}

export default function BeritaPageClient({ news }: BeritaPageClientProps) {
  const [newsList, setNewsList] = useState<NewsType[]>(news);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const normalizeEventDate = (eventDate: Date | string): Date => {
    if (eventDate instanceof Date) {
      return eventDate;
    }
    return new Date(eventDate);
  };

  // Handle image error untuk setiap item
  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  // Reset image errors ketika data berubah
  useEffect(() => {
    setImageErrors({});
  }, [news]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) {
      return;
    }

    setDeletingId(slug);

    try {
      const res = await fetch(`/api/news/${slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gagal menghapus berita");

      if (data.success) {
        setNewsList(newsList.filter((item) => item.slug !== slug));
        toast.success("Berita berhasil dihapus 🗑️");
      } else {
        throw new Error(data.message || "Gagal menghapus berita");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan server 😢"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (!newsList || newsList.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <Link
            href="/admin/berita/tambah"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Tambah Berita
          </Link>
        </div>
        <p className="text-gray-600">Belum ada berita.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <div className="mb-6">
        <Link
          href="/admin/berita/tambah"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Tambah Berita
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border">Gambar</th>
            <th className="p-3 border">Judul</th>
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border">Tanggal</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((item) => {
            // Tentukan source gambar berdasarkan apakah ada error atau tidak
            const imageSrc = imageErrors[item._id]
              ? "/uploads/default-news.jpg"
              : item.imageKey || "/uploads/default-news.jpg";

            const eventDate = normalizeEventDate(item.eventDate);

            console.log(`Item ${item.title}:`, {
              imageKey: item.imageKey,
              imageSrc,
              hasError: imageErrors[item._id],
            });

            return (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  <div className="relative w-20 h-16">
                    <Image
                      src={imageSrc}
                      alt={item.title}
                      fill
                      className="rounded object-cover"
                      sizes="80px"
                      onError={() => handleImageError(item._id)}
                    />
                  </div>
                </td>
                <td className="p-3 border font-medium max-w-xs">
                  {item.title}
                </td>
                <td className="p-3 border">{item.category?.name || "-"}</td>
                <td className="p-3 border">
                  {eventDate.toLocaleDateString("id-ID")}
                </td>
                <td className="p-3 border space-x-2">
                  <Link
                    href={`/admin/berita/edit/${item.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.slug, item.title)}
                    disabled={deletingId === item.slug}
                    className={`text-red-600 hover:underline ${
                      deletingId === item.slug
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deletingId === item.slug ? "Menghapus..." : "Hapus"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
