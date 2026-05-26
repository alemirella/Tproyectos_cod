import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    program: { type: String, trim: true, default: "" },
    /** Vínculo opcional con el usuario que autentica como STUDENT. */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
    },
    approvedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
