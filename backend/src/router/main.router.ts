import express from "express";
import Accountrouter from "./account.router.js"
import userouter from "./user.router.js";
const mainrouter = express.Router()
mainrouter.use("/user",userouter)
mainrouter.use("/Account",Accountrouter)
export default mainrouter;