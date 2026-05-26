import { Router } from "express";
import {
  listEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  validateEnrollment,
  confirmEnrollment,
} from "../controllers/enrollment.controller.js";

const router = Router();
router.get("/", listEnrollments);
router.post("/validate", validateEnrollment);
router.get("/:id", getEnrollment);
router.post("/", createEnrollment);
router.put("/:id", updateEnrollment);
router.post("/:id/confirm", confirmEnrollment);
export default router;
