// components/Category/CategoryForm.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
  description: z.string().optional(),
});

interface CategoryFormProps {
  initialData?: { _id: string; name: string; description?: string };
  onSuccess: () => void;
}

export default function CategoryForm({
  initialData,
  onSuccess,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = categorySchema.safeParse(form);
    if (!result.success) {
      result.error.issues.forEach((err) => {
        toast("Validasi gagal ⚠️", {
          description: err.message,
        });
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        initialData ? `/api/categories/${initialData._id}` : "/api/categories",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan kategori");

      toast.success(
        initialData
          ? "Kategori berhasil diupdate"
          : "Kategori berhasil ditambahkan"
      );
      onSuccess();
    } catch (err: unknown) {
      toast.error("Error", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-white/5"
    >
      <div>
        <label className="block text-sm font-medium">Nama Kategori</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Menyimpan..." : initialData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
