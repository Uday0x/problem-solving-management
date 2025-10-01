import e from "express";
import { db } from "../libs/db.js";


export const getAllSubmission = async(req,res)=>{
    try {
        const userId = req.user.id;

        if(!userId){
            return res.status(300).json(
               { message:"not a valid userid",
            })
        }

        const submissions = await db.submission.findMany({
            where:{
                userId
            }
        })

        return res.status(200).json({
            message:"fetched the prooblem successfully",
            submissions
        })
    } catch (error) {
        console.error(error)
        return res.status(200).json({
            message:"error in fetching the prooblem successfully",
    
        })
    }
}


export const getSubmissionForProblem = async(req,res)=>{


    const problemId=req.params.problemId
    const userId = req.user.id

    try {
        const submissions = await db.submission.findMany({
            where:{
                userId,
                problemId
            }
        })

        res.status(300).json({
            success:true,
            message:"fetched the submission for the problem"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error in fetching teh problem"
        })
    }
}

export const getAllSubmissionsForProblems = async(req,res)=>{
        try {
            const problemId = req.params.problemId

            const submissions = await db.submission.count({
                where:{
                    problemId:problemId
                }
            })

            
        res.status(200).json({
            success:true,
            message:"Submissions Fetched successfully",
            count:submissions
        })
        } catch (error) {
            console.error(error)
            res.status(303).json({
                error:"falied to fetch the count"
            })
        }
}