import mongoose, { Schema } from "mongoose";

const caseSchema = new Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Case = new mongoose.model("Case", caseSchema);
