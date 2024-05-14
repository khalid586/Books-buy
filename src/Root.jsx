import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
        <Header></Header>
            <div className='min-h-[70vh]'>
                <Outlet></Outlet>
            </div>
        <Footer></Footer>
    </>
  )
}

export default Root