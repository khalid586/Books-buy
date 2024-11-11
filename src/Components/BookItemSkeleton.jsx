import React from 'react';


function BookItemSkeleton() {
    const skeletons = [];

    for(let i = 0 ; i < 16 ; i++){
        skeletons.push(
            <div className="card bg-white border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-200 ease-in-out">
                <div className="flex items-start">
                    <div className="w-24 h-24 bg-gray-300 rounded-full animate-shimmer mr-4"></div>
                    <div className="flex-auto">
                        <div className="h-6 bg-gray-300 w-3/4 rounded animate-shimmer mb-2"></div>
                        <div className="h-4 bg-gray-300 w-1/2 rounded animate-shimmer mb-2"></div>
                        <div className="flex justify-between items-center mb-3">
                            <div className="h-4 bg-gray-300 w-1/4 rounded animate-shimmer"></div>
                            <div className="h-6 bg-gray-300 w-20 rounded animate-shimmer"></div>
                        </div>
                    </div>
                </div>
    
                <div className="flex justify-between items-center mt-3">
                    <div className="h-6 bg-gray-300 w-24 rounded animate-shimmer"></div>
                    <div className="flex space-x-2">
                        <div className="h-8 bg-gray-300 w-20 rounded animate-shimmer"></div>
                        <div className="h-8 bg-gray-300 w-20 rounded animate-shimmer"></div>
                    </div>
                </div>
            </div>
        )
    }
    return ( 
        <div className='mx-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        {
            skeletons.map( skeleton => <div>{skeleton}</div>)
        }
        </div>
    );
}

export default BookItemSkeleton;
