import axios from "axios"

export const getJudge0LanguageId=(lanuguage)=>{
    const languageMap ={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return languageMap[lanuguage.toUpperCase()]
}

export const submitBatch =async(submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    },{
        headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.JUDGE0_API_KEY, // 👈 KEY here
    }
    })

    console.log("submission results",data);

    return data; //will beo f the form [{token},{token},{token}]
    
}

export const pollBatchResults = async(tokens)=>{
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:true
            },
            headers:{
                "X-Auth-Token": process.env.JUDGE0_API_KEY, // 👈 KEY here
            }
        })

        const results = data.submissions


        const isAllDone = results.every((res)=>res.status.id !==1 && res.status.id !==2)

        if(isAllDone) return results;
        await new Promise((resolve)=>setTimeout(resolve,2000)) //2 sec delay
    }
}