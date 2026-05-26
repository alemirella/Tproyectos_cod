import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, fail } from "../utils/apiResponse.js";
import { timeslotService } from "../services/timeslot.service.js";

export const listTimeSlots = asyncHandler(async (_req, res) =>
  ok(res, await timeslotService.list())
);
export const getTimeSlot = asyncHandler(async (req, res) => {
  const item = await timeslotService.getById(req.params.id);
  if (!item) return fail(res, "Franja no encontrada", 404);
  ok(res, item);
});
export const createTimeSlot = asyncHandler(async (req, res) =>
  ok(res, await timeslotService.create(req.body), 201)
);
export const updateTimeSlot = asyncHandler(async (req, res) => {
  const item = await timeslotService.update(req.params.id, req.body);
  if (!item) return fail(res, "Franja no encontrada", 404);
  ok(res, item);
});
export const deleteTimeSlot = asyncHandler(async (req, res) =>
  ok(res, { deleted: !!(await timeslotService.remove(req.params.id)) })
);
