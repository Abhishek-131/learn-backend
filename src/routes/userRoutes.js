const express = require('express')
const { createUser,
    getUsers,
    getSingleUser,
    updateUser,  
    updateUserPartially,
    deleteUser,
    deleteAllUsers,
    uploadProfileImage
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

//Routes
router.post("/",createUser);
router.get("/",getUsers)
router.get("/:id",getSingleUser);
router.put("/:id",updateUser);
router.patch("/:id",updateUserPartially);
router.delete("/:id",deleteUser);
//only admin can delete all users
router.delete("/",protect,authorize("admin"), deleteAllUsers);
//upload image-profile
router.post("/profile-image", protect, upload.single("image"), uploadProfileImage);


module.exports = router;
