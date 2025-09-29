// app/models/Admin.ts

import mongoose, { Schema, models } from "mongoose";

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
