// app/models/Category.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category =
  models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
