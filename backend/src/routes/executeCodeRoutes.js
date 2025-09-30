import express from "express";
import { authMiddleware } from "../midlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";


const executeRouter = express.Router();


executeRouter.post("/execute-code",authMiddleware,executeCode)