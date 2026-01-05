import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"; 
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import executeRoutes from "./routes/executeCodeRoutes.js";
import { submissionRouter } from "./routes/submissionRoutes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import cors from "cors"

dotenv.config()   //safe to do so


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use( 
    cors({
        origin: [
      "http://localhost:5173",
      "https://codelabss.up.railway.app" // 👈 Vercel / Railway frontend
    ],
        credentials:true
    })
)
app.use(express.urlencoded({ extended: true }));


app.set("trust proxy", 1);
//u can also give all here

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execute-code",executeRoutes)
app.use("/api/v1/submission",submissionRouter)
app.use("/api/v1/playlist",playlistRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port`,process.env.PORT)
})