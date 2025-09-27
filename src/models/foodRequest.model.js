import mongoose, { Schema } from "mongoose";

const foodRequestSchema = new Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FoodRequest =
  mongoose.models.FoodRequest ||
  mongoose.model("FoodRequest", foodRequestSchema);

export default FoodRequest;
