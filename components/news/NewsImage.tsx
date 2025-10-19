// components/NewsImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function NewsImage({
  src,
  alt,
  className = "",
}: NewsImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    console.error("❌ Gambar gagal dimuat:", src);
    setImageError(true);

    // Coba fallback ke base URL tanpa parameters
    if (src.includes("?")) {
      const baseUrl = src.split("?")[0];
      console.log("🔄 Mencoba fallback ke:", baseUrl);
      setImageSrc(baseUrl);
      setImageError(false);
    }
  };

  if (imageError) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-200 ${className}`}
      >
        <span className="text-gray-500">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      width={400}
      height={200}
    />
  );
}
