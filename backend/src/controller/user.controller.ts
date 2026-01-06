import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { jwt_screat, salt } from "../Secreat.js";
import { Account, User } from "../model/models.js";
import jsonwebtoken from "jsonwebtoken"

interface SignUpBody {
  username: string;
  password: string;
}

export const HandleSignin = async (req: Request, res: Response) => {
  const body = req.body as SignUpBody;
  try {
    const hashedPassword = await bcrypt.hash(body.password, salt);
    let user = await User.findOne({ username: body.username });
    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }
    user = await User.create({
      username: body.username,
      password: hashedPassword
    });
    const accountDetails = await Account.create({
      user_id: user._id
    });
    await User.findOneAndUpdate(
      { username: body.username },
      { bankid: accountDetails._id }
    );
    return res.json({ msg: "Successfully created user" });
  } catch (error: any) {
    return res.status(500).json({
      msg: "Error occurred",
      error: error.message
    });
  }
};

export const Handlelogin = async (req: Request, res: Response) => {
  const body = req.body as SignUpBody
  let user = await User.findOne({
    username: body.username,
  })
  if (!user) {
    return res.json({
      msg: " user name or password is incorrect"
    })
  }
  const hashedPassword = user.password
  const verify = await bcrypt.compare(body.password, hashedPassword)
  console.log(verify)
  if(!verify){
    return res.json({
      msg : "you are not authorised"
    })
  }
  // we need to return jwt 
  const token = jsonwebtoken.sign({ username: body.username },jwt_screat)
  res.cookie("auth",token)
   return res.json({
    msg : "sucessful ",
    token
  })

}