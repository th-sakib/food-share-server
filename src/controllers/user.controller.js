import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.firebaseUser.uid });
  res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const { uid, email, } = req.firebaseUser;
  const { name, role } = req.body;

  let user = await User.findOne({ uid });
  if (!user) {
    user = await User.create({
      uid,
      email,
      name,
      role, // default role
    });
  }

  res.json(user);
});

export { getProfile, createUser };
