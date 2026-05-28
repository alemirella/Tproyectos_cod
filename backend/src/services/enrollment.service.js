import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import { MAX_CREDITS, MIN_CREDITS } from "../utils/constants.js";

function buildListQuery({
  status,
  student,
  minCredits,
  maxCredits,
} = {}) {
  const query = {};
  if (student) query.student = student;
  if (status && status !== "ALL") query.status = status;
  const credits = {};
  if (minCredits !== undefined && minCredits !== "") {
    credits.$gte = Number(minCredits);
  }
  if (maxCredits !== undefined && maxCredits !== "") {
    credits.$lte = Number(maxCredits);
  }
  if (Object.keys(credits).length) query.totalCredits = credits;
  return query;
}

function buildValidationResults({
  messages,
  totalCredits,
  courseIds = [],
  courses = [],
}) {
  const hasMessage = (snippet) =>
    messages.some((m) => String(m).toLowerCase().includes(snippet.toLowerCase()));
  return {
    prerequisitesValid: !hasMessage("prerrequisito"),
    creditsValid: totalCredits >= MIN_CREDITS && totalCredits <= MAX_CREDITS,
    coursesAvailable: !hasMessage("no existen"),
    duplicatedCourses: new Set(courseIds.map(String)).size !== courseIds.length,
    alreadyApprovedCourses: hasMessage("ya aprobó"),
    coursesCount: courses.length,
  };
}

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

  // Si es estudiante nuevo (primera matrícula), no se validan prerrequisitos
  // ni se restringen los créditos previos. Ver Student.isNewStudent.
  const skipPrereqs = student.isNewStudent === true;

  for (const course of courses) {
    if (approvedSet.has(String(course._id))) {
      messages.push(`Ya aprobó el curso ${course.code}`);
    }
    if (skipPrereqs) continue;
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
    if (skipPrereqs) {
      messages.push(
        "Estudiante nuevo: prerrequisitos omitidos en la primera matrícula"
      );
    }
  }

  return {
    valid: status === "VALID",
    status,
    messages,
    totalCredits,
    student,
    courses,
    validationResults: buildValidationResults({
      messages,
      totalCredits,
      courseIds,
      courses,
    }),
  };
}

export const enrollmentService = {
  list: async (params = {}) => {
    const query = buildListQuery(params);
    let docs = await Enrollment.find(query)
      .populate("student")
      .populate({ path: "courses", populate: { path: "prerequisites", select: "code name" } })
      .sort({ updatedAt: -1 });
    if (params.search?.trim()) {
      docs = docs.filter((doc) => {
        const term = params.search?.trim()?.toLowerCase();
        if (!term) return true;
        const st = doc.student;
        return (
          (st?.fullName || "").toLowerCase().includes(term) ||
          (st?.code || "").toLowerCase().includes(term) ||
          (st?.email || "").toLowerCase().includes(term)
        );
      });
    }
    return docs;
  },

  getById: (id) =>
    Enrollment.findById(id)
      .populate("student")
      .populate({ path: "courses", populate: { path: "prerequisites", select: "code name" } }),

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
      existing.validationResults = validation.validationResults;
      existing.validationMessages = validation.messages;
      await existing.save();
      return existing;
    }

    return Enrollment.create({
      student: studentId,
      courses: courseIds,
      totalCredits: validation.totalCredits,
      status: validation.status,
      validationResults: validation.validationResults,
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
      validationResults: validation.validationResults,
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
    enrollment.validationResults = validation.validationResults;
    enrollment.validationMessages = validation.messages;
    await enrollment.save();
    return enrollment;
  },

  validate: validateEnrollmentPayload,

  validateAndUpdate: async (id) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    const validation = await validateEnrollmentPayload({
      studentId: enrollment.student,
      courseIds: enrollment.courses.map(String),
    });
    enrollment.totalCredits = validation.totalCredits;
    enrollment.validationResults = validation.validationResults;
    enrollment.validationMessages = validation.messages;
    if (validation.valid) {
      enrollment.status = "VALIDATED";
    } else if (
      validation.messages.some((m) =>
        String(m).toLowerCase().includes("supera el máximo")
      )
    ) {
      enrollment.status = "REJECTED";
    } else {
      enrollment.status = "OBSERVED";
    }
    await enrollment.save();
    return enrollment;
  },

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
    enrollment.totalCredits = validation.totalCredits;
    enrollment.validationResults = validation.validationResults;
    enrollment.validationMessages = validation.messages;
    await enrollment.save();
    return enrollment;
  },

  reject: async (id, reason) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    enrollment.status = "REJECTED";
    if (reason?.trim()) {
      enrollment.validationMessages = [
        ...(enrollment.validationMessages || []),
        `Rechazada por administración: ${reason.trim()}`,
      ];
    }
    await enrollment.save();
    return enrollment;
  },

  observe: async (id, note) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return null;
    enrollment.status = "OBSERVED";
    if (note?.trim()) {
      enrollment.validationMessages = [
        ...(enrollment.validationMessages || []),
        `Observación administrativa: ${note.trim()}`,
      ];
    }
    await enrollment.save();
    return enrollment;
  },
};
