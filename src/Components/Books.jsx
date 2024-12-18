import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPen } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';
import truncate from '../Utils/Truncate';

function Books({ book, user }) {
    const {
        _id, name, photoUrl, author, copies
    } = book;

    const [hide, setHide] = useState(false);
    if(hide) return;
    
    return (
        <Link to={`/details/${_id}`} className="rounded-lg overflow-hidden duration-300 max-w-xs border-b-4 hover:border-b-red-400 hover:shadow-xl  w-40">
            <div className="relative w-40 h-40">
                <img 
                    className="w-full h-full object-cover" 
                    src={photoUrl} 
                    alt={`${name} cover`} 
                    onError={(e) => {
                        setHide(true);
                        e.target.src = 'https://i.ibb.co.com/bHLBFW1/images-q-tbn-ANd9-Gc-TABypl-NASv-DYl6kskcoa2u-SU2-m-Ufl3e-K4-ERxg4lf-Bw-s.jpg';
                        e.target.alt = 'Fallback Image';
                    }}
                />
                {copies > 0 ? (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-green-600 bg-green-100 rounded-full">
                        In Stock
                    </span>
                ) : (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-red-600 bg-red-100 rounded-full">
                        Out of Stock
                    </span>
                )}
            </div>
            <div className="p-2 bg-transparent"> {/* Make background transparent here */}
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                {
                    truncate(name, 15)
                }
                </h3>
                <p className="flex items-center text-gray-500 font-semibold text-sm mb-1">
                {
                    truncate(author, 12)
                }
                </p>
            </div>
        </Link>
    );
}

export default Books;
