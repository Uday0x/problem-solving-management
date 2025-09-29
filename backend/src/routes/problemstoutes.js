import express from "express";
import { createProblem, getAllProblems } from "../controllers/probelm.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-Problems",authMiddleware,getAllProblems)

export default problemRoutes;