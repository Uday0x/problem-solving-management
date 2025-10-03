import {Routes,Route,Navigate} from 'react-router-dom'
import SignUpform from './page/SignUpform'
import HomePage from './page/HomePage'
import Login from './page/Login'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-start'
    >
      <Routes>

      <Route
      path="/"
      element={<HomePage/>}
    />


    <Route 
    path="/login"
    element={<Login/>}
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