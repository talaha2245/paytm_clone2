import express from "express"
import { HandleSignin,Handlelogin ,Handlelogout} from "../controller/user.controller.js"
const userouter = express.Router()
userouter.post("/signup",HandleSignin)
userouter.post("/login",Handlelogin)
userouter.post("/logout",Handlelogout)
export default userouter;
