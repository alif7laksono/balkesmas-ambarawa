// app/lib/fileUtils.ts

import { unlink, stat } from "fs/promises";
import path from "path";

// ✅ Delete single file
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    // Only delete files from uploads directory for safety
    if (!filePath.startsWith("/uploads/")) {
      console.log(
        `⚠️ Safety check: Only deleting from /uploads/, skipping: ${filePath}`
      );
      return false;
    }

    const fullPath = path.join(process.cwd(), "public", filePath);

    // Check if file exists
    try {
      await stat(fullPath);
    } catch {
      console.log(`⚠️ File not found, skipping: ${filePath}`);
      return false;
    }

    await unlink(fullPath);
    console.log(`✅ File deleted: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting file ${filePath}:`, error);
    return false;
  }
}

// ✅ Extract filename from URL
export function extractFilenameFromUrl(url: string): string {
  return url.split("/").pop() || "";
}

// ✅ File validation
export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 600 * 1024; // 600KB
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/avif",
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Hanya file JPEG, PNG, AVIF, dan WebP yang diizinkan",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Ukuran file maksimal 1000KB. File Anda: ${(
        file.size / 1024
      ).toFixed(0)}KB
      ).toFixed(0)}KB`,
    };
  }

  return { isValid: true };
}
