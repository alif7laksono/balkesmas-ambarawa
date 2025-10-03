// app/admin/berita/BeritaPageClient.tsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type NewsProps = {
  news: {
    _id: string;
    title: string;
    content: string;
    image: string;
    category?: { _id: string; name: string };
    createdAt: string;
  }[];
};

export default function BeritaPageClient({ news }: NewsProps) {
  if (!news || news.length === 0) {
    return <p className="text-gray-600">Belum ada berita.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
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
          {news.map((item) => (
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
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/berita/edit/${item._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
