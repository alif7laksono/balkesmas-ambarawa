// app/admin/components/AdminLayout.tsx

"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      {isOpen && <Sidebar />}

      {/* Main content */}
      <div className="flex-1">
        <div className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h2 className="font-semibold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {isOpen ? "Hide Menu" : "Show Menu"}
          </button>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
