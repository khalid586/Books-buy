import React from 'react'
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BookItem({book,update}){
    const  {
        _id,name,genre,photoUrl,author,copies,rating,uploaderEmail,rentedBy
    } = book;
    return(
        <div className="card  bg-base-100 shadow-xl">
                    <figure className='w-full max-h-60'><img src={photoUrl} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-2xl font-bold mt-2">
                        {name}<sup className={`text-xs ml-1 px-1 py-0.5 rounded-full border-2 ${copies > 0 ? 'text-green-500 border-green-500':' text-red-500 border-red-500'} `}>{copies > 0? "In stock":"Out of stock"}</sup>
                        </h2>
                        <div className='mb-3 text-sm font-bold text-gray-500'>
                        {
                            author
                        }
                        </div>
                        <div className='flex justify-between items-center'>
                           <p className='font-medium'>Avaiable Copies: <span className='font-bold'> {copies}</span></p>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${genre =='Fiction' ? 'bg-violet-100 text-violet-700':' bg-orange-100 text-orange-500'}`}>{genre}</div> 
                        </div>

                        <div className=' mt-8 flex gap-4'>
                            <Link to = {`/details/${_id}`} className={'px-4 py-2 rounded-full flex items-center gap-1 text-blue-700 font-bold text-base'}>Details <FaRegArrowAltCircleRight className='text-sm text-black'></FaRegArrowAltCircleRight></Link>
                            {
                                update && 
                                <div className='gap-4 flex font-bold'>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">

                                        <div className="modal-action">
                                        <form method="dialog">
                                            
                                            <button type='submit' className="btn">Update</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
                                    <button onClick={()=>document.getElementById('my_modal_1').showModal()} className='px-4 py-2 rounded-full bg-green-100 text-green-500'>Update</button>
                                    <button className='px-4  rounded-full bg-red-100 text-red-600'>Delete</button>
                                </div>
                            }
                        </div>
                    </div>
            </div>
    )
}

export default BookItem