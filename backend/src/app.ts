import express from "express"
import cors from "cors"
import {Connecttomongoose} from "./model/db.js"
import mainrouter from "./router/main.router.js"
const app = express()


app.use(cors())
Connecttomongoose()
app.use(mainrouter)
app.get("/hi",(req,res)=>{
    res.json({
        msg:"hello world"
    })
})
app.listen(3000,()=>{
    console.log(`the server is running at local host ${3000}`)
})