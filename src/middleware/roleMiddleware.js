const AppError = require('../utils/AppError');

const authorize = (...allowedRole)=>{
    return (req, res, next)=>{
        if(!allowedRole.includes(req.user.role)){
            return next(
                new AppError(
                    "You are not authorized to access this resource",
                    403,
                )
            )
        }
        next();
    };
};


module.exports = authorize;