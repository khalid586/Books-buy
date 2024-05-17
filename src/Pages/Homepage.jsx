import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../Components/Banner'

function Homepage() {
  return (
    <div>
      <Banner></Banner>
        <Link to = '/details'>See details</Link> 
    </div>
  )
}

export default Homepage