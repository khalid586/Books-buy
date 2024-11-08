import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BookItem from '../Components/BookItem';
import { FaListOl, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { IoGridOutline } from 'react-icons/io5';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import truncate from '../Utils/Truncate';


function AvailableBooks() {
    const [books,setBooks] = useState([]);
    const [ready,setReady] = useState(false)
    const [tab,setTab] = useState(1);
    const inactive = 'bg-white text-black' ,active = 'bg-green-500 text-white';

    useEffect(()=>{
        axios.get('https://b9a11-server-side-khalid586.vercel.app/available')
        .then(res => res.data)
        .then(data => {setBooks(data); setReady(true);})
        .catch(err => console.error(err))

    },[])

    return (
        <div>
        {
            !ready ? <Spinner></Spinner>
            :
            <div>
                <div className='flex font-semibold justify-center  my-4 mb-8'>
                    <button className={`flex gap-0.5 items-center border-l-2 rounded-l-2xl duration-500 py-2 px-4 ${tab == 1? active:inactive}`} onClick={()=>setTab(1)}><IoGridOutline></IoGridOutline> Grid view</button>
                    <button className={`flex gap-1 items-center border-r-2   rounded-r-2xl duration-500 py-2 px-4  ${tab == 2? active:inactive}`} onClick={()=>setTab(2)}><FaListOl></FaListOl> List view</button>
                </div>
            {
                tab == 1 ? 
            
                <div className='ml-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {
                    books.map(book => 
                        <div className=''>
                            <BookItem  book = {book} index = {book._id}></BookItem>
                            
                        </div>
                    )
                }
                </div>
                :
                <div className='flex flex-col items-center gap-4'>
                {
                    books.map(book =>
                    <div key={book._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-extrabold">
                                {truncate(book.name,20)}
                                <sup className={`text-xs ml-1 p-1 px-2 rounded-full border-2 ${book.copies > 0 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'} `}>
                                    {book.copies > 0 ? `${book.copies < 101 ? book.copies: '100+'} left` : "Out of stock"}
                                </sup>
                            </h2>
                            <div className='flex justify-between mt-4'>
                                <p className='font-bold text-gray-500'>{truncate(book.author,10)}</p>
                                <Link to={`/details/${book._id}`} className='px-4 py-2 rounded-full flex items-center gap-1 text-blue-700 font-bold text-base'>
                                    Details <FaRegArrowAltCircleRight className='text-sm text-black' />
                                </Link>
                            </div>

                        </div>
                    </div>
                    )
                }
                </div>
            }
            </div>
        }
        </div>
    )
}

export default AvailableBooks