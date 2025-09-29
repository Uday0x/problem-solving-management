import { db } from "../libs/db.js"
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js"




export const createProblem= async(req,res)=>{
    //get the required data 
    const {title,description,difficulty,tags,examples,constraints,hints,testcases,codeSnippets, referenceSolutions 
} = req.body

    try {
        for (const [language,solutionCode] of Object.entries(referenceSolutions)) {
              //create a mini which feteches the languageId
            console.log("solutioncode",solutionCode)
        
            const languageId = getJudge0LanguageId(language)
    
            if(!languageId){
                return res.status(200).json({
                    error:`language ${language} not supported`
                })
            }
        
    
        const submissions = testcases.map(({input,output})=>({
            source_code:solutionCode,
            language_id:languageId,
            stdin:input,
            expected_output:output
        }))
    
        const submissionResult = await submitBatch(submissions);
    
        const tokens = submissionResult.map((res)=>res.token)
    
    
        const results =await pollBatchResults(tokens);
      
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Result-----", result);
            // console.log(
            //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
            // );
            if (result.status.id !== 3) {
              return res.status(400).json({
                error: `Testcase ${i + 1} failed for language ${language}`,
              });
            }
          }
    
        }
          const newProblem = await db.problem.create(
            {
            data:{
                    title,description,difficulty,tags,examples,constraints,hints,testcases,codeSnippets, referenceSolutions,userId:req.user.id
    
            }
            
          },
          
        )
          
    
          return res.status(201).json({
            success:true,
            message:"problem created successfully",
            problem:newProblem
          })
        }
    catch (error) {
     console.log(error);
        return res.status(500).json({
            error:"error while creating the problem"
        })
    }
}

export const getAllProblems = async(req,res)=>{
  //using findmany get all the problems
  //check what if problems dont arrive from the databacse 
  //return response and error

  try {
    const problems = await db.problem.findMany(
      {
        where:{
            //condition needs to given later
        }
      }
    )

    if(!problems){
      return res.status(404).json({
        message:"problems not found"
      })
    }

    res.status(200).json({
      message:"message fetched successfully",
      data:problems
    })
  } catch (error) {
    console.log("problems nhi aa rhe bhai",error)
    res.status(404).json({
      message:"error fetching the problems"
    })
  }
}



export const getProblemById = async(req,res)=>{
  const {id}=req.params;
  console.log(id)

  try {
   const problem =await db.problem.findUnique({
  where:{
    id
  }
})

if(!problem){
  return res.status(400).json({
    message:"problem not found by the following id"
  })
}


return res.status(200).json({
  message:`problem by id ${id} fetched sucessfully`,
  problem

})
  } catch (error) {
    console.log("error hai bhai infetching problem by id",error)
      return res.status(400).json({
        message:"error in fetching problem by id"
      })
  }
}
export const updateProblem = async(req,res)=>{

}


