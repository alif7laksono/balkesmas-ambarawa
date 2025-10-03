// app/admin/berita/edit/[id]/EditBeritaClient.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

type NewsType = {
  _id: string;
  title: string;
  content: string;
  category: { _id: string; name: string };
  image: string;
};

export default function EditBeritaClient({ news }: { news: NewsType }) {
  const [form, setForm] = useState({
    title: news.title,
    content: news.content,
    category: news.category?._id || "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(news.image);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Ambil daftar kategori
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => toast.error("Gagal memuat kategori ⚠️"));
  }, []);

  // ✅ Handle gambar
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

  // ✅ Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      if (image) formData.append("image", image);

      const res = await fetch(`/api/news/${news._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          category: form.category,
          // ❗ kalau gambar baru diupload, API PUT harus diubah untuk handle file upload juga
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Berita berhasil diperbarui 🎉");
        router.push("/admin/berita");
      } else {
        toast.error("Gagal mengupdate berita ⚠️", {
          description: data.message,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Judul */}
      <div>
        <label className="block mb-2 font-medium">Judul Berita</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block mb-2 font-medium">Kategori</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
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
        />
      </div>

      {/* Upload Gambar */}
      <div>
        <label className="block mb-2 font-medium">Gambar</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
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
      <button
        type="submit"
        className="bg-[#dc3545] hover:bg-[#b52a37] text-white px-6 py-3 rounded-lg"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Update Berita"}
      </button>
    </form>
  );
}
