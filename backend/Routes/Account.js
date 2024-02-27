const express=require("express")
const router=express.Router();
const {protect}=require('../MiddleWares/authMiddleWare');
const { getBalance, transferMoney, requestMoney, getNotification } = require("../Controllers/AccountController");

router.get('/balance',protect,getBalance);
router.post('/transfer',protect,transferMoney);
router.post('/request',protect,requestMoney)
router.get('/notifications',protect,getNotification)
module.exports=router;