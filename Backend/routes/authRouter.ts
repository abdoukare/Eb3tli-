import express from "express";
import AuthController from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMid.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.Login);
router.post("/logout",authMiddleware, AuthController.Logout);
router.get("/finduser/:id", authMiddleware, AuthController.findUser);

export default router;