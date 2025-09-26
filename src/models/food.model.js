import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema(
  {
    foodName: { type: String, required: true },
    foodDescription: { type: String, required: true },
    expiryDate: { type: String, required: true }, // one Date field is enough
    expiryTime: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    donatedBy: { type: Schema.Types.ObjectId, ref: "User" }, // optional: link donor
  },
  { timestamps: true }
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;
