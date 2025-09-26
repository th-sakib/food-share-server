import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: {type: String, required: true, unique: true},
    // password: { type: String, required: true },
    role: { type: String, enum: ["user", "donor"], default: "user" },
    displayPicture: {type: String, default: "https://logodix.com/logo/1070482.jpg"},
  },
  { timestamps: true }
);

// Pre-save hook to hash password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// Method to compare password (for login)
// return bcrypt.compare(candidatePassword, this.password);
// userSchema.methods.comparePassword = async function (candidatePassword) {
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
