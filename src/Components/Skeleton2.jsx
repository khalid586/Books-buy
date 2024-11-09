import React from 'react';

function Skeleton2() {
    return (
        <div className="ml-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array(8).fill(null).map((_, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-200 animate-pulse">
                    {/* Smaller image placeholder */}
                    <div className="bg-gray-300 h-32 w-full mb-3 rounded-md"></div>

                    {/* Smaller title placeholder */}
                    <div className="bg-gray-300 h-4 mb-2 rounded w-3/4"></div>

                    {/* Smaller subtitle placeholder */}
                    <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
                </div>
            ))}
        </div>
    );
}

export default Skeleton2;
