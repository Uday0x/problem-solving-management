//this is the code for the (user) who is cmg on platform to execute teh code
//Scenario :user will open a problem solve it and run sub,mmit button (then the backend will run execute code api)
//user code + probelm testcases is sent to judge0 detailed output is returned 

import { db } from "../libs/db.js";
import { getlanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";


export const executeCode = async (req, res) => {
    //take the input from req.body
    //also get the userId from req.user
    //do teh validations whether the stdin s array or not
    //craete submissions 
    //send it to judge0 and print teh output


    const {source_code,language_id,stdin,expected_outputs,problemId} = req.body

    const userId = req.user.id;

    try {
        if(!Array.isArray(stdin) || stdin === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length){
            return res.status(200).json({message:"Invalid or missing test case"})
        }
    
        const submissions = stdin.map((input)=>({
            source_code,
            language_id,
            stdin:input
        }))
    
        const submissionResponse = await submitBatch(submissions)
    
        const tokens = submissionResponse.map((res)=>res.token)
    
        const  results = await pollBatchResults(tokens);
    
    
        console.log("Results ----------------")
        console.log( results);
    
        //analyze the test 
        let allPassed = true;
        const detailedResult =  results.map((result,i)=>{
          const stdOut = result.stdout?.trim();
          const expected_output = expected_outputs[i]?.trim();
          const passed = stdOut === expected_output
            
          console.log(stdOut)
          if(!passed) allPassed = false;
    
          return {
            testcase:i+1,
            passed,
            stdOut,
            expected:expected_output,
            stderr: result.stderr || null, //better of to keep null for checking
            complieOutput: result.complieOutput || null,//if u observe result is ingular mapped version of results keep an eye
            status: result.status.description,
            memory: result.memory ? `${result.memory} Kb`: undefined,
            time: result.time ? `${result.time} Kb`: undefined
          }
        })
    
            console.log("deatiled result -----",detailedResult)
    
    
            const submission = await db.submission.create({
                data:{
                    userId,
                    problemId,
                    sourceCode:source_code,
                    language:getlanguageName(language_id), //getalnguage is hard coded now to reduce unecessary load on server 
                    stdin:detailedResult.some((r)=>r.stdin) ?  
                        JSON.stringify(detailedResult.map((r)=>r.stdin)) : null ,
                    //stdin is optiosnal in datsbse using .some method we check whether it is present or not later we get it
                     stdout:detailedResult.some((r)=>r.stdout) ?  
                        JSON.stringify(detailedResult.map((r)=>r.stdout)) : null,
                    stderr:detailedResult.some((r)=>r.stderr) ?
                        JSON.stringify(detailedResult.map((r)=>r.stderr)) :null,
                    complieOutput:detailedResult.some((r)=>r.complieOutput) ?
                        JSON.stringify(detailedResult.map((r)=>r.complieOutput)) :null,
                    status:allPassed?"Accepted":"Rejected",
                    memory:detailedResult.some((r)=>r.memory) ?
                        JSON.stringify(detailedResult.map((r)=>r.memory)) :null,
                    time:detailedResult.some((r)=>r.time) ?
                        JSON.stringify(detailedResult.map((r)=>r.time)) :null,
                }
    
            })
    
            //if problem is done //we are going to do mark as done
            if(allPassed){
                await db.problemSolved.upsert({
                    where:{
                        userId_problemId:{
                            userId,
                            problemId
                        },
                    },
                
                update: {},
                create:{
                    userId,
                    problemId
                },
            })
        }
    
        const testcaseResults = detailedResult.map((r)=>({
            submissionId:submission.id,
            testcase:r.testcase,
            passed:r.passed,
            stdout:r.stdOut,
            expected:r.expected,
            stderr:r.stderr,
            complieOutput:r.complieOutput,
            status:r.status,
            memory:r.memory,
            time:r.time
        }))

        console.log("testcaseResults----",testcaseResults)
    
            await db.testCaseResult.createMany({
                data:testcaseResults
            })
    
            const submissionwithTestcase = await db.submission.findUnique({
                where:{
                    id:submission.id
                },
                include:{
                    testcases:true
                }
            })
        
      res.status(200).json({
      success: true,
      message: "Code Executed! Successfully!",
      submission: submissionwithTestcase,
    });

    } catch (error) {
        console.error("Error executing code:", error.message);
    res.status(500).json({ error: "Failed to execute code" });
    }
}