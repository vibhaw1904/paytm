const zod=require('zod');
const {User}=require('../Models/UserModel');
const jwt=require('jsonwebtoken');
// const JWT_SECRET=process.env.JWT_SECRET
const { Account } = require('../Models/AccountModel');
// console.log(JWT_SECRET)
const signupBody=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
const registerUser=(async(req,res)=>{
  
    
    const {success}=signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Email already exist /Incorrect email"
        })
    }
    const existingUser=await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already taken/Incorrect input"
        })
    }
    const user=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    })
    const userId=user._id;
    Account.create({
        userId,
        balance:1+Math.random()*10000
    })

    const token =jwt.sign({
        userId
    },process.env.JWT_SECRET);



    res.status(201).json({
        username:user.username,
        _id:userId,
        message:"User created Succesfully",
        token:token
    })
})

const signInBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

const signInUser=(async(req,res)=>{
   
    const {success}=signInBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect credentials"
        })
    }
    const user =await User.findOne({
        username:req.body.username,
        password:req.body.password,
    })
    if(user){
        const token =jwt.sign({
            firstName:user.firstName,
            userId:user._id
        },process.env.JWT_SECRET)
        res.json({
            firstName:user.firstName,
            _id:user.id,
            message:"suucessfully logedIn",
            token:token
        })
        return;
    }
    res.status(411).json({
        message:"Error while Logging in"
    })
})

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

const updateUser=(async(req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }
    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message:"Upadted succesfully"
    })
})

const getUser=(async(req,res)=>{
  const filter=req.query.filter || "";

  const users=await User.find({
    $or:[{
        firstName:{
            "$regex":filter
        }
    },{
        lastName:{
            "$regex":filter
        }
    }]
  })
  res.json({
    user:users.map(user=>({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
    }))
  })
})

module.exports={registerUser,signInUser,updateUser,getUser}
