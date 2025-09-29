// app/admin/suggestions/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AdminSuggestionsClient from "@/components/admin/AdminSuggestionsClient";
import LogoutButton from "@/components/auth/LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function SuggestionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin - Saran & Masukan</h1>
        <LogoutButton />
      </div>

      {/* Content */}
      <AdminSuggestionsClient />
    </div>
  );
}
