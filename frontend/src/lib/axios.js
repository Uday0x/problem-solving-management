import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:7000/api/v1"
      : import.meta.env.VITE_API_URL,
  withCredentials: true, // 🔥 COOKIE MAGIC
});

// optional debug
if (import.meta.env.MODE === "development") {
  console.log("API URL:", import.meta.env.VITE_API_URL);
}
