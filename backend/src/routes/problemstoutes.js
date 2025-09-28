import express from "express";
import { createProblem } from "../controllers/probelm.controller.js";
import { authMiddleware, checkAdmin } from "../midlewares/auth.middleware.js";


const problemRoutes = express.Router()


problemRoutes.post("/create",authMiddleware,checkAdmin,createProblem)  

export default problemRoutes;