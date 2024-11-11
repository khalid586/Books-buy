import React, { useContext, useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { FaBook, FaInstagram } from 'react-icons/fa';
import { FaLocationCrosshairs, FaRegPenToSquare } from 'react-icons/fa6';
import { GrMapLocation, GrStatusGood } from 'react-icons/gr';
import { MdDriveFolderUpload } from 'react-icons/md';
import truncate from '../Utils/Truncate';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
import Books from '../Components/Books';   
import HomepageSkeleton from '../Components/HomepageSkeleton';
import Featured from '../Components/Featured';
import BestSeller from '../Components/BestSeller';


function Homepage() {
  const {user,loading} = useContext(AuthContext);
  const [books,setBooks] = useState([]);
  const [ready,setReady] = useState(false);

  useEffect(()=>{
    axios.get('https://b9a11-server-side-khalid586.vercel.app/books')
    .then(res => res.data)
    .then(data => {setBooks(data); setReady(true);})
    .catch(err => console.log(err))

  },[])
  

  return (
    <div>
        <Helmet>
            <title>Books Buy | Home</title>
        </Helmet>
        {
          loading || !ready ? <HomepageSkeleton></HomepageSkeleton>:
          <div>
            <Banner books = {books}></Banner>

            <Featured></Featured>
            

            <div className='md:my-16'>
              <h1 className="text-3xl md:text-4xl font-extrabold  text-red-600 mb-6 tracking-wide">
                Your Picks
              </h1>
              <div className='gap-4 grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8  my-4'>
              {
                books.map(book => 
                    <Books user = {user} book = {book} key = {book._id}></Books>
                )
              }
              </div>
            </div>

              <BestSeller></BestSeller>

          </div>
        }
    </div>
  )
}

export default Homepage