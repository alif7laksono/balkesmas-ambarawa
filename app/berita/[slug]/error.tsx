// app/berita/[slug]/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error details:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-600 mb-6">
          Maaf, terjadi kesalahan saat memuat berita. Silakan coba lagi.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Coba Lagi
          </button>
          <Link
            href="/berita"
            className="block w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 p-4 bg-red-50 rounded-lg text-left">
            <summary className="cursor-pointer font-medium text-red-800">
              Debug Information
            </summary>
            <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
