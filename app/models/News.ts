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
    imageKey: {
      type: String,
      required: false,
    },
    image: {
      type: String,
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// NewsSchema.virtual("imageKey").get(function () {
//   if (this.imageKey) {
//     return `https://${
//       process.env.S3_BUCKET_NAME
//     }.${process.env.S3_ENDPOINT?.replace("https://", "")}/${this.imageKey}`;
//   }
//   return this.image;
// });

const News = models.News || mongoose.model<INews>("News", NewsSchema);
export default News;
