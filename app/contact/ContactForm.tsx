// app/contact/ContactForm.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fadeIn } from "../animations/animations";
import { z } from "zod";

// 🔹 Schema Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama wajib diisi")
    .regex(/^[A-Za-z\s]+$/, "Nama hanya boleh huruf"),
  phone: z
    .string()
    .min(8, "Nomor terlalu pendek")
    .regex(/^[0-9]+$/, "No. Telp hanya boleh angka"),
  message: z.string().min(1, "Pesan wajib diisi"),
});

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Validasi pakai Zod
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      result.error.issues.forEach((err) => {
        toast("Validasi gagal ⚠️", {
          description: err.message,
        });
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast(`Terima kasih, ${form.name || "Pengguna"}! 🎉`, {
          description:
            "Saran Anda berhasil dikirim. Kami sangat menghargai masukan dari Anda.",
        });
        setForm({ name: "", phone: "", message: "" });
      } else {
        toast("Gagal mengirim saran 😢", {
          description: "Silakan coba lagi nanti.",
        });
      }
    } catch (error) {
      toast("Terjadi kesalahan ⚠️", {
        description: "Server tidak merespon. Silakan coba lagi.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 p-8 rounded-2xl shadow-lg"
    >
      <div className="mb-8 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium mb-2">
          Halaman Kritik & Saran Balkesmas Ambarawa
        </p>
        <p>
          Kami sangat menghargai setiap masukan dari masyarakat. Kritik dan
          saran yang Anda berikan akan membantu kami meningkatkan kualitas
          pelayanan serta memberikan pengalaman yang lebih baik bagi seluruh
          pasien dan pengunjung.
        </p>
        <p className="mt-2">
          Silakan isi formulir di bawah ini dengan jujur dan jelas. Setiap pesan
          Anda akan menjadi bahan evaluasi penting bagi kami.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Formulir Kontak
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2">Nama</label>
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={form.name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) {
                setForm({ ...form, name: value });
              }
            }}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000] outline-none"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            No. Telp / Whatsapp
          </label>
          <input
            type="text"
            placeholder="Masukkan No. Telp / Whatsapp"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]*$/.test(value)) {
                setForm({ ...form, phone: value });
              }
            }}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000] outline-none"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Pesan</label>
          <textarea
            rows={5}
            placeholder="Masukkan Pesan"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000] outline-none"
            disabled={loading}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="bg-gray-950 hover:bg-gray-800 text-white px-6 py-3 rounded-xl w-full"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
