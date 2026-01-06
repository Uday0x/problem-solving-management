//here we create axios instance 
import axios from "axios"


export const axiosInstance = axios.create({    
     baseURL: "/api/v1",
     withCredentials: true,
})
console.log("API URL:", import.meta.env.VITE_API_URL);
