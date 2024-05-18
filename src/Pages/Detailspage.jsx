import React, { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Detailspage() {
  const data = useLoaderData();
  const {user,loading} = useContext(AuthContext);
  const [reload,setReload] = useState(false);
  const [rented,setRented] = useState(false);

  const [book,setBook] = useState(data);
  const {
    _id,name,genre,photoUrl,author,copies,rating,uploaderEmail,rentedBy
  }= book;

  useEffect(()=>{
    if(user){
      const result = rentedBy.find(personMail => personMail == user.email);
      if(result){
        setRented(true);
      }
      else{
        setRented(false);
      }
      console.log(result)
    }
  },[loading,reload])

  function Fetch(){
    setReload(true);
    axios.get(`http://localhost:5007/details/${_id}`)
    .then(res => res.data)
    .then(data =>{
      setBook(data);
      setReload(false);
    })
  }

  function handleRent(){

    const info = {
      email:user.email
    }
    axios.patch(`http://localhost:5007/rent/${_id}`,info)
    .then(res => res.data)
    .then(data => {console.log(data); toast.success('Successfully rented'); Fetch();})
    .catch(err => console.log(err))
  }

  function handleReturn(){
    const info = {
      email:user.email
    }
    axios.patch(`http://localhost:5007/return/${_id}`,info)
    .then(res => res.data)
    .then(data => {console.log(data); toast.success('Successfully returned'); Fetch();})
    .catch(err => console.log(err))
  }

  return (
    <div className='mx-4 flex items-center h-[80vh]'>
        {
          reload ? <Spinner></Spinner>
          :
          <div className="w-full card lg:card-side bg-base-100">
          <figure className='w-1/2'><img className='' src={photoUrl} alt="Album"/></figure>
          <div className="card-body  rounded-3xl">
            <div className='mb-4'>
                <span className={`px-4 py-2 rounded-full  font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                {genre}
                </span>
            </div>
            <h2 className="card-title font-extrabold">{name}<sup className={`text-xs border-2 rounded-full px-1 py-0.5 ${copies>0?'text-green-500 border-green-400':'text-red-500 border-red-400'} `}>{copies > 0 ? 'In stock': 'Out of stock'}</sup></h2>
              <p className='font-bold text-gray-500'>{author}</p>
            <div className='my-4 py-4'>              
              <p className='font-bold py-2'>Available copies: {copies}</p>
              <p className='font-bold'>Rating: {rating}</p>
            </div>
            <div className='my-4'>
            {
              user.email == uploaderEmail  ? 
              <div className='flex gap-1 items-center font-bold'>
                <IoCloudUploadOutline className='text-lg text-blue-600'></IoCloudUploadOutline> Uploaded by you
              </div>
              :
              <div className="flex gap-2">
                {/* rent button only when copies > 0 and hasn't rentedBy the user */}
                {
                  copies > 0  && rented == false ?
                  <button onClick={handleRent} className="btn border-green-400 border-2 text-green-500 bg-white font-bold">Rent</button>
                  :
                  copies <= 0 && !rented? <p className='text-red-500 font-semibold'>Currently out of stock and can't be rented</p>: ''
                }
                {
                  rented &&
                  <button onClick={handleReturn} className="btn border-red-400 border-2 text-red-500 bg-white font-bold">Return</button>
                }
              </div>
              
            }
            </div>
            <div className='mt-4'>
              <Link to ='/' className='px-4 py-2 rounded-full text-white bg-red-500'>Back to home</Link>
            </div>
          </div>
        </div>
        }
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Detailspage