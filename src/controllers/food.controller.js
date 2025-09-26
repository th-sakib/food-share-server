import { asyncHandler } from "../utils/asyncHandler.js";
import Food from "../models/food.model.js";
import User from "../models/user.model.js";

const createFood = asyncHandler(async (req, res) => {
  const { uid } = req.firebaseUser; // Firebase UID
  const { foodName, foodDescription, expiryDate, expiryTime, location, imageUrl } = req.body;

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

export { createFood };
