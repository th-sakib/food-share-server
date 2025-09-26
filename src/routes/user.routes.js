import { Router } from "express";
import { createUser, getProfile } from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../utils/verifyToken.js";

const router = Router();

router.get("/me", verifyFirebaseToken, getProfile);
router.post("/create", verifyFirebaseToken, createUser);

export default router
