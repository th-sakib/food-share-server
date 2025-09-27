import { asyncHandler } from "../utils/asyncHandler.js";
import Food from "../models/food.model.js";
import User from "../models/user.model.js";

const createFood = asyncHandler(async (req, res) => {
  const { uid } = req.firebaseUser; // Firebase UID
  const {
    foodName,
    foodDescription,
    expiryDate,
    expiryTime,
    location,
    imageUrl,
  } = req.body;

  // Find the MongoDB user by uid
  const user = await User.findOne({ uid });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Create food donation
  const food = await Food.create({
    foodName,
    foodDescription,
    expiryDate,
    expiryTime,
    location,
    image: imageUrl, // Cloudinary URL
    donatedBy: user._id, // ✅ use MongoDB _id
  });

  res.status(201).json(food);
});

const getFood = asyncHandler(async (req, res) => {
  const foods = await Food.find({}).sort({ createdAt: -1 }); // newest first
  res.status(200).json(foods);
});

const getDonatedFoods = asyncHandler(async (req, res) => {
  const { uid } = req.firebaseUser; // Firebase UID

  // Find the MongoDB user by uid
  const donor = await User.findOne({ uid });
  if (!donor) {
    return res.status(404).json({ message: "Donor not found" });
  }

  // Fetch all foods donated by this user
  const foods = await Food.find({ donatedBy: donor._id }).sort({
    createdAt: -1,
  });

  res.status(200).json(foods);
});

// router.get("/:foodId", verifyFirebaseToken, getFromAllFood);
const getFromAllFood = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const food = await Food.findById(foodId);
  console.log(food);

  if (!food) {
    return res.status(400).json({ message: "food not found" });
  }

  res.status(200).json(food);
});

export { createFood, getFood, getDonatedFoods, getFromAllFood };
