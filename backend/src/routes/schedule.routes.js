import { Router } from "express";
import {
  generateSchedule,
  listSchedules,
  getSchedule,
  scheduleByStudent,
  scheduleByTeacher,
  scheduleByClassroom,
  myTeacherSchedule,
  myStudentSchedule,
} from "../controllers/schedule.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/me/teacher",
  protect,
  authorizeRoles("TEACHER"),
  myTeacherSchedule
);
router.get(
  "/me/student",
  protect,
  authorizeRoles("STUDENT"),
  myStudentSchedule
);

router.post("/generate", generateSchedule);
router.get("/", listSchedules);
router.get("/student/:studentId", scheduleByStudent);
router.get("/teacher/:teacherId", scheduleByTeacher);
router.get("/classroom/:classroomId", scheduleByClassroom);
router.get("/:id", getSchedule);
export default router;
