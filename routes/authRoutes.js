import express from "express";
import {
  register,
  verifyAccount,
  login,
  forgotPassword,
  validateResetToken,
  updatePassword,
  user,
  admin,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication routes and register user
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router
  .route("/forgot-password/:token")
  .get(validateResetToken)
  .post(updatePassword);

// Private area - Requires JWT
router.get("/user", authMiddleware, user);
router.get("/admin", authMiddleware, admin);

export default router;
