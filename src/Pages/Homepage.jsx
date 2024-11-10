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
import Spinner from '../Components/Spinner';
import Books from '../Components/Books';


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
          loading || !ready ? <Spinner></Spinner>:
          <div>
            <Banner books = {books}></Banner>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 m-4'>
            {
              books.map(book => 
                  <Books user = {user} book = {book} key = {book._id}></Books>
              )
            }
            </div>
          </div>
        }
    </div>
  )
}

export default Homepage