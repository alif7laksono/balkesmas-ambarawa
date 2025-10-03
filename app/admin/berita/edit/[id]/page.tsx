// app/admin/berita/edit/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import EditBeritaClient from "./EditBeritaClient";

interface EditBeritaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBeritaPage({ params }: EditBeritaPageProps) {
  const { id } = await params; // ✅ harus di-await

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  await connectDB();
  const news = await News.findById(id).populate("category");

  if (!news) {
    return <div className="p-6 text-red-600">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
      <EditBeritaClient news={JSON.parse(JSON.stringify(news))} />
    </div>
  );
}
