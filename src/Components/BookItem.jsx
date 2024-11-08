import React from 'react';
import { FaPenFancy, FaRegArrowAltCircleRight, FaStar } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import truncate from '../Utils/Truncate';

function BookItem({ book, update, rent, handleUpdate, handleDelete }) {
    const {
        _id, name, genre, photoUrl, author, copies, rating, uploaderEmail, rentedBy
    } = book;

    const modalId = `modal_${_id}`;

    return (
        <div className="card bg-white border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-200 ease-in-out">
            <div className="flex items-start">
                <img
                    src={photoUrl}
                    alt="Book Cover"
                    className="w-24 h-24 rounded-full shadow-sm mr-4 object-cover"
                />
                <div className="flex-auto">
                    <h2 className="font-bold">
                        {truncate(name, 20)}
                        {!rent && (
                            <sup className={`ml-2 text-xs px-2 py-1 rounded-full ${copies > 0 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                                {copies > 0 ? `${copies < 101 ? copies : '100+'} left` : "Out of stock"}
                            </sup>
                        )}
                    </h2>
                    <p className="flex items-center text-sm font-medium text-gray-600 mb-1">
                        <FaPenFancy className="text-red-500 mr-1" /> {truncate(author, 18)}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-medium text-gray-700 flex items-center">
                            <VscGraph className="text-violet-500 mr-1" />
                            Rating: <span className="font-bold ml-1">{rating}</span> <FaStar className="text-green-500 ml-1" />
                        </p>
                        <span className={`text-xs font-semibold py-1 px-2 rounded-full ${genre === 'Fiction' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {genre}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <Link to={`/details/${_id}`} className="text-sm font-semibold text-blue-600 flex items-center">
                    Details <FaRegArrowAltCircleRight className="ml-1 text-base" />
                </Link>
                {update && (
                    <div className="flex space-x-2">
                        <button onClick={() => document.getElementById(modalId).showModal()} className="px-3 py-1 border border-green-500 text-green-500 rounded-full text-sm hover:bg-green-500 hover:text-white transition-colors duration-200">
                            Update
                        </button>
                        <button onClick={() => handleDelete(_id)} className="px-3 py-1 border border-red-500 text-red-500 rounded-full text-sm hover:bg-red-500 hover:text-white transition-colors duration-200">
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form onSubmit={(e) => handleUpdate(e, _id)} method="dialog">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Book name</label>
                                    <input type="text" id="name" defaultValue={name} className="input" required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Book Image URL</label>
                                    <input type="text" name="photoUrl" id="photoUrl" defaultValue={photoUrl} className="input" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Author</label>
                                    <input type="text" id="author" name="author" defaultValue={author} className="input" required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Available Copies</label>
                                    <input type="number" name="copies" id="copies" defaultValue={copies} className="input" min="0" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700">Rating</label>
                                <input type="number" name="rating" id="rating" defaultValue={rating} className="input" min="1" max="5" required />
                            </div>
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700">Genre</label>
                                <select name="genre" className="input" defaultValue={genre}>
                                    <option value="" disabled>Select a genre</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non fiction">Non fiction</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-2 mt-3 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors duration-200">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default BookItem;
