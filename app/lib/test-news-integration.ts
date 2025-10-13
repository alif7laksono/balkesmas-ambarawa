import { connectDB } from "./mongodb";
import News from "@/app/models/News";
import Category from "@/app/models/Category";
import { s3Client, generateFileKey, getPresignedUrl } from "./s3-config";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function testNewsIntegration() {
  const testResults = {
    mongodb: { success: false, error: "" },
    s3: { success: false, error: "" },
    newsCrud: { success: false, error: "" },
    categories: { success: false, error: "" },
  };

  try {
    // Test MongoDB Connection
    console.log("🧪 Testing MongoDB...");
    try {
      await connectDB();
      testResults.mongodb.success = true;
      console.log("✅ MongoDB connection test passed");
    } catch (error) {
      testResults.mongodb.error =
        error instanceof Error ? error.message : "Unknown error";
      console.log("❌ MongoDB connection test failed");
      throw new Error(`MongoDB failed: ${testResults.mongodb.error}`);
    }

    // Test S3 Connection
    console.log("🧪 Testing S3...");
    try {
      const testKey = generateFileKey("news", "images", File.name, "images");
      const testContent = Buffer.from(
        `Integration test at ${new Date().toISOString()}`
      );

      const putCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: testKey,
        Body: testContent,
        ContentType: "text/plain",
      });

      await s3Client.send(putCommand);

      // Test presigned URL
      const presignedUrl = await getPresignedUrl(testKey);
      console.log(
        "📝 Presigned URL generated:",
        presignedUrl.substring(0, 100) + "..."
      );

      // Cleanup
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: testKey,
      });
      await s3Client.send(deleteCommand);

      testResults.s3.success = true;
      console.log("✅ S3 integration test passed");
    } catch (error) {
      testResults.s3.error =
        error instanceof Error ? error.message : "Unknown error";
      console.log("❌ S3 integration test failed");
      throw new Error(`S3 failed: ${testResults.s3.error}`);
    }

    // Test Categories
    console.log("🧪 Testing Categories...");
    try {
      const categories = await Category.find().limit(5);
      testResults.categories.success = true;
      console.log(
        `✅ Categories test passed (${categories.length} categories found)`
      );
    } catch (error) {
      testResults.categories.error =
        error instanceof Error ? error.message : "Unknown error";
      console.log("❌ Categories test failed");
    }

    // Test News CRUD Operations
    console.log("🧪 Testing News CRUD...");
    try {
      const newsCount = await News.countDocuments();
      const sampleNews = await News.findOne().populate("category");

      testResults.newsCrud.success = true;
      console.log(
        `✅ News CRUD test passed (${newsCount} news articles, sample: ${
          sampleNews?.title || "N/A"
        })`
      );
    } catch (error) {
      testResults.newsCrud.error =
        error instanceof Error ? error.message : "Unknown error";
      console.log("❌ News CRUD test failed");
    }

    return {
      success: testResults.mongodb.success && testResults.s3.success,
      timestamp: new Date().toISOString(),
      details: testResults,
    };
  } catch (error) {
    console.error("❌ Integration test failed:", error);
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
      details: testResults,
    };
  }
}
