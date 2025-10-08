// app/admin/berita/tambah/page.tsx

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import TambahBeritaClient from "./TambahBeritaClient";

export default async function TambahBeritaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Berita Baru</h1>
      <TambahBeritaClient />
    </div>
  );
}
