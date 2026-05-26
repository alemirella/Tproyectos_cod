import mongoose from "mongoose";
import { CLASSROOM_TYPES } from "../utils/constants.js";

const classroomSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: CLASSROOM_TYPES, required: true },
    capacity: { type: Number, required: true, min: 1 },
    location: { type: String, trim: true, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Classroom", classroomSchema);
