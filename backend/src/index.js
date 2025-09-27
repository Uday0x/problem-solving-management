import express from "express"
import dotenv from "dotenv"


dotenv.config()   //safe to do so


const app = express();



app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port 8080`)
})