import express from "express";
import { createProblem } from "../controllers/probelm.controller";


const problemRoutes = express.Router()


problemRoutes.post("/create",createProblem)  

export default problemRoutes;