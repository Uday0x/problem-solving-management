import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:7000/api/v1" : "/api/v1",
  withCredentials: true,
});