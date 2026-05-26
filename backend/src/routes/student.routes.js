import { Router } from "express";
import {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  updateApprovedCourses,
  getMyStudent,
} from "../controllers/student.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", protect, authorizeRoles("STUDENT"), getMyStudent);

router.get("/", listStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.put("/:id/approved-courses", updateApprovedCourses);
export default router;
