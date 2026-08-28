const express = require('express')
const { createUser,
    getUsers,
    getSingleUser,
    updateUser,  
    updateUserPartially,
    deleteUser
} = require('../controllers/userController')

const router = express.Router();

//Routes
router.post("/",createUser);
router.get("/",getUsers)
router.get("/:id",getSingleUser);
router.put("/:id",updateUser);
router.patch("/:id",updateUserPartially);
router.delete("/:id",deleteUser);


module.exports = router;
