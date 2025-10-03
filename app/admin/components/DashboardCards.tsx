// app/admin/components/DashboardCards.tsx

"use client";
import Link from "next/link";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Manage Berita */}
      <Link
        href="/admin/berita"
        className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold text-gray-700">Manage Berita</h2>
        <p className="text-sm text-gray-500 mt-2">
          Tambah, edit, atau hapus berita terbaru.
        </p>
      </Link>

      {/* Manage Kategori */}
      <Link
        href="/admin/categories"
        className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Manage Kategori Berita
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Kelola kategori berita untuk mempermudah pengelompokan.
        </p>
      </Link>

      {/* Kritik & Saran */}
      <Link
        href="/admin/suggestions"
        className="block p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold text-gray-700">Kritik & Saran</h2>
        <p className="text-sm text-gray-500 mt-2">
          Lihat dan kelola masukan dari masyarakat.
        </p>
      </Link>
    </div>
  );
}
