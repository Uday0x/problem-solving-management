//here we craete axios instance 
import {axios} from "axios"


export const axiosInstance = axios.create({
    baseURL:import.meta.env.mode ==="devlopment" ? "http://localhost:7000/api/v1" : null,
    withCredentials: true,
})