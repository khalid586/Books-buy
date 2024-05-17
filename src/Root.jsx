import React from 'react'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'

function Root() {
  return (
    <div className='mx-2 font-custom'>
        <Navbar></Navbar>
            <div className='min-h-[70vh]'>
                <Outlet></Outlet>
            </div>
        <Footer></Footer>
    </div>
  )
  
}

export default Root