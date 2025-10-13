import { connectDB } from "./mongodb";
import { TestResult } from "@/app/utils/types";

export async function testMongoDBConnection(): Promise<TestResult> {
  try {
    console.log("🔌 Testing MongoDB connection...");

    const connection = await connectDB();

    // Check if connection and database are available
    if (!connection.connection.db) {
      throw new Error("MongoDB database is not available");
    }

    // Test basic connection
    console.log("✅ MongoDB connected successfully");

    // Test database operations
    const adminDb = connection.connection.db.admin();
    const serverStatus = await adminDb.serverStatus();

    // Test collections
    const collections = await connection.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((c) => c.name);

    return {
      success: true,
      service: "MongoDB",
      timestamp: new Date().toISOString(),
      details: {
        database: connection.connection.db.databaseName,
        host: connection.connection.host,
        port: connection.connection.port,
        collections: collectionNames,
        version: serverStatus.version,
        storageEngine: serverStatus.storageEngine?.name,
      },
    };
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error);
    return {
      success: false,
      service: "MongoDB",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
