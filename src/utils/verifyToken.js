import admin from "firebase-admin";
import User from "../models/user.model.js";

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).send("Unauthorized");

  const token = authHeader.split(" ")[1];
  console.log(token)

  try {
    console.log("inside try")
    const decoded = await admin.auth().verifyIdToken(token);
    console.log(decoded)
    req.firebaseUser = decoded; // contains uid, email, etc.
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).send("Invalid token");
  }
};

export { verifyFirebaseToken };
