import React from 'react'
import { FaPenFancy, FaRegArrowAltCircleRight, FaStar } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import truncate from '../Utils/Truncate';

function BookItem({ book, update , rent , handleUpdate , handleDelete}) {
    const {
        _id, name, genre, photoUrl, author, copies, rating, uploaderEmail, rentedBy
    } = book;

    const modalId = `modal_${_id}`;

    return (
        <div className="card bg-base-100 border shadow-md">
            <figure className='w-full h-56'><img src={photoUrl} alt="Book Cover" /></figure>
            <div className="card-body">
                <h2 className="font-extrabold mt-2">
                    {truncate(name,20)}
                    {
                        !rent &&
                        <sup className={`text-xs ml-1 p-1 px-2 rounded-full border-2 ${book.copies > 0 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'} `}>
                            {book.copies > 0 ? `${book.copies < 101 ? book.copies: '100+'} left` : "Out of stock"}
                        </sup>
                    }
                </h2>
                <div className='flex gap-1 items-center mb-3 text-sm font-bold text-gray-500'>
                <FaPenFancy className='text-red-600 text-lg'></FaPenFancy> {truncate(author,20)}
                </div>
                <div className='flex justify-between items-center'>
                    <p className='font-medium flex items-center gap-0.5'>
                        <VscGraph className='text-xl text-violet-500'></VscGraph>
                        Rating: <span className='font-bold'> {rating}</span> <FaStar className='text-green-500'></FaStar>
                    </p>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                        {genre}
                    </div>
                </div>

                <div className='mt-8 flex gap-4'>
                    <Link to={`/details/${_id}`} className='px-4 py-2 rounded-full flex items-center gap-1 text-blue-700 font-bold text-base'>
                        Details <FaRegArrowAltCircleRight className='text-sm text-black' />
                    </Link>
                    {
                        update &&
                        <div className='gap-4 flex font-bold'>
                            <button onClick={() => document.getElementById(modalId).showModal()} className='px-3 rounded-full border-2 border-green-500 text-green-500 hover:text-white hover:bg-green-500'>Update</button>
                            <button onClick={()=>handleDelete(_id)}                              className='px-3 rounded-full border-2  border-red-500  hover:text-white hover:bg-red-500 text-red-600'>Delete</button>
                        </div>
                    }
                </div>
            </div>

            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form onSubmit={(e)=>handleUpdate(e,book._id)} method="dialog">
                            <div className="mb-5 flex gap-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Book name</label>
                                    <input type="text" id="name" defaultValue={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" required />
                                </div>
                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Book Image Url</label>
                                    <input type="text" name='photoUrl' id="photoUrl" defaultValue={photoUrl} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" required />
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                                    <input type="text" id="author" name="author" defaultValue={author} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Available Copies</label>
                                    <input type="number" name='copies' id="copies" defaultValue={copies} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" min="0"  required />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="">
                                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                                    <input type="number" name='rating' id="rating" defaultValue={rating} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" min="1" max="5" required />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Genre</label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="dropdown">
                                        <select name="genre" className="form-select mt-1 block w-full" defaultValue={genre}>
                                            <option value="" disabled>Select a genre</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non fiction">Non fiction</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className="px-4 py-2 rounded-full text-white bg-green-400">Update</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default BookItem;
