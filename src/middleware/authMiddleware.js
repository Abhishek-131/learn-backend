const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const protect = asyncHandler(async(req, res, next)=>{
    let token;
    const authHeader = req.headers.authorization;
    if( authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        throw new AppError(
            "Not Authorized, token missing",
            401
        );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId);

    if(!user){
        throw new AppError(
            "User associate with this token no longer exists",
            401
        );
    }

    req.user = user;

    next();
});


module.exports = protect;