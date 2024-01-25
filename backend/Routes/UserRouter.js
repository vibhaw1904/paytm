const express=require('express');
const { registerUser, signInUser, updateUser, getUser } = require('../Controllers/UserController');
const { protect } = require('../MiddleWares/authMiddleWare');
const router=express.Router();

router.post('/signup',registerUser);
router.post('/signin',signInUser);
router.put('/update',protect,updateUser);
router.get('/bulk',getUser);
module.exports=router