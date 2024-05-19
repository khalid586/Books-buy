import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BookItem from '../Components/BookItem';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';


function AvailableBooks() {
    const [tab,setTab] = useState(1);
    const books = useLoaderData() || [];
    const inactive = 'bg-white text-black' ,active = 'bg-green-500 text-white';

    return (
        <div>
            <div className='flex justify-center   my-4 mb-8'>
                <button className={`duration-500 py-2 px-4 ${tab == 1? active:inactive}`} onClick={()=>setTab(1)}>Grid view</button>
                <button className={`duration-500 py-2 px-4  ${tab == 2? active:inactive}`} onClick={()=>setTab(2)}>List view</button>
            </div>
            {
                tab == 1 ? 
            
                <div className='m-4 grid grid-cols-4 gap-3'>
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
                                {book.name}
                                <sup className={`text-xs ml-1 p-1 px-2 rounded-full border-2 ${book.copies > 0 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'} `}>
                                    {book.copies > 0 ? `${book.copies} left` : "Out of stock"}
                                </sup>
                            </h2>
                            <div className='flex justify-between mt-4'>
                                <p className='font-bold text-gray-500'>{book.author}</p>
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
    )
}

export default AvailableBooks