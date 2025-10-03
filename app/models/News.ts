// app/models/News.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: Date;
  category: mongoose.Types.ObjectId; // relasi ke Category
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
      maxlength: 300,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // relasi ke Category
      required: true,
    },
  },
  { timestamps: true }
);

const News = models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
