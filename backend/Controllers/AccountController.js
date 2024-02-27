const { default: mongoose } = require('mongoose');
const {Account}=require('../Models/AccountModel')
const {Request}=require('../Models/Request')
const getBalance = async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
      })
    
      if (account === null) {
        res.status(404).json({
          message: 'Account not found',
          userId: req.userId,
        })
        return
      }
    
      res.status(200).json({
        balance: account.balance,
      })
};


const getNotification=async(req,res)=>{
    const getNotification=await Request.findOne({
        userId:req.recipient,
    })
    if(getNotification===null){
        res.status(404).json({
            message:"no notification found",
            userId:req.userId
        })
        return 
    }
    res.status(200).json({
        message:'available notification',
        amount:getNotification.amount
    })
}
const requestMoney=async(req,res)=>{
    try {
        const{amount,to,requesterUserId}=req.body;
   
        const newRequest=new Request({
            requester:requesterUserId,
            recipient:to,
            amount,
            status:'pending'
        });
        newRequest.save();
        res.status(201).json({
            message:"Request sent succesfully"
        })
        
    } catch (error) {
        console.log('error creating request',error);
        res.status(500).json({
            message:"internal server error"
        })
    }
}




const transferMoney = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // After successful transaction
        await session.commitTransaction();

        // Response after the transaction is committed
        res.status(200).json({
            message: "Transaction successful"
        });
    } catch (error) {
        console.error(error);
        // Handle any errors that occur during the transaction
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // End the session after handling the transaction
        session.endSession();
    }
};

module.exports={getBalance,transferMoney,requestMoney,getNotification}