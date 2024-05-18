import React from 'react'
import { Link } from 'react-router-dom';

function BookItem({book}){
    const  {
        _id,name,genre,photoUrl,author,copies,rating,uploaderEmail,rentedBy
    } = book;
    return(
        <div className="card  bg-base-100 shadow-xl">
                    <figure className='w-full max-h-72'><img src={photoUrl} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-3xl font-bold my-2">
                        {name}<sup className='badge text-green-500'>Available</sup>
                        </h2>
                        <div>
                        {
                            author
                        }
                        </div>
                        <div className='flex justify-between items-center'>
                           <p className='font-medium'>Avaiable Copies: <span className='font-bold'> {copies}</span></p>
                        <div className={`text-white px-2 py-0.5 rounded-full text-sm font-bold ${genre =='Fiction' ? 'bg-red-600':'text-blue-600'}`}>{genre}</div> 
                        </div>
                        <div className="card-actions justify-end">
                        </div>
                        <div className=' mt-6'>
                        <Link to = {`/details/${_id}`} className='px-4 py-2 rounded-full bg-blue-600 text-white'>Details</Link>
                        </div>
                    </div>
            </div>
    )
}

export default BookItem