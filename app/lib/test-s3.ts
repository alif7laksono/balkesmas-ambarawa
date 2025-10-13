import { s3Client, generateFileKey } from "./s3-config";
import {
  ListBucketsCommand,
  HeadBucketCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { TestResult } from "@/app/utils/types";

export async function testS3Connection(): Promise<TestResult> {
  try {
    console.log("🔌 Testing S3 connection...");

    // Debug: Log configuration
    console.log("🔧 S3 Configuration:", {
      endpoint: process.env.S3_ENDPOINT,
      bucket: process.env.S3_BUCKET_NAME,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID
        ? "***" + process.env.AWS_ACCESS_KEY_ID.slice(-4)
        : "missing",
    });

    // Test 1: List buckets (basic connection test)
    const listCommand = new ListBucketsCommand({});
    const listResult = await s3Client.send(listCommand);
    console.log("✅ S3 connection successful");

    // Test 2: Check if our bucket exists and is accessible
    const headCommand = new HeadBucketCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
    });

    await s3Client.send(headCommand);
    console.log(`✅ Bucket "${process.env.S3_BUCKET_NAME}" is accessible`);

    // Test 3: Test write permission with a small test file
    const testKey = generateFileKey(
      "test",
      "connection",
      `test-${Date.now()}.txt`,
      "files"
    );
    const testContent = `S3 connection test at ${new Date().toISOString()}`;

    const putCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: testKey,
      Body: testContent,
      ContentType: "text/plain",
    });

    await s3Client.send(putCommand);
    console.log("✅ Write permission test passed");

    // Test 4: Test delete permission
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: testKey,
    });

    await s3Client.send(deleteCommand);
    console.log("✅ Delete permission test passed");

    return {
      success: true,
      service: "AWS S3",
      timestamp: new Date().toISOString(),
      details: {
        bucket: process.env.S3_BUCKET_NAME,
        region: process.env.AWS_REGION,
        endpoint: process.env.S3_ENDPOINT,
        buckets:
          listResult.Buckets?.map((b) => b.Name).filter(
            (name): name is string => !!name
          ) || [],
      },
    };
  } catch (error: unknown) {
    console.error("❌ S3 connection test failed:", error);

    let errorDetails = "Unknown error";
    if (error && typeof error === "object" && "$metadata" in error) {
      const s3Error = error as {
        $metadata: { httpStatusCode?: number };
        name?: string;
      };
      errorDetails = `HTTP ${s3Error.$metadata.httpStatusCode || "unknown"}: ${
        s3Error.name || "S3 Error"
      }`;
    } else if (error instanceof Error) {
      errorDetails = error.message;
    }

    // Return debug information
    return {
      success: false,
      service: "AWS S3",
      timestamp: new Date().toISOString(),
      error: errorDetails,
      details: {
        bucket: process.env.S3_BUCKET_NAME,
        region: process.env.AWS_REGION,
        endpoint: process.env.S3_ENDPOINT,
        debug: {
          endpointConfigured: !!process.env.S3_ENDPOINT,
          bucketConfigured: !!process.env.S3_BUCKET_NAME,
          accessKeyConfigured: !!process.env.AWS_ACCESS_KEY_ID,
          secretKeyConfigured: !!process.env.AWS_SECRET_ACCESS_KEY,
        },
      },
    };
  }
}
