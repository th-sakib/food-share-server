import { Router } from "express";
import { createFood } from "../controllers/food.controller.js";
import { verifyFirebaseToken } from "../utils/verifyToken.js";

const router = Router();

router.post("/donate",verifyFirebaseToken, createFood);

export default router

