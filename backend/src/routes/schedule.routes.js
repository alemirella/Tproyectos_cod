import { Router } from "express";
import {
  generateSchedule,
  listSchedules,
  getSchedule,
  scheduleByStudent,
  scheduleByTeacher,
  scheduleByClassroom,
} from "../controllers/schedule.controller.js";

const router = Router();
router.post("/generate", generateSchedule);
router.get("/", listSchedules);
router.get("/student/:studentId", scheduleByStudent);
router.get("/teacher/:teacherId", scheduleByTeacher);
router.get("/classroom/:classroomId", scheduleByClassroom);
router.get("/:id", getSchedule);
export default router;
