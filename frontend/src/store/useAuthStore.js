import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

import toast, { ErrorIcon } from "react-hot-toast";


// Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

//can put any name instead of useAuthStore
export const useAuthStore = create((set) => ({
    authUser:null,
    isSigninUp:false,
    isLogginIn:false,
    isCheckingAuth:false,

    checkAuth:async()=>{
        set({isCheckingAuth:true})


        try {
            const res = await axiosInstance.get("/auth/check") //if any doubt u can refer to axios instance 
            console.log("check response",res.data);

            set({authUser:res.data.user})
            
        } catch (error) {
            console.log("error checking auth",error);
            set({authUser:nul})
        }finally{
            set({isCheckingAuth:false})
        }
    },



    login:async(data)=>{
        set({isLogginIn:true})
        try {
            const res = axiosInstance.post("/auth/login",data)  //be craeful wt abt route u hitting 
            set({authUser:res.data.user})

            toast.success(res.data.message);  //dont forget to import toast from react hot  in app.jsx file
        } catch (error) {
            console.log("error siging up",error)
            toast.error("error signing up")
        }finally{
            set({isSignUp:false})
        }
    },


    signup:async(data)=>{
        set({ isSignUp:true })
        try {
            const res = await axiosInstance.post("/auth/register",data)

            set({authUser:res.data.user})

            toast.success(res.data.message)
        } catch (error) {
            console.log("error logging in the user",error);
            toast.error("error signingUp")
        }finally{
            set({isSigninUp:false})
        }
    },


    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
        } catch (error) {
            console.log("error logging out",error);
            toast.error("error logging out")
        }
    }
}))