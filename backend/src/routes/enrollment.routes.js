import { Router } from "express";
import {
  listEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  validateEnrollment,
  confirmEnrollment,
  getMyEnrollment,
  saveMyEnrollment,
  validateMyEnrollment,
  confirmMyEnrollment,
} from "../controllers/enrollment.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", protect, authorizeRoles("STUDENT"), getMyEnrollment);
router.put("/me", protect, authorizeRoles("STUDENT"), saveMyEnrollment);
router.post(
  "/me/validate",
  protect,
  authorizeRoles("STUDENT"),
  validateMyEnrollment
);
router.post(
  "/me/confirm",
  protect,
  authorizeRoles("STUDENT"),
  confirmMyEnrollment
);

router.get("/", listEnrollments);
router.post("/validate", validateEnrollment);
router.get("/:id", getEnrollment);
router.post("/", createEnrollment);
router.put("/:id", updateEnrollment);
router.post("/:id/confirm", confirmEnrollment);
export default router;
