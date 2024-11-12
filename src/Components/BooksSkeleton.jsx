import React from 'react'

function BooksSkeleton() {
    return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 my-8">
    {Array.from({ length: 8 }).map((_, index) => (
        <div className="animate-pulse flex flex-col items-center p-4 space-y-2 bg-gray-200 rounded-lg w-full">
            <div className="h-32 w-24 bg-gray-300 rounded-lg"></div> {/* Placeholder for book cover */}
            <div className="h-4 w-20 bg-gray-300 rounded"></div> {/* Placeholder for title */}
            <div className="h-4 w-16 bg-gray-300 rounded"></div> {/* Placeholder for author */}
        </div>
    ))}
    </div>
      
    );
  }

export default BooksSkeleton