import { NextResponse } from "next/server";
import { testNewsIntegration } from "@/app/lib/test-news-integration";

export async function GET() {
  try {
    const result = await testNewsIntegration();

    return NextResponse.json({
      service: "News System Integration Test",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        service: "News System Integration Test",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
