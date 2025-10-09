// app/admin/berita/tambah/TambahBeritaClient.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import TextAlign from "@tiptap/extension-text-align";
import { useSlugGenerator } from "@/app/hooks/useSlugGenerator";
import { Category } from "@/app/utils/category";

interface MenuBarProps {
  editor: Editor | null;
}

// Toolbar Component untuk TipTap
const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-1 bg-gray-50">
      <select
        value={editor.getAttributes("heading").level || ""}
        onChange={(e) => {
          const level = parseInt(e.target.value);
          // ✅ Type assertion ke Level type yang valid
          if (
            level === 1 ||
            level === 2 ||
            level === 3 ||
            level === 4 ||
            level === 5 ||
            level === 6
          ) {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
              .run();
          } else {
            editor.chain().focus().setParagraph().run();
          }
        }}
        className="p-1 border rounded text-sm"
      >
        <option value="">Paragraph</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
      </select>
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${
          editor.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        title="Underline"
      >
        <u>U</u>
      </button>
      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200"
        }`}
        title="Numbered List"
      >
        1. List
      </button>
      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
        title="Align Left"
      >
        ⬅
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
        title="Align Center"
      >
        ↔
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
        title="Align Right"
      >
        ➡
      </button>
    </div>
  );
};

export default function TambahBeritaClient() {
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "published",
    eventDate: new Date().toISOString().split("T")[0],
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setForm((prev) => ({ ...prev, content: html }));
    },
    immediatelyRender: false, // ✅ Important untuk avoid hydration
  });

  // ✅ Custom hook untuk slug generation
  const { slug, setSlug, isManualEdit } = useSlugGenerator(form.title);

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
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "image/avif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Format gambar tidak didukung. Gunakan JPEG, PNG, WebP, atau AVIF ⚠️"
        );
        return;
      }

      if (file.size > 1000 * 1024) {
        toast.error("Ukuran gambar maksimal 1000KB ⚠️");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!image) {
        toast.error("Gambar berita wajib diupload ⚠️");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("status", form.status);
      formData.append("slug", slug);
      formData.append("image", image);

      const res = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          form.status === "published"
            ? "Berita berhasil diterbitkan 🎉"
            : "Berita disimpan sebagai draft 💾"
        );
        router.push("/admin/berita");
      } else {
        toast.error("Gagal membuat berita ⚠️", {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Judul Berita */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Judul Berita *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Masukkan judul berita yang menarik..."
          required
        />
      </div>

      {/* Slug Generation */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          URL Slug *
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 whitespace-nowrap">
            situsanda.com/berita/
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            Tanggal Kegiatan *
          </label>
          <input
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Tanggal ketika kegiatan/acara dilaksanakan
          </p>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Status *
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "draft" | "published",
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Rich Text Editor dengan TipTap */}
      {isClient && (
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Konten Berita *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent
              editor={editor}
              className="min-h-[400px] p-4 prose max-w-none focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Featured Image */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Featured Image *
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Ukuran maksimal: 1MB. Format: JPG, PNG, WebP, AVIF
        </p>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="relative w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-6 border-t">
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
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading
            ? "Menyimpan..."
            : form.status === "published"
            ? "💫 Terbitkan Berita"
            : "💾 Simpan Draft"}
        </button>
      </div>
    </form>
  );
}
