const mongoose=require('mongoose')

const requestSchema=new mongoose.Schema({
    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true
    },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
})

const Request=mongoose.model('Request',requestSchema);

module.exports={Request};