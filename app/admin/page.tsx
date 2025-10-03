// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import DashboardCards from "./components/DashboardCards";
import AdminLayout from "./components/AdminLayout";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Dashboard Admin - Balkesmas Wilayah Ambarawa
          </h1>
          <DashboardCards />
        </div>
      </AdminLayout>
    </>
  );
}
