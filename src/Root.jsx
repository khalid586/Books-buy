import React from 'react'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'

function Root() {
  return (
    <div className='font-custom '>
      <div className='mx-4   md:mx-16'>
        <Navbar></Navbar>
            <div className='min-h-[90vh]'>
                <Outlet></Outlet>
            </div>
      </div>
        <Footer></Footer>
    </div>
  )
  
}

export default Root