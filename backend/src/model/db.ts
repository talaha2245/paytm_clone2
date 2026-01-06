import mongoose from "mongoose"
import { connectionString } from "../Secreat.js"
export function Connecttomongoose(){
    mongoose.connect(connectionString).then((res)=>{
        console.log("conned suceccfully ")
    }).catch((err)=>{
        console.error("and error ")
    })
}

