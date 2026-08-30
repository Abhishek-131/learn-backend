const express = require('express');

const {register, login, getMe} = require('../controllers/authController');
const protectedRoute = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register",register);
router.post('/login',login);
router.get('/me',protectedRoute,getMe);

module.exports = router;