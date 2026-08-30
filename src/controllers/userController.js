const User = require("../models/Users");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
        throw new AppError("Name, Email and Password are required", 400);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already Exist", 409);
    }
    const user = await User.create({
        name,
        email,
        password,
        age,
    });
    const safeUser = await User.findById(user._id);
    res.status(201).json({
        success: true,
        message: "User create successfully",
        data: safeUser,
    });
});

//GET ALL USERS
const getUsers = asyncHandler(async (req, res) => {
    const {search, role, sort ="-createdAt", page=1, limit=10} = req.query;
    const filter = {};
    //seach
    if(search){
        filter.$or =[
           {name: { $regex: search, $options: "i"}},
           {email : {$regex: search, $options: "i"}},
        ];
    }
    //filter
    if(role){
        filter.role = role;
    }

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.min(
    Math.max(Number(limit), 1),
    100
  );

  const skip = (pageNumber - 1) * limitNumber;

  const [users, totalUsers] = await Promise.all([
    User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber),

    User.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(
    totalUsers / limitNumber
  );

  res.status(200).json({
    success: true,

    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalUsers,
      limit: limitNumber,
    },

    data: users,
  });
});

// Get User By Id
const getSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});

//UPDATE USER - PUT
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "User update successfully...",
        data: user,
    });
});

//UPDATE USER - PATCH
const updateUserPartially = asyncHandler(async (req, res) => {
    const allowedField = ["name","email","age"];
    const updates = {};
    
    allowedField.forEach((field)=>{
        if(req.body[field] !== undefined){
            updates[field] = req.body[field];
        }
    });
    const user = await User.findByIdAndUpdate(
        req.params.id,
        updates,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).json({
        success: true,
        message: "User update successfully...",
        data: user,
    });
});

//delete User
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).json({
        success: true,
        message: "User delete successfully...",
    });
});

const deleteAllUsers = asyncHandler(async (req,res)=>{
    const deleteAll = await User.deleteMany({});
    res.status(200).json({
        success: true,
        message:"All User deleted Successfully",
        deleteCount: deleteAll.deleteCount,
    })
})

module.exports = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    updateUserPartially,
    deleteUser,
    deleteAllUsers
};
