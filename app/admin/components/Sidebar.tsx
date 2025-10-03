"use client";

import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen sticky top-0 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-8 text-gray-800">Menu</h2>
        <nav className="space-y-4">
          <Link
            href="/admin/berita"
            className="block text-gray-700 hover:text-blue-600"
          >
            Manage Berita
          </Link>
          <Link
            href="/admin/categories"
            className="block text-gray-700 hover:text-blue-600"
          >
            Kategori Berita
          </Link>
          <Link
            href="/admin/suggestions"
            className="block text-gray-700 hover:text-blue-600"
          >
            Kritik & Saran
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
