import Student from "../models/Student.js";
import User from "../models/User.js";
import { STUDENT_ENROLLMENT_STATUSES } from "../utils/constants.js";

function buildListQuery({ search, active, enrollmentStatus, program }) {
  const query = {};

  if (active === "true") query.active = true;
  else if (active === "false") query.active = false;

  if (
    enrollmentStatus &&
    enrollmentStatus !== "ALL" &&
    STUDENT_ENROLLMENT_STATUSES.includes(enrollmentStatus)
  ) {
    query.enrollmentStatus = enrollmentStatus;
  }

  if (program && program !== "ALL") {
    query.program = program;
  }

  if (search?.trim()) {
    const term = search.trim();
    query.$or = [
      { code: { $regex: term, $options: "i" } },
      { fullName: { $regex: term, $options: "i" } },
      { email: { $regex: term, $options: "i" } },
    ];
  }

  return query;
}

function normalizePayload(data) {
  const payload = { ...data };
  if (payload.code) payload.code = payload.code.trim().toUpperCase();
  if (payload.email) payload.email = payload.email.trim().toLowerCase();
  if (payload.fullName) payload.fullName = payload.fullName.trim();
  if (payload.program) payload.program = payload.program.trim();
  if (payload.approvedCourses) {
    payload.approvedCourses = payload.approvedCourses.filter(Boolean);
    // Si trae historial académico, ya no es un alumno nuevo (salvo override
    // explícito del admin). El módulo de matrícula podrá volver a setear
    // isNewStudent cuando corresponda.
    if (
      payload.approvedCourses.length > 0 &&
      payload.isNewStudent === undefined
    ) {
      payload.isNewStudent = false;
    }
  }
  return payload;
}

const populateOpts = {
  path: "approvedCourses",
  select: "code name credits classroomTypeRequired active",
};

export const studentService = {
  list: (params = {}) =>
    Student.find(buildListQuery(params))
      .populate(populateOpts)
      .sort({ code: 1 }),

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

  /** Eliminación lógica: desactiva el estudiante. */
  remove: (id) =>
    Student.findByIdAndUpdate(
      id,
      { active: false },
      { new: true, runValidators: true }
    ).populate(populateOpts),

  updateApprovedCourses: (id, approvedCourses) => {
    const list = (approvedCourses || []).filter(Boolean);
    const update = { approvedCourses: list };
    // Tener historial implica que el alumno ya cursó antes → no es nuevo.
    if (list.length > 0) update.isNewStudent = false;
    return Student.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).populate(populateOpts);
  },

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
