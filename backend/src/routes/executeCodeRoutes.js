import express from "express";
import { authMiddleware } from "../midlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";


const executeRoutes = express.Router();


executeRoutes.post("/execute",authMiddleware,executeCode)


export default executeRoutes