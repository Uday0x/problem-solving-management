//this is the code for the (user) who is cmg on platform to execute teh code
//Scenario :user will open a problem solve it and run sub,mmit button (then the backend will run execute code api)
//user code + probelm testcases is sent to judge0 detailed output is returned 

import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";


export const executeCode = async (req, res) => {
    //take the input from req.body
    //also get the userId from req.user
    //do teh validations whether the stdin s array or not
    //craete submissions 
    //send it to judge0 and print teh output


    const {source_code,language_id,stdin,expected_output,problemId} = req.body

    const userId = req.user.id;

    if(!Array.isArray(stdin) || stdin === 0 || !Array.isArray(expected_output) || expected_output.length !== stdin){
        return res.status(200).json({message:"Invalid or missing test case"})
    }

    const submissions = stdin.map((input)=>({
        source_code,
        language_id,
        stdin:input
    }))

    const submissionResponse = await submitBatch(submissions)

    const tokens = submissionResponse.map((res)=>res.token)

    const results = await pollBatchResults(tokens);


    console.log("Results ----------------")
    console.log(results);
}