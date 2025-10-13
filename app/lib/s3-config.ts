import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

// Validasi environment variables
if (!process.env.S3_ENDPOINT) {
  throw new Error("S3_ENDPOINT environment variable is required");
}
if (!process.env.S3_BUCKET_NAME) {
  throw new Error("S3_BUCKET_NAME environment variable is required");
}
if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID environment variable is required");
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_SECRET_ACCESS_KEY environment variable is required");
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "idn", // Default ke 'idn' jika tidak ada
  endpoint: process.env.S3_ENDPOINT, // https://nos.wjv-1.neo.id
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Penting untuk S3-compatible services seperti Neo
});

const generateFileKey = (
  category: string,
  pathname: string,
  fileName: string,
  type: string
): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const uniqueId = uuidv4();
  return `${category}/${pathname}/${type}/${uniqueId}.${extension}`;
};

const getPresignedUrl = async (Key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    throw new Error("Failed to generate download URL");
  }
};

const extractKeyFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.slice(1);
  } catch {
    return null;
  }
};

export { s3Client, generateFileKey, getPresignedUrl, extractKeyFromUrl };
