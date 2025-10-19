// app/lib/updateNews.ts

import News from "@/app/models/News";
import { connectDB } from "@/app/lib/mongodb";
import { NewsType } from "../utils/types";

export async function updateNewsBySlug(slug: string, updateData: NewsType) {
  await connectDB();

  const updated = await News.findOneAndUpdate(
    { slug },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return updated;
}
