// app/models/Suggestion.ts

import { Schema, model, models } from "mongoose";

const SuggestionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

// text index supaya search name/message lebih cepat (opsional)
SuggestionSchema.index({ name: "text", message: "text" });

export default models.Suggestion || model("Suggestion", SuggestionSchema);
