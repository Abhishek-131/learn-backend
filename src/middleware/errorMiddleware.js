const errorHandler = (err, req, res)=>{
        
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server Error";

    //Invalid Mongoose ObjectId
    if(err.name === "CastError"){
        statusCode = 400;
        message = "Invalid resource ID";
    }

    //Mongoose Validation error
    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors)
        .map((error)=> error.message)
        .join(", ");
    }

    //Duplicate Field
    if(err.code === 11000){
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exist`;
    }
    res.status(statusCode).json({
        success:false,
        message,
    });
};


module.exports = errorHandler;