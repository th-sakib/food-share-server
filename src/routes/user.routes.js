import { Router } from "express";
import { createUser, getProfile } from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../utils/verifyToken.js";

const router = Router();

// base : /api/user
router.get("/me", verifyFirebaseToken, getProfile);
router.post("/create", verifyFirebaseToken, createUser);

export default router
