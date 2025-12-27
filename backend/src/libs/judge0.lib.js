import axios from "axios"

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
    TYPESCRIPT: 74,
  };
  return languageMap[language.toUpperCase()];
};


export const getlanguageName=(language_id)=>{
    const map={
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return map[language_id]
}

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    }
  );

  return data;  //will be of the form [{token},{token},{token}]
};


export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (res) => res.status.id !== 1 && res.status.id !== 2
    );

    if (isAllDone) return results;

    await new Promise((r) => setTimeout(r, 2000));
  }
};
