// app/api/suggestions/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Suggestion from "../../models/Suggestion";

interface Filter {
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

interface SuggestionData {
  name: string;
  phone: string;
  message: string;
}

interface PatchData {
  id: string;
  status: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, phone, message } = (await req.json()) as SuggestionData;
    const newSuggestion = await Suggestion.create({ name, phone, message });
    return NextResponse.json({ success: true, data: newSuggestion });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "10", 10),
      100
    );
    const search = searchParams.get("search") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const filter: Filter = {};
    if (search) {
      // fallback to regex search on several fields
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const [total, data] = await Promise.all([
      Suggestion.countDocuments(filter),
      Suggestion.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;
    return NextResponse.json({
      success: true,
      data,
      meta: { total, page, totalPages, limit },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json() as PatchData;
    if (!id)
      return NextResponse.json(
        { success: false, error: "id required" },
        { status: 400 }
      );
    const updated = await Suggestion.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, error: "id required" },
        { status: 400 }
      );
    await Suggestion.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
