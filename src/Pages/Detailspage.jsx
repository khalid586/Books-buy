import React, { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MdDriveFolderUpload } from 'react-icons/md';
import { VscGraph } from 'react-icons/vsc';
import { FaPenFancy, FaStar } from 'react-icons/fa';
import { PiBooks } from 'react-icons/pi';

function Detailspage() {
  const data = useLoaderData();
  const {user,loading} = useContext(AuthContext);
  const [reload,setReload] = useState(false);
  const [rented,setRented] = useState(false);
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;
  const style = {
    width: isMobile? "500px" :'600px', 
    height: isMobile ? "300px": "700px"
  };



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
    axios.get(`https://b9a11-server-side-khalid586.vercel.app/details/${_id}`)
    .then(res => res.data)
    .then(data =>{
      setBook(data);
      setReload(false);
    })
  }

  function NAVIGATE(){
    setTimeout(()=>{
      navigate('/rented_books')
    },1500)
  }

  function handleRent(){

    const info = {
      email:user.email
    }
    axios.patch(`https://b9a11-server-side-khalid586.vercel.app/rent/${_id}`,info)
    .then(res => res.data)
    .then(data => {
      toast.success('Successfully rented');
       Fetch();
       NAVIGATE();
    })
    .catch(err => console.log(err))
  }

  function handleReturn(){
    const info = {
      email:user.email
    }
    axios.patch(`https://b9a11-server-side-khalid586.vercel.app/return/${_id}`,info)
    .then(res => res.data)
    .then(data => {
      toast.success('Successfully returned'); 
      Fetch();
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='my-4 mx-4 flex items-center lg:h-[80vh]'>
        {
          reload ? <Spinner></Spinner>
          :
          <div className="w-full card lg:card-side bg-base-100">
          <figure className='w-1/2'><img style={style} className='rounded-xl' src={photoUrl} alt="Album"/></figure>
          <div className="card-body  rounded-3xl">
            <div className='mb-4'>
                <span className={`text-xs px-4  py-2 rounded-full  font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                {genre}
                </span>
            </div>
            <h2 className="card-title font-extrabold">{name}<sup className={`text-xs border-2 rounded-full px-1 py-0.5 ${copies>0?'text-green-500 border-green-400':'text-red-500 border-red-400'} `}>{copies > 0 ? 'In stock': 'Out of stock'}</sup></h2>
              <span className='font-bold text-gray-500 flex gap-1 items-center'>
              <FaPenFancy className='text-red-600 text-lg'></FaPenFancy> {author}

              </span>
            <div className='mb-16'>              
              <span className='font-bold py-2 flex gap-0.5 items-center'>
                <PiBooks className='text-blue-600 text-xl'></PiBooks>
                Available copies: {copies}
              </span>
              <span className='font-bold flex items-center gap-0.5'>
              <VscGraph className='text-xl text-violet-500'></VscGraph>
                    Rating: <span className='font-bold'> {rating}</span> <FaStar className='text-green-500'></FaStar> 
              </span>
            </div>
            <div className='my-4'>
            {
              user.email == uploaderEmail  ? 
              <div className=''>
                <div className='flex gap-1 items-center font-bold'>
                  <MdDriveFolderUpload className='text-2xl text-violet-600'></MdDriveFolderUpload> <span className='text-blue-600 text-sm'>Uploaded by you</span>
                </div>
                <div className='mt-16'>
                  <Link className='px-4 py-2 rounded-full border-4 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-white' to = '/added_books'>Update</Link>
                </div>
              </div>
              :
              <div className="flex gap-2">
                {/* rent button only when copies > 0 and hasn't rentedBy the user */}
                {
                  copies > 0  && rented == false ?
                  <button onClick={handleRent} className="btn border-green-400 border-2 text-green-500 bg-white font-bold">Rent Book</button>
                  :
                  copies <= 0 && !rented? <p className='text-red-500 font-semibold'>Currently out of stock and can't be rented</p>: ''
                }
                {
                  rented &&
                  <button onClick={handleReturn} className="btn border-red-400 border-2 text-red-500 bg-white font-bold">Return Book</button>
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