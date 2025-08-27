import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { uniqueId } from "../utils/index.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  token: { type: String, default: () => uniqueId() },
  verified: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  // Check if the password is modified
  if (!this.isModified("password")) return next();

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
