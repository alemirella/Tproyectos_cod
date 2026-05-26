import { Router } from "express";
import {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  updateApprovedCourses,
} from "../controllers/student.controller.js";

const router = Router();
router.get("/", listStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.put("/:id/approved-courses", updateApprovedCourses);
export default router;
