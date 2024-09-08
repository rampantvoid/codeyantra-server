import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sap: {
      type: String,
      default: "500106010",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = new mongoose.model("User", userSchema);
