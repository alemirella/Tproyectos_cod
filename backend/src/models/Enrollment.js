import mongoose from "mongoose";
import { ENROLLMENT_STATUS } from "../utils/constants.js";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    totalCredits: { type: Number, default: 0 },
    status: { type: String, enum: ENROLLMENT_STATUS, default: "DRAFT" },
    validationMessages: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
