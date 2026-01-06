import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required : true
    },
    bankid:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }
})

const AccountScema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    balance :{
        type: Number,
        default:5000
    }
})

export const User = mongoose.model("user",userschema)
export const Account = mongoose.model("accounts",AccountScema)


