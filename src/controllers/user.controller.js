import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.firebaseUser.uid });
  res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const { uid, email, name, picture} = req.firebaseUser;
  const { role } = req.body || {};

  let user = await User.findOne({ uid });
  if (!user) {
    user = await User.create({
      name: name || req.body.name,
      displayPicture: picture || "https://logodix.com/logo/1070482.jpg",
      email,
      uid,
      role: role || "user",
    });
  }

  res.status(201).json(user);
});

export { getProfile, createUser };
