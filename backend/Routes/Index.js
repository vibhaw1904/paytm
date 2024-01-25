const express=require('express')
const router=express.Router();
const UserRouter=require('./UserRouter')
const AccountRouter=require('./Account')
router.use('/user',UserRouter);
router.use('/account',AccountRouter);
module.exports=router