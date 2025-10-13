import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "@/app/lib/s3-config";

export async function POST(request: NextRequest) {
  try {
    const { keys } = await request.json();

    if (!keys || !Array.isArray(keys)) {
      return NextResponse.json(
        { error: "Keys parameter is missing or invalid" },
        { status: 400 }
      );
    }

    const urls = await Promise.all(
      keys.map(async (key: string) => ({
        key,
        url: await getPresignedUrl(key),
      }))
    );

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Error generating batch pre-signed URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate batch pre-signed URLs" },
      { status: 500 }
    );
  }
}
