// app/models/Category.ts
import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "@/app/utils/types";

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

const Category: Model<ICategory> = (mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema)) as Model<ICategory>;

export default Category;
