// app/admin/categories/CategoriesPageClient.tsx

"use client";

import { useEffect, useState } from "react";
import CategoryForm from "@/components/category/CategoryForm";
import { toast } from "sonner";
import LogoutButton from "@/components/auth/LogoutButton";
import { Category } from "@/app/utils/category";

export default function CategoriesPageClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Gagal memuat kategori", { description: err.message });
      } else {
        toast.error("Gagal memuat kategori", {
          description: "Terjadi kesalahan yang tidak diketahui",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus kategori");
      toast.success("Kategori berhasil dihapus");
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Error", { description: err.message });
      } else {
        toast.error("Error", {
          description: "Terjadi kesalahan yang tidak diketahui",
        });
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <LogoutButton />
        <h1 className="text-2xl font-semibold">Manajemen Kategori</h1>
        <button
          onClick={() => {
            setEditCategory(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Tambah Kategori
        </button>
      </div>

      {showForm && (
        <CategoryForm
          initialData={editCategory || undefined}
          onSuccess={() => {
            setShowForm(false);
            fetchCategories();
          }}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Deskripsi</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="text-center">
                <td className="border p-2">{cat.name}</td>
                <td className="border p-2">{cat.description}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory(cat);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
