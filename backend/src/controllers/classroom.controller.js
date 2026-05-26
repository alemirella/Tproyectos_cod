import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, fail } from "../utils/apiResponse.js";
import { classroomService } from "../services/classroom.service.js";

export const listClassrooms = asyncHandler(async (_req, res) =>
  ok(res, await classroomService.list())
);
export const getClassroom = asyncHandler(async (req, res) => {
  const item = await classroomService.getById(req.params.id);
  if (!item) return fail(res, "Aula no encontrada", 404);
  ok(res, item);
});
export const createClassroom = asyncHandler(async (req, res) =>
  ok(res, await classroomService.create(req.body), 201)
);
export const updateClassroom = asyncHandler(async (req, res) => {
  const item = await classroomService.update(req.params.id, req.body);
  if (!item) return fail(res, "Aula no encontrada", 404);
  ok(res, item);
});
export const deleteClassroom = asyncHandler(async (req, res) => {
  const item = await classroomService.remove(req.params.id);
  if (!item) return fail(res, "Aula no encontrada", 404);
  ok(res, { deleted: true });
});
