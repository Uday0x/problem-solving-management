import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Layout() {
  return (
    <div>
        <Outlet/>
        <NavBar/>
    </div>
  )
}

export default Layout
