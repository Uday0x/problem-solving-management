import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

import toast, { ErrorIcon } from "react-hot-toast";


// Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

//can put any name instead of useAuthStore
export const useAuthStore = create((set) => ({   //create is responsible for creating globalStore
  authUser: null,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch(error){
        console.log("Error loggin the user",error);
        toast.error("Error logging In")
    } finally {
      set({ isLogginIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return res.data.user;
    }catch(error){
      console.log("Error signing Up",error)
      toast.error("Error signingUp")
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
   try {
     await axiosInstance.post("/auth/logout");
     set({ authUser: null });
     toast.success("Logout successful");
   } catch (error) {
    console.log("Error logging Out",error);
    toast.error("Error logging Out");
   }
  },
}));
