import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    sessionId: {
      type: mongoose.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    image: {
      type: Buffer,
    },
    text: {
      type: String,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = new mongoose.model("Question", questionSchema);
