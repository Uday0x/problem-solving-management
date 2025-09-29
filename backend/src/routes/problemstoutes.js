import express from "express";
import { createProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/probelm.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-Problems",authMiddleware,getAllProblems)
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById)
problemRoutes.post("/update/:id",authMiddleware,updateProblem)

export default problemRoutes;