const { default: mongoose } = require('mongoose');
const {Account}=require('../Models/AccountModel')
const {Request}=require('../Models/Request')
const jwt = require('jsonwebtoken'); 
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


const getNotification = async (req, res) => {
    try {
        // Assuming the recipient's ID is stored in a token and extracted as 'userId'
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const recipientId = decodedToken.userId;
        console.log(recipientId)
        // Find all notifications where the logged-in user is the recipient
        const notifications = await Request.find({
            recipient: recipientId,
            status: 'pending' // Assuming you want to find pending requests
        }).lean(); // Use lean() for faster execution if you don't need mongoose document features

        if (!notifications.length) {
            res.status(404).json({
                message: "No notifications found"
            });
        } else {
            res.status(200).json(notifications); // Send back the array of notifications as is
        }
    } catch (error) {
        console.log('Error getting notifications:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const requestMoney = async (req, res) => {
    try {
        const { amount, to } = req.body;
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        const requesterUserId = decodedToken.userId; 
        const requesterUsername=decodedToken.firstName;
        // console.log(requesterUsername)
        // console.log(requesterUserId)
        const newRequest = new Request({
            requesterName:requesterUsername,
            requester: requesterUserId,
            recipient: to,
            amount,
            status: 'pending'
        });
        await newRequest.save(); 
        res.status(201).json({
            requesterUsername,
            message: "Request sent successfully"
        });

    } catch (error) {
        console.log('error creating request', error);
        res.status(500).json({
            message: "internal server error"
        });
    }
};




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