import React from 'react';

function HomepageSkeleton() {
  return (
    <div>
      <div className="relative w-full h-[60vh] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 animate-pulse">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center text-gray-700">
            <div className="w-3/4 h-8 bg-gray-300 mb-6 mx-auto rounded-md"></div>
            <div className="w-2/3 h-6 bg-gray-300 mb-8 mx-auto rounded-md"></div>
            <div className="w-32 h-12 bg-gray-300 mx-auto rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 my-8">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="w-40 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-lg animate-pulse">
            <div className="w-full h-40 bg-gray-300 rounded-md"></div>
            <div className="p-4 bg-gray-200">
              <div className="w-3/4 h-4 bg-gray-400 mb-3 rounded-md"></div>
              <div className="w-1/2 h-4 bg-gray-400 mb-3 rounded-md"></div>
              <div className="w-1/4 h-4 bg-gray-400 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomepageSkeleton;
