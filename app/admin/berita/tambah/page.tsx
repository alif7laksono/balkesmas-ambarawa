// app/admin/berita/tambah/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ✅ Schema Zod berita
const newsSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .regex(/^[a-zA-Z0-9\s.,!?()-]+$/, "Judul hanya boleh huruf & angka"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Gambar wajib diisi")
    .refine((file) => file.size <= 400 * 1024, "Ukuran gambar maksimal 400kb")
    .refine(
      (file) => file.type.startsWith("image/"),
      "File harus berupa gambar"
    ),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function TambahBerita() {
  const [form, setForm] = useState<Omit<NewsFormData, "image">>({
    title: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Ambil daftar kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Gagal mengambil kategori");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat kategori ⚠️");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle gambar + preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 400 * 1024) {
        toast.error("Ukuran gambar maksimal 400kb ⚠️");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit berita
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Gambar wajib diupload ⚠️");
      return;
    }

    const result = newsSchema.safeParse({
      title: form.title,
      content: form.content,
      category: form.category,
      image: image,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast("Validasi gagal ⚠️", {
          description: issue.message,
        });
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("image", image);

      const res = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Berita berhasil ditambahkan 🎉");
        router.push("/admin/berita");
      } else {
        toast.error("Gagal menambahkan berita ⚠️", {
          description: data.message || "Coba lagi nanti",
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server 😢");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Tambah Berita</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Judul */}
        <div>
          <label className="block mb-2 font-medium">Judul Berita</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
            placeholder="Masukkan judul berita"
            disabled={loading}
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block mb-2 font-medium">Kategori</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
            disabled={loading}
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Konten */}
        <div>
          <label className="block mb-2 font-medium">Konten Berita</label>
          <textarea
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
            placeholder="Tulis isi berita..."
            disabled={loading}
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block mb-2 font-medium">Gambar (max 400kb)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
          {preview && (
            <div className="mt-4">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg shadow-md max-h-64 object-contain"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-[#dc3545] hover:bg-[#b52a37] text-white px-6 py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Berita"}
        </Button>
      </form>
    </div>
  );
}
