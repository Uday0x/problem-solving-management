//here we create axios instance 
import axios from "axios"


export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:7000/api/v1" : "/api/v1", //its better to verify port from the frontend //here we have 7000
    withCredentials: true, //this is for the purpose of cookies
})