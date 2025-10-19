// app/admin/berita/edit/[slug]/EditBeritaClient.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "next/image";
import { useSlugGenerator } from "@/app/hooks/useSlugGenerator";
import { NewsType } from "@/app/utils/types";

export default function EditBeritaClient({ news }: { news: NewsType }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: news.title,
    content: news.content,
    category: news.category?._id || "",
    status: news.status || "draft",
    eventDate: news.eventDate
      ? new Date(news.eventDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  // State untuk preview gambar
  const [preview, setPreview] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const { slug, setSlug, isManualEdit } = useSlugGenerator(
    form.title,
    news.slug
  );

  // TipTap Editor
  const [isClient, setIsClient] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    immediatelyRender: false,
  });

  useEffect(() => setIsClient(true), []);

  // Inisialisasi gambar saat component mount
  useEffect(() => {
    if (news.imageKey) {
      // Generate full URL untuk gambar yang sudah ada
      const fullImageUrl = getFullImageUrl(news.imageKey);
      setOriginalImage(fullImageUrl);
      setPreview(fullImageUrl);
    }
  }, [news.imageKey]);

  // Fungsi untuk mendapatkan URL gambar yang lengkap
  const getFullImageUrl = (imageKey: string): string => {
    if (!imageKey) return "/uploads/default-news.jpg";

    // Jika sudah full URL, return langsung
    if (imageKey.startsWith("http")) {
      return imageKey;
    }

    // Jika dari S3, generate public URL
    if (
      process.env.S3_BUCKET_NAME &&
      process.env.S3_ENDPOINT &&
      !imageKey.startsWith("/") &&
      !imageKey.startsWith("news/")
    ) {
      const endpoint = process.env.S3_ENDPOINT.replace("https://", "");
      return `https://${process.env.S3_BUCKET_NAME}.${endpoint}/${imageKey}`;
    }

    // Jika relative path, tambahkan base URL
    if (imageKey.startsWith("/")) {
      return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${imageKey}`;
    }

    // Jika path seperti "news/images/..." tambahkan base URL
    if (imageKey.startsWith("news/")) {
      return `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${imageKey}`;
    }

    return "/uploads/default-news.jpg";
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => toast.error("Gagal memuat kategori ⚠️"));
  }, []);

  // ✅ Handle gambar lokal (tanpa upload ke server)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format gambar tidak didukung ⚠️");
      return;
    }

    if (file.size > 1000 * 1024) {
      toast.error("Ukuran gambar maksimal 1000KB ⚠️");
      return;
    }

    // Convert to Base64 string untuk preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Hapus gambar
  const handleRemoveImage = () => {
    setPreview(null);
    setOriginalImage(null);
  };

  // ✅ Submit Update (PUT by slug)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tentukan apakah gambar baru diupload atau menggunakan yang lama
      let imageData = null;

      if (preview && preview !== originalImage) {
        // Jika preview berbeda dari original, berarti ada gambar baru
        if (preview.startsWith("data:")) {
          // Base64 image - new upload
          imageData = preview;
        } else {
          // Masih menggunakan gambar lama
          imageData = news.imageKey; // Kirim imageKey asli untuk dipertahankan
        }
      } else if (!preview) {
        // Gambar dihapus
        imageData = null;
      } else {
        // Tidak ada perubahan gambar
        imageData = news.imageKey;
      }

      const payload = {
        title: form.title,
        content: form.content,
        category: form.category,
        status: form.status,
        slug,
        eventDate: form.eventDate,
        image: imageData, // base64 string (jika baru) atau imageKey (jika lama)
      };

      console.log("Submitting payload:", {
        ...payload,
        image: imageData ? "Image data present" : "No image",
      });

      const res = await fetch(`/api/news/${news.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      console.error(error);
      toast.error("Terjadi kesalahan server 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Judul Berita */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Judul Berita *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          URL Slug *
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 whitespace-nowrap">
            {process.env.NEXT_PUBLIC_BASE_URL || "situsanda.com"}/berita/
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="url-slug-berita"
            required
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {isManualEdit ? "✓ Manual edit" : "✓ Auto-generated dari judul"}
        </p>
      </div>

      {/* Kategori & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Kategori *
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Status *
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Event Date */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Tanggal Kegiatan *
        </label>
        <input
          type="date"
          value={form.eventDate}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Editor */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Konten Berita *
        </label>
        {isClient && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <EditorContent
              editor={editor}
              className="min-h-[400px] p-4 prose max-w-none focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Featured Image
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Preview dan kontrol gambar */}
        {preview && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Preview:</p>
            <div className="flex items-start gap-4">
              <div className="relative w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error("Gagal memuat gambar:", preview);
                    const target = e.target as HTMLImageElement;
                    target.src = "/uploads/default-news.jpg";
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Hapus Gambar
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {preview.startsWith("data:") ? "Gambar baru" : "Gambar saat ini"}
            </p>
          </div>
        )}

        {/* Debug info */}
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <p>Debug Info:</p>
          <p>Original imageKey: {news.imageKey || "Tidak ada"}</p>
          <p>
            Preview type:{" "}
            {preview
              ? preview.startsWith("data:")
                ? "Base64"
                : "URL"
              : "Tidak ada"}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => router.push("/admin/berita")}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Update Berita"}
        </button>
      </div>
    </form>
  );
}
