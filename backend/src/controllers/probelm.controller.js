import { getJudge0LanguageId, submitBatch } from "../libs/judge0.lib.js"




export const createProblem= async(req,res)=>{
    //get the required data 
    const {title,description,difficulty,tags,examples,constraints,hints,testcases,codeSnippets, referenceSolutions 
} = req.body

    for (const [language,solutionCode] of referenceSolutions) {
        //create a mini which feteches the languageId

        const languageId = getJudge0LanguageId(language)

        if(!languageId){
            return res.status(200).json({
                error:`language ${language} not supported`
            })
        }
    }

    const submissions = testcases.map(({input,output})=>({
        source_code:solutionCode,
        language_id:languageId,
        stdin:input,
        expected_output:output
    }))

    const submissionResult = await submitBatch(submissions);

    const token = submissionResult.map((res)=>res.token)

    


}