import express from "express";
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/problem.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem)  
problemRoutes.get("/get-all-Problems",authMiddleware,getAllProblems)
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById)
problemRoutes.post("/update/:id",authMiddleware,updateProblem)
problemRoutes.post("/delete/:id",authMiddleware,deleteProblem)
problemRoutes.get("/get-solved-problems",authMiddleware,getAllProblemsSolvedByUser)

export default problemRoutes;