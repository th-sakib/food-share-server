import Food from "../models/food.model.js";
import FoodRequest from "../models/foodRequest.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Request a food
const requestFood = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const { uid } = req.firebaseUser; // Firebase UID

  // Find the MongoDB user by uid
  const user = await User.findOne({ uid });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if food exists
  const food = await Food.findById(foodId);
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  // Prevent duplicate requests
  const existingRequest = await FoodRequest.findOne({
    food: foodId,
    requestedBy: user._id,
  });
  if (existingRequest) {
    return res
      .status(400)
      .json({ message: "You have already requested this food" });
  }

  const request = await FoodRequest.create({
    food: foodId,
    requestedBy: user._id,
  });

  res.status(201).json(request);
});

// ✅ Get all requests for a specific food
const getFoodRequests = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  // Check if food exists
  const food = await Food.findById(foodId);
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  // Fetch all requests for this food with user info
  const requests = await FoodRequest.find({ food: foodId })
    .populate("requestedBy", "name email role") // get requester info
    .select("status createdAt updatedAt");

  res.status(200).json({
    food: {
      id: food._id,
      name: food.foodName,
      description: food.foodDescription,
      image: food.image,
    },
    requests,
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  /*
   *     const res = await api.patch(`/food/request/${requestId}/status`, {
   * */
  const { requestId } = req.params;
  const { status } = req.body;
  console.log(requestId, status)

  // Validate status
  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // Find and update
  const request = await FoodRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }, // return updated document
  ).populate("food requestedBy");

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  res.status(200).json({
    message: "Request status updated successfully",
    request,
  });
});

    // const res = await api.get("/food/requests/my-requests");
const getAllFoodRequests = asyncHandler(async (req, res) => {
  const { uid } = req.firebaseUser; // Firebase UID

  // Find the MongoDB user by uid
  const user = await User.findOne({ uid });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Fetch all requests made by this user with food info
  const requests = await FoodRequest.find({ requestedBy: user._id })
    .populate("food", "foodName foodDescription image location expiryDate expiryTime")
    .select("status createdAt updatedAt");

  res.status(200).json(requests);
})

export { requestFood, getFoodRequests, updateStatus, getAllFoodRequests };
