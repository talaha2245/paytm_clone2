import express from "express"
import { HandleSignin,Handlelogin } from "../controller/user.controller.js"
const userouter = express.Router()
userouter.post("/signup",HandleSignin)
userouter.post("/login",Handlelogin)
userouter.post("/logout",()=>{})
export default userouter;
