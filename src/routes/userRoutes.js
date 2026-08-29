const express = require('express')
const { createUser,
    getUsers,
    getSingleUser,
    updateUser,  
    updateUserPartially,
    deleteUser,
    deleteAllUsers
} = require('../controllers/userController')

const router = express.Router();

//Routes
router.post("/",createUser);
router.get("/",getUsers)
router.get("/:id",getSingleUser);
router.put("/:id",updateUser);
router.patch("/:id",updateUserPartially);
router.delete("/:id",deleteUser);
router.delete("/",deleteAllUsers);


module.exports = router;
