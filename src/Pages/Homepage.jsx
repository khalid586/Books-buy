import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../Components/Banner'
import { Helmet } from 'react-helmet'

function Homepage() {
  return (
    <div>
            <Helmet>
                <title>Books Buy | Home</title>
            </Helmet>
      <Banner></Banner>
        <Link to = '/details'>See details</Link> 
    </div>
  )
}

export default Homepage