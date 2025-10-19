// app/lib/uploadToS3.ts

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

export async function uploadToS3(base64Image: string, folder = "news") {
  try {
    // Base64 -> Buffer
    const base64Data = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = base64Image.split(";")[0].split("/")[1];
    const fileName = `${folder}/${randomUUID()}.${type}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return { success: true, url: fileUrl, key: fileName };
  } catch (error) {
    console.error("❌ Gagal upload ke S3:", error);
    return { success: false, message: "Gagal upload ke S3" };
  }
}

export async function deleteFromS3(key: string) {
  try {
    await s3.send(
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
