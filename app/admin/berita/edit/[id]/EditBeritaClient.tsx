// app/admin/berita/edit/[id]/EditBeritaClient.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "next/image";
import { useSlugGenerator } from "@/app/hooks/useSlugGenerator";
import { NewsType } from "@/app/utils/types";

interface MenuBarProps {
  editor: Editor | null;
}

// ✅ COMPLETE Toolbar Component untuk TipTap
const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    console.log("❌ Editor not available in MenuBar");
    return null;
  }

  console.log("🎛️ MenuBar rendered, editor:", !!editor);

  // Type guard untuk heading level
  const isValidHeadingLevel = (
    level: number
  ): level is 1 | 2 | 3 | 4 | 5 | 6 => {
    return [1, 2, 3, 4, 5, 6].includes(level);
  };

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Headings */}
      <select
        value={editor.getAttributes("heading").level || ""}
        onChange={(e) => {
          const level = parseInt(e.target.value);
          console.log("🎯 Heading selected:", level);
          if (level && isValidHeadingLevel(level)) {
            editor.chain().focus().toggleHeading({ level }).run();
          } else {
            editor.chain().focus().setParagraph().run();
          }
        }}
        className="p-1 border rounded text-sm"
      >
        <option value="">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
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

      {/* Text Alignment */}
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

      {/* Text Alignment - Justify */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-300"
            : "hover:bg-gray-200"
        }`}
        title="Justify"
      >
        ☰
      </button>

      {/* Indentation */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="p-2 rounded hover:bg-gray-200"
        title="Line Break"
      >
        ↵
      </button>

      {/* Clear Formatting */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        className="p-2 rounded hover:bg-gray-200 text-red-600"
        title="Clear Formatting"
      >
        🗑️
      </button>
    </div>
  );
};

export default function EditBeritaClient({ news }: { news: NewsType }) {
  const [form, setForm] = useState({
    title: news.title,
    content: news.content,
    category: news.category?._id || "",
    status: news.status || "draft",
    eventDate: news.eventDate
      ? new Date(news.eventDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(news.image);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Custom hook untuk slug generation
  const { slug, setSlug, isManualEdit } = useSlugGenerator(
    form.title,
    news.slug
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setForm((prev) => ({ ...prev, title: newTitle }));
  };

  // ✅ COMPLETE TipTap Editor dengan semua extensions
  const [isClient, setIsClient] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline, // ✅ Tambah underline extension
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setForm((prev) => ({ ...prev, content: html }));
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Ambil daftar kategori
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => toast.error("Gagal memuat kategori ⚠️"));
  }, []);

  useEffect(() => {
    if (editor) {
      console.log("🚀 Editor mounted:", editor);
      console.log("📋 Available commands:", {
        canBold: editor.can().chain().focus().toggleBold().run(),
        canItalic: editor.can().chain().focus().toggleItalic().run(),
        canBulletList: editor.can().chain().focus().toggleBulletList().run(),
        canOrderedList: editor.can().chain().focus().toggleOrderedList().run(),
      });
    }
  }, [editor]);

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
          "Format gambar tidak didukung. Gunakan JPEG, PNG, Avif, atau WebP ⚠️"
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

  // ✅ Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("status", form.status);
      formData.append("slug", slug);
      formData.append("eventDate", form.eventDate);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/news/${news._id}`, {
        method: "PUT",
        body: formData,
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Judul Berita */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Judul Berita *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={handleTitleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            Status *
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
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

      {/* Rich Text Editor */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Konten Berita *
        </label>
        {isClient && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent
              editor={editor}
              className="min-h-[400px] p-4 prose max-w-none focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Featured Image */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Featured Image
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <p className="text-sm text-gray-500 mt-1">
          Ukuran maksimal: 600KB. Kosongkan jika tidak ingin mengubah gambar.
        </p>

        {/* Current Image */}
        {news.image && !preview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Gambar saat ini:</p>
            <div className="relative w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={news.image}
                alt="Current"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* New Image Preview */}
        {preview && preview !== news.image && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview gambar baru:</p>
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
          {loading ? "Menyimpan..." : "Update Berita"}
        </button>
      </div>
    </form>
  );
}
