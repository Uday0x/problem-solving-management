import express from "express";
import { createProblem, deleleProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-Problems",authMiddleware,getAllProblems)
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById)
problemRoutes.post("/update/:id",authMiddleware,updateProblem)
problemRoutes.post("/delete/:id",authMiddleware,deleleProblem)

export default problemRoutes;