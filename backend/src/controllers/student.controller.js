import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, fail } from "../utils/apiResponse.js";
import { studentService } from "../services/student.service.js";

export const listStudents = asyncHandler(async (_req, res) =>
  ok(res, await studentService.list())
);
export const getStudent = asyncHandler(async (req, res) => {
  const item = await studentService.getById(req.params.id);
  if (!item) return fail(res, "Estudiante no encontrado", 404);
  ok(res, item);
});
export const createStudent = asyncHandler(async (req, res) =>
  ok(res, await studentService.create(req.body), 201)
);
export const updateStudent = asyncHandler(async (req, res) => {
  const item = await studentService.update(req.params.id, req.body);
  if (!item) return fail(res, "Estudiante no encontrado", 404);
  ok(res, item);
});
export const deleteStudent = asyncHandler(async (req, res) => {
  const item = await studentService.remove(req.params.id);
  if (!item) return fail(res, "Estudiante no encontrado", 404);
  ok(res, { deleted: true });
});
export const updateApprovedCourses = asyncHandler(async (req, res) => {
  const item = await studentService.updateApprovedCourses(
    req.params.id,
    req.body.approvedCourses || []
  );
  if (!item) return fail(res, "Estudiante no encontrado", 404);
  ok(res, item);
});
