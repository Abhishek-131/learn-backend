const bcrypt = require("bcryptjs");

const User = require("../models/Users");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");


// REGISTER
const register = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password) {
    throw new AppError(
      "Name, email and password are required",
      400
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    age,
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    },
  });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      "Email and password are required",
      400
    );
  }

  // Password has select:false,
  // so explicitly include it
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  // Compare entered password with hashed password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  // Generate JWT
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    },
  });
});

const getMe = asyncHandler(async (req,res)=>{
  res.status(200).json({
    success:true,
    data: req.user
  });
});


module.exports = {
  register,
  login,
  getMe,
};