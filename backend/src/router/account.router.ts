import express from "express"
import { handleGetBalance, handleTransaction } from "../controller/account.controller.js";

const Accountrouter = express.Router()

Accountrouter.get("/getbalance",handleGetBalance)
Accountrouter.post("/transfer",handleTransaction)

export default Accountrouter;