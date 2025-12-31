
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


export const getSubmissionForProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    console.log("USER ID:", userId);
    console.log("PROBLEM ID:", problemId);

    const submissions = await db.submission.findMany({
      where: {
        userId,
        problemId,
      },
      include: {
        testcases: true, // frontend crash fix // important
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched submissions successfully",
      submissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching submissions",
    });
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