import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemstoutes.js";


dotenv.config()   //safe to do so


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problem",problemRoutes) 

app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port`,process.env.PORT)
})