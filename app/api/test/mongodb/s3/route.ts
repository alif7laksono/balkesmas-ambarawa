import { NextResponse } from "next/server";
import { testS3Connection } from "@/app/lib/test-s3";

export async function GET() {
  try {
    const result = await testS3Connection();

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      service: "AWS S3",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        service: "AWS S3",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
