import { Router } from "express";
import {
  createFood,
  getDonatedFoods,
  getFood,
  getFromAllFood,
} from "../controllers/food.controller.js";
import { verifyFirebaseToken } from "../utils/verifyToken.js";
import {
    getAllFoodRequests,
  getFoodRequests,
  requestFood,
  updateStatus,
} from "../controllers/foodRequest.controller.js";

const router = Router();

// base: /api/food
router.post("/donate", verifyFirebaseToken, createFood);
// get all food
router.get("/donations", getFood);

router.post("/request/:foodId", verifyFirebaseToken, requestFood);

// get donated foods according to the user (must come before /:foodId)
router.get("/donated-foods", verifyFirebaseToken, getDonatedFoods);

// /api/food/:foodId/request
router.get("/:foodId/request", verifyFirebaseToken, getFoodRequests);
// /api/food/:foodId
router.get("/:foodId", verifyFirebaseToken, getFromAllFood);

// PATCH /food/request/:requestId/status
router.patch("/request/:requestId/status", verifyFirebaseToken, updateStatus);
    // const res = await api.get("/food/requests/my-requests");
router.get("/requests/my-requests", verifyFirebaseToken, getAllFoodRequests);

export default router;
