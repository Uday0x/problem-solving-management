import express from "express";
import { createProblem, getAllProblems, getProblemById } from "../controllers/probelm.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-Problems",authMiddleware,getAllProblems)
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById)

export default problemRoutes;