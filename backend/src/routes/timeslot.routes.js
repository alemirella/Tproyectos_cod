import { Router } from "express";
import {
  listTimeSlots,
  getTimeSlot,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../controllers/timeslot.controller.js";

const router = Router();
router.get("/", listTimeSlots);
router.get("/:id", getTimeSlot);
router.post("/", createTimeSlot);
router.put("/:id", updateTimeSlot);
router.delete("/:id", deleteTimeSlot);
export default router;
