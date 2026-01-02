import express from "express";
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/problem.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-problems",authMiddleware,getAllProblems)
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById)
problemRoutes.post("/update-problem/:id",authMiddleware,updateProblem)
problemRoutes.delete("/delete-problem/:id",authMiddleware,deleteProblem)
problemRoutes.get("/get-solved-problem",authMiddleware,getAllProblemsSolvedByUser)

export default problemRoutes;