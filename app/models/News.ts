// app/models/News.ts

import mongoose, { Schema, models } from "mongoose";
import { INews } from "@/app/utils/types";

const NewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 160,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    metaTitle: {
      type: String,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      maxlength: 160,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    eventDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const News = models.News || mongoose.model<INews>("News", NewsSchema);
export default News;
