const express=require("express")
const router=express.Router();
const {protect}=require('../MiddleWares/authMiddleWare');
const { getBalance, transferMoney } = require("../Controllers/AccountController");

router.get('/balance',protect,getBalance);
router.post('/transfer',protect,transferMoney);
module.exports=router;