import {Routes,Route,Navigate} from 'react-router-dom'
import SignUpform from './page/SignUpform'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from "lucide-react";


const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()


  useEffect(()=>{
    checkAuth()
  },[checkAuth])


  if(isCheckingAuth && !authUser){
    return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
    </div>
    );
  }
  return (
    <div className='flex flex-col items-center justify-start'
    >
      <Toaster/>      

      {/* //toaster has to be mentioned here so that it can be used in components */}
      <Routes>

      <Route
      path="/"
      element={<HomePage/>}
    />


    <Route 
    path="/login"
    element={<LoginPage/>}
    />


    <Route 
    path="/signup"
    element={<SignUpform/>}
    />
      </Routes>
    </div>
  )
}

export default App