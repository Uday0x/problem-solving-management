import React from 'react'
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom"
import { Bookmark, PencilIcon, Trash,TrashIcon,Plus } from "lucide-react"
import { useActions } from "../store/us"



function ProblemTable({ problems }) {
    const { authUser } = useAuthStore();
    const { onDeleteProblem } = useActions()
  return (
    <div>
      
    </div>
  )
}

export default ProblemTable
