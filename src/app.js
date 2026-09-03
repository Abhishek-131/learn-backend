const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoute');
const errorHandler = require('./middleware/errorMiddleware')

const app = express();

//security headers
app.use(helmet());

//Middleware
app.use(cors({
        origin:process.env.FRONTEND_URL,
        methods:['GET','POST','PUT','PATCH','DELETE'],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Limit JSON payload size
app.use(express.json({limit:"10kb"}));

//Serve Upload file
app.use(
    "/uploads",
    express.static(path.join(__dirname,"../uploads"))
);

//Gloabal API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    standardHeaders : true,
    legacyHeaders :false,
    message:{
        success:false,
        message:'Too many requests. Please try again later.'
    }
});

//Test Routes
app.get("/",(req,res)=>{
    res.json({
        success: true,
        message: "Backend API is running..."
    });
});

app.use('/api',apiLimiter);

//user-routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

//404  routes
app.use((req,res,next)=>{
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

//Error Middleware
app.use(errorHandler);

module.exports = app;
