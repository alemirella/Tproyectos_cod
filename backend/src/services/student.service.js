import Student from "../models/Student.js";
import User from "../models/User.js";

function normalizePayload(data) {
  const payload = { ...data };
  if (payload.code) payload.code = payload.code.trim().toUpperCase();
  if (payload.email) payload.email = payload.email.trim().toLowerCase();
  if (payload.fullName) payload.fullName = payload.fullName.trim();
  return payload;
}

const populateOpts = {
  path: "approvedCourses",
  select: "code name credits classroomTypeRequired",
};

export const studentService = {
  list: () =>
    Student.find().populate(populateOpts).sort({ code: 1 }),

  getById: (id) => Student.findById(id).populate(populateOpts),

  create: async (data) => {
    const payload = normalizePayload(data);
    if (!payload.user && payload.email) {
      const linkedUser = await User.findOne({
        email: payload.email,
        role: "STUDENT",
      });
      if (linkedUser) payload.user = linkedUser._id;
    }
    const created = await Student.create(payload);
    return Student.findById(created._id).populate(populateOpts);
  },

  update: (id, data) =>
    Student.findByIdAndUpdate(id, normalizePayload(data), {
      new: true,
      runValidators: true,
    }).populate(populateOpts),

  remove: (id) => Student.findByIdAndDelete(id),

  updateApprovedCourses: (id, approvedCourses) =>
    Student.findByIdAndUpdate(
      id,
      { approvedCourses: (approvedCourses || []).filter(Boolean) },
      { new: true, runValidators: true }
    ).populate(populateOpts),

  /** Resuelve el perfil de alumno vinculado a un usuario autenticado. */
  getByUserId: async (userId) => {
    let student = await Student.findOne({ user: userId }).populate(populateOpts);
    if (student) return student;
    const userDoc = await User.findById(userId);
    if (!userDoc) return null;
    student = await Student.findOne({ email: userDoc.email }).populate(populateOpts);
    if (student && !student.user) {
      student.user = userId;
      await student.save();
    }
    return student;
  },
};
