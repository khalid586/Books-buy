import React, { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Banner from '../Components/Banner'
import { Helmet } from 'react-helmet'
import { FaBook, FaInstagram } from 'react-icons/fa';
import { FaLocationCrosshairs, FaRegPenToSquare } from 'react-icons/fa6';
import { GrMapLocation, GrStatusGood } from 'react-icons/gr';
import { AuthContext } from '../Providers/AuthProvider';
import Spinner from '../Components/Spinner';
import { MdDriveFolderUpload } from 'react-icons/md';
import axios from 'axios';
import truncate from '../Utils/Truncate';



function Books({book ,key,user}){
    const  {
        _id,name,genre,photoUrl,author,copies,rating,uploaderEmail,rentedBy
    } = book;

    const [rented,setRented] = useState(false);

    useEffect(()=>{
      const result = rentedBy.find(person => person === user?.email)
      if(result) setRented(true);
      else setRented(false);
    },[])



  return(
      <Link to = {`details/${_id}`} className=''>
          <img className='rounded-xl shadow-lg duration-500 ' style={{ height: '300px' , width:'100vh'}} src={photoUrl} alt='place.img' 
          onError={(e) => {
              e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
              e.target.alt = 'Fallback Image'; 
          }}>
              
          </img>
          <div className='mx-2 my-1'>
              <div className='flex items-center justify-between'>                            
                  <p className='font-semibold text-black flex gap-1 items-center text-sm'><FaBook className='text-violet-500'></FaBook>{truncate(name,20)}</p>
                  <div className='flex items-center gap-0.5'>                    
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                          {genre}
                      </div>
                    <div className={`text-xs m-1 py-1 px-2 text-white rounded-full font-bold ${copies > 0 ? "bg-green-400":"bg-red-500"}`}>{copies > 0 ? 'In stock':'Out of stock'}</div>
                  </div>
              </div>
              <div className='flex items-center justify-between'>
                  <p className='flex gap-1 items-center text-xs font-bold text-gray-500'><FaRegPenToSquare className='text-green-400'></FaRegPenToSquare>{truncate(author,20)}</p>
                  { user?.email == uploaderEmail && <p className='text-xs text-blue-600 flex gap-1 items-center font-bold'><MdDriveFolderUpload className='text-violet-500 text-lg'></MdDriveFolderUpload>You added</p>}
                  { rented && 
                      <span className='text-red-500'>
                        <p className='flex items-center gap-0.5 text-xs  font-bold px-1 rounded-full border border-red-500'> 
                          <GrStatusGood className='text-red-600'></GrStatusGood>
                          Rented
                        </p>
                      </span>
                  } 
              </div>
          </div>
      </Link>
  )
                     
}

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
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4'>
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