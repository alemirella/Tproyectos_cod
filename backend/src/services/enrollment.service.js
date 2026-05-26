import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import { MAX_CREDITS, MIN_CREDITS } from "../utils/constants.js";

export async function validateEnrollmentPayload({ studentId, courseIds }) {
  const messages = [];
  const student = await Student.findById(studentId).populate("approvedCourses");
  if (!student) {
    return { valid: false, status: "INVALID", messages: ["Estudiante no encontrado"], totalCredits: 0 };
  }

  const uniqueIds = [...new Set(courseIds.map(String))];
  if (uniqueIds.length !== courseIds.length) {
    messages.push("No puede seleccionar cursos repetidos");
  }

  const courses = await Course.find({ _id: { $in: uniqueIds }, active: true });
  if (courses.length !== uniqueIds.length) {
    messages.push("Uno o más cursos no existen o están inactivos");
  }

  const approvedSet = new Set(student.approvedCourses.map((c) => String(c._id)));

  for (const course of courses) {
    if (approvedSet.has(String(course._id))) {
      messages.push(`Ya aprobó el curso ${course.code}`);
    }
    for (const pre of course.prerequisites || []) {
      if (!approvedSet.has(String(pre))) {
        const preCourse = await Course.findById(pre);
        messages.push(
          `No cumple prerrequisito: ${preCourse?.code || pre} para ${course.code}`
        );
      }
    }
  }

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  if (totalCredits > MAX_CREDITS) {
    messages.push(`Supera el máximo de ${MAX_CREDITS} créditos`);
  } else if (totalCredits < MIN_CREDITS) {
    messages.push(`Créditos insuficientes (mínimo ${MIN_CREDITS})`);
  }

  const hasHardErrors = messages.some(
    (m) =>
      m.includes("prerrequisito") ||
      m.includes("repetidos") ||
      m.includes("no existen") ||
      m.includes("aprobó") ||
      m.includes("Supera")
  );

  let status = "VALID";
  if (hasHardErrors) status = "INVALID";
  else if (totalCredits < MIN_CREDITS) status = "INVALID";
  else if (messages.length) status = "INVALID";

  if (status === "VALID" && totalCredits >= MIN_CREDITS && totalCredits <= MAX_CREDITS) {
    messages.push("Matrícula válida");
  }

  return {
    valid: status === "VALID",
    status,
    messages,
    totalCredits,
    student,
    courses,
  };
}

export const enrollmentService = {
  list: () =>
    Enrollment.find()
      .populate("student")
      .populate("courses")
      .sort({ createdAt: -1 }),

  getById: (id) =>
    Enrollment.findById(id).populate("student").populate("courses"),

  /** Última matrícula del estudiante. */
  getLatestByStudent: (studentId) =>
    Enrollment.findOne({ student: studentId })
      .populate("courses")
      .sort({ createdAt: -1 }),

  upsertDraft: async ({ studentId, courseIds }) => {
    const validation = await validateEnrollmentPayload({ studentId, courseIds });
    const existing = await Enrollment.findOne({ student: studentId }).sort({
      createdAt: -1,
    });

    if (existing && existing.status !== "CONFIRMED") {
      existing.courses = courseIds;
      existing.totalCredits = validation.totalCredits;
      existing.status = validation.status;
      existing.validationMessages = validation.messages;
      await existing.save();
      return existing;
    }

    return Enrollment.create({
      student: studentId,
      courses: courseIds,
      totalCredits: validation.totalCredits,
      status: validation.status,
      validationMessages: validation.messages,
    });
  },

  create: async ({ studentId, courseIds }) => {
    const validation = await validateEnrollmentPayload({ studentId, courseIds });
    return Enrollment.create({
      student: studentId,
      courses: courseIds,
      totalCredits: validation.totalCredits,
      status: validation.status,
      validationMessages: validation.messages,
    });
  },

  update: async (id, { courseIds }) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    const validation = await validateEnrollmentPayload({
      studentId: enrollment.student,
      courseIds,
    });
    enrollment.courses = courseIds;
    enrollment.totalCredits = validation.totalCredits;
    enrollment.status = validation.status;
    enrollment.validationMessages = validation.messages;
    await enrollment.save();
    return enrollment;
  },

  validate: validateEnrollmentPayload,

  confirm: async (id) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    const validation = await validateEnrollmentPayload({
      studentId: enrollment.student,
      courseIds: enrollment.courses,
    });
    if (!validation.valid) {
      const err = new Error("No se puede confirmar la matrícula");
      err.status = 400;
      err.details = validation.messages;
      throw err;
    }
    enrollment.status = "CONFIRMED";
    enrollment.validationMessages = validation.messages;
    await enrollment.save();
    return enrollment;
  },
};
