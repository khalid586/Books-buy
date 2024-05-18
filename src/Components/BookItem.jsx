import React from 'react'
import { Link } from 'react-router-dom';

function BookItem({book}){
    const  {
        _id,name,genre,photoUrl,author,copies,rating,uploaderEmail,rentedBy
    } = book;
    return(
        <div className="card  bg-base-100 shadow-xl">
                    <figure className='w-full max-h-60'><img src={photoUrl} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-2xl font-bold mt-2">
                        {name}<sup className='badge text-green-500'>Available</sup>
                        </h2>
                        <div className='mb-3 text-sm font-bold text-gray-500'>
                        {
                            author
                        }
                        </div>
                        <div className='flex justify-between items-center'>
                           <p className='font-medium'>Avaiable Copies: <span className='font-bold'> {copies}</span></p>
                        <div className={`px-3 py-2 rounded-full text-sm font-bold ${genre =='Fiction' ? 'bg-violet-100 text-violet-700':'bg-emerald-100 text-emerald-500'}`}>{genre}</div> 
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