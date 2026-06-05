import { Router } from "express";

import { AuthUserController } from "../controllers/user/AuthUserController";
import { ForgotPasswordController } from "../controllers/auth/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/auth/ResetPasswordController";

const authRoutes = Router();

/* =========================
   LOGIN
========================= */
authRoutes.post(
  "/session",
  new AuthUserController().handle
);

/* =========================
   FORGOT PASSWORD
========================= */
authRoutes.post(
  "/forgot-password",
  new ForgotPasswordController().handle
);

/* =========================
   RESET PASSWORD
========================= */
authRoutes.post(
  "/reset-password",
  new ResetPasswordController().handle
);

export default authRoutes;