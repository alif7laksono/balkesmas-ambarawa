// app/lib/s3-config.ts

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

// --- Validasi Environment Variables ---
if (!process.env.S3_ENDPOINT)
  throw new Error("S3_ENDPOINT env var is required");
if (!process.env.S3_BUCKET_NAME)
  throw new Error("S3_BUCKET_NAME env var is required");
if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error("AWS_ACCESS_KEY_ID env var is required");
if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error("AWS_SECRET_ACCESS_KEY env var is required");

// --- Inisialisasi S3 Client ---
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "idn",
  endpoint: process.env.S3_ENDPOINT, // ex: https://nos.wjv-1.neo.id
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // penting untuk layanan S3-compatible seperti Neo
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

// --- Generate Unique File Key ---
export const generateFileKey = (
  category: string,
  pathname: string,
  fileName: string,
  type: string
): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const uniqueId = uuidv4();
  return `${category}/${pathname}/${type}/${uniqueId}.${extension}`;
};

// --- Upload Base64 Image ke S3 ---
export async function uploadToS3(base64Image: string, folder = "news") {
  try {
    const base64Data = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = base64Image.split(";")[0].split("/")[1];
    const fileName = `${folder}/${uuidv4()}.${type}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: base64Data,
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      })
    );

    // Gunakan endpoint custom dari S3-compatible service
    const fileUrl = `${process.env.S3_ENDPOINT!.replace(
      /^https?:\/\//,
      "https://"
    )}/${BUCKET_NAME}/${fileName}`;

    return { success: true, url: fileUrl, key: fileName };
  } catch (error) {
    console.error("❌ Gagal upload ke S3:", error);
    return { success: false, message: "Gagal upload ke S3" };
  }
}

// --- Hapus File dari S3 ---
export async function deleteFromS3(key: string) {
  try { 
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );
    console.log("🧹 File berhasil dihapus dari S3:", key);
  } catch (error) {
    console.error("❌ Gagal hapus file dari S3:", error);
  }
}

// --- Generate Presigned URL ---
export const getPresignedUrl = async (Key: string): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    throw new Error("Failed to generate download URL");
  }
};

// --- Extract Key dari URL ---
export const extractKeyFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.slice(1);
  } catch {
    return null;
  }
};

export { s3Client };
