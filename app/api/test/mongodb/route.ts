import { NextResponse } from "next/server";
import { testMongoDBConnection } from "@/app/lib/test-mongodb";

export async function GET() {
  try {
    const result = await testMongoDBConnection();

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      service: "MongoDB",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        service: "MongoDB",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
