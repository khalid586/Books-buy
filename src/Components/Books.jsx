import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPen } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';
import truncate from '../Utils/Truncate';

function Books({ book, user }) {
    const {
        _id, name, genre, photoUrl, author, copies, uploaderEmail, rentedBy
    } = book;

    const [rented, setRented] = useState(false);

    useEffect(() => {
        const result = rentedBy.includes(user?.email);
        setRented(!!result);
    }, [rentedBy, user?.email]);

    return (
        <Link to={`/details/${_id}`} className="rounded-lg overflow-hidden duration-300 max-w-xs hover:shadow mx-auto">
            <div className="relative w-40 h-40 mx-auto">
                <img 
                    className="w-40 h-full object-cover" 
                    src={photoUrl} 
                    alt={`${name} cover`} 
                    onError={(e) => {
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
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    <FaBook className="inline text-violet-500 mr-1" />{truncate(name, 15)}
                </h3>
                <p className="flex items-center text-gray-500 text-xs mb-1">
                    <FaPen className="text-green-400 mr-1" />{truncate(author, 12)}
                </p>
                <div className="flex justify-between items-center text-xs">
                    {rented && (
                        <span className="text-xs text-green-500 flex items-center font-bold px-2 py-0.5 rounded-full border border-green-500">
                            <GrStatusGood className="mr-1" /> Rented
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default Books;
