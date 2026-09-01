const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Name is Required"],
      trim: true,
      minLength :[2, "Name must be at least 2 character"],
    },
    email: {
      type: String,
      required: [true,'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6,"Password must be atleast 6 characters"],
      select : false,
    },
    age: {
      type: Number,
      min: [1, "Age must be greater than 0"],
      max: [120, "Please provide a valid age"],
    },
    role:{
      type: String,
      role: ["user","admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User",userSchema);

module.exports = User;
