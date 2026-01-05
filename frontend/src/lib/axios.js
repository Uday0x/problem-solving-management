//here we create axios instance 
import axios from "axios"


export const axiosInstance = axios.create({

    
    baseURL:"https://problem-solving-management-production.up.railway.app/api/v1" , //its better to verify port from the frontend //here we have 7000
    withCredentials: true, //this is for the purpose of cookies
})
console.log("API URL:", import.meta.env.VITE_API_URL);
