import type { Request,Response } from "express"
import jsonwebtoken from "jsonwebtoken"
import { jwt_screat, salt } from "../Secreat.js"
import { Account, User } from "../model/models.js"

export const handleGetBalance = async (req : Request,res : Response)=>{
    const token = req.cookies.auth
    const data : any = jsonwebtoken.verify(token,jwt_screat)
    const username = data.username
    console.log(username)
    const user = await User.findOne({
        username
    })
    if(!user){
        return res.json({
            msg : "You are not authoised"
        })
    }
    const account = await Account.findOne({
        _id : user.bankid
    })
    return res.json({
        msg : "the account balance" + account?.balance
    })

}

interface Body{
    amount : number,
    reciver:string
}
export const handleTransaction = async (req : Request,res : Response) =>{
    // we will recive two things 
    // sender name , send the amount 
    const body = req.body as Body
    const Reciver = body.reciver
    const amount = body.amount
    let Sendername : any = jsonwebtoken.verify(req.cookies.auth,jwt_screat)
    Sendername = Sendername.username
    const Sender = await User.findOne({
        username:Sendername
    })
    if(!Sender){
        return res.json({
            msg : "You are not authorsied"
        })
    }
    Account.findOneAndUpdate({
        _id:Sender.bankid
    },{
        $inc:{balance: -amount}
    })

    // getting the reciver name 
    const reciver = await User.findOne({
        username:Reciver
    })
    if(!reciver){
        return res.json({
            msg : "please eneter the proper name"
        })
    }
    Account.findOneAndUpdate({
        _id:reciver.bankid
    },{
        $inc:{balance:+amount}
    })
    return res.json({
        msg : 'the transation is sucessful '
    })
}