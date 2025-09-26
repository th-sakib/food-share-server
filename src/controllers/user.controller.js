import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.firebaseUser.uid });
  res.status(200).json(user);
});
/**
  name: '',
  picture: '',
  iss: 'https://securetoken.google.com/food-share-ae7cf',
  aud: 'food-share-ae7cf',
  auth_time: 1758750517,
  user_id: 'SqM8YqbaisdWQB3r1JjEnA28JqC2',
  sub: 'SqM8YqbaisdWQB3r1JjEnA28JqC2',
  iat: 1758900768,
  exp: 1758904368,
  email: 'thsakibus@gmail.com',
  email_verified: true,
  firebase: {
    identities: { 'google.com': [Array], email: [Array] },
    sign_in_provider: 'google.com'
  },
  uid: 'SqM8YqbaisdWQB3r1JjEnA28JqC2'
}
  **/
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
