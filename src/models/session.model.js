import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "ongoing",
      required: true,
    },
  },
  { timestamps: true }
);

export const Session = new mongoose.model("Session", sessionSchema);
