import { Router } from "express";
import {
  listTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateAvailability,
  updateTeacherCourses,
} from "../controllers/teacher.controller.js";

const router = Router();
router.get("/", listTeachers);
router.get("/:id", getTeacher);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.put("/:id/availability", updateAvailability);
router.put("/:id/courses", updateTeacherCourses);
export default router;
