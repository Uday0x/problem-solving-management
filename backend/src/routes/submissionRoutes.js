import express from "express"
import { authMiddleware } from "../midlewares/auth.middleware.js";
import { getAllSubmission, getAllSubmissionsForProblems, getSubmissionForProblem } from "../controllers/submission.controller.js";


export const submissionRouter = express.Router();

submissionRouter.get("/get-all-submissions",authMiddleware,getAllSubmission)
submissionRouter.get("/get-submission/:problemId",authMiddleware,getSubmissionForProblem)
submissionRouter.get("/get-submissions-count/:problemId",getAllSubmissionsForProblems)

