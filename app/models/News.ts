// app/models/News.ts

import mongoose, { Schema, Document, models } from "mongoose";
import Category from "@/app/models/Category";

export interface INews extends Document {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  slug: string;
  status: "draft" | "published" | "archived";
  metaTitle?: string;
  metaDescription?: string;
  date: Date;
  eventDate: Date;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
