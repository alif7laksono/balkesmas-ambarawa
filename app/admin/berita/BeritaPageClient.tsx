// app/admin/berita/BeritaPageClient.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { NewsProps } from "@/app/utils/types";

export default function BeritaPageClient({ news }: NewsProps) {
  const [newsList, setNewsList] = useState(news);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menghapus berita");
      }

      if (data.success) {
        setNewsList(newsList.filter((item) => item._id !== id));
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
          {newsList.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3 border">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={60}
                  className="rounded object-cover"
                />
              </td>
              <td className="p-3 border font-medium">{item.title}</td>
              <td className="p-3 border">{item.category?.name || "-"}</td>
              <td className="p-3 border">
                {new Date(item.eventDate).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/berita/edit/${item._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  disabled={deletingId === item._id}
                  className={`text-red-600 hover:underline ${
                    deletingId === item._id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {deletingId === item._id ? "Menghapus..." : "Hapus"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
