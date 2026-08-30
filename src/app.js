const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoute');
const errorHandler = require('./middleware/errorMiddleware')

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Test Routes
app.get("/",(req,res)=>{
    res.json({
        success: true,
        message: "Backend API is running..."
    });
});

//user-routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

//404  routes
app.use((req,res)=>{
    rse.status(404).json({
        success:false,
        message:"404 NOT FOUND...",
    });
});

//Error Middleware
app.use(errorHandler);

module.exports = app;
