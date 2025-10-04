import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

import toast from "react-hot-toast";



// Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

//can put any name instead of useAuthStore
export const useAuthStore = create((set) => ({
    authUser:null,
    isSignUp:false,
    isLogginIn:false,
    isCheckingAuth:false,

    checkAuth:async()=>{
        set({isCheckingAuth:true})


        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("check response",res.data);

            set({authUser:res.data.user})
            
        } catch (error) {
            console.log("error checking auth":error);
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

            toast.success(res.data.message);
        } catch (error) {
            console.log("error siging up",error)
            toast.error("error signing up")
        }finally{
            set({isSignUp:false})
        }
    }
}))