// app/api/categories/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Category from "@/app/models/Category";

// GET all categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST create category
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = new Category({
      name: body.name,
      description: body.description || "",
    });

    await category.save();
    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
