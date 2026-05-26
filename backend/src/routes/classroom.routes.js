import { Router } from "express";
import {
  listClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} from "../controllers/classroom.controller.js";

const router = Router();
router.get("/", listClassrooms);
router.get("/:id", getClassroom);
router.post("/", createClassroom);
router.put("/:id", updateClassroom);
router.delete("/:id", deleteClassroom);
export default router;
