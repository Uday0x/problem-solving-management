import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useProblemStore } from "./useProblemStore";




export const useActions = create((set)=>({
    isDeletingProblem:false,
    isEditingProblem:false,
    onDeleteProblem:async(id)=>{
        try {
             set({ isDeletingProblem: true });
            const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);

            useProblemStore.getState().removeProblem(id);


                useProblemStore.getState().removeProblem(id); // 🔥 UI update

            toast.success(res.data.message);
        } catch (error) {
             console.log("Error deleting problem", error);
            toast.error("Error deleting problem");
        }
        finally{
            set({isDeletingProblem:false})
        }
    },


    onEditProblem:async(id)=>{
        try {
            set({isEditingProblem:true});
            const res =await axiosInstance.post(`/problems/update-problem/${id}`);
            toast.success(res.data.message)
        } catch (error) {
             console.log("Error updating problem", error);
            toast.error("Error updating problem");
        }  finally{
            set({isEditingProblem:false})
        }
    }
}))