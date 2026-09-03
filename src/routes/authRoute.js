const express = require('express');
const rateLimit = require('express-rate-limit');

const {register, login, getMe} = require('../controllers/authController');
const protectedRoute = require('../middleware/authMiddleware');

const router = express.Router();
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 60,
    limit : 5,
    standardHeaders : true,
    legacyHeaders : false,
    message:{
        success:false,
        message: "Too many login attempts. Please try again later."
    },
});

router.post("/register",register);
router.post('/login',loginLimiter,login);
router.get('/me',protectedRoute,getMe);

module.exports = router;