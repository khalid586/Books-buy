import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('your-image-url.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-transparent flex justify-center items-center">
        <div className="text-center text-white px-6 py-4 md:px-16 md:py-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unleash Your thrist for knowledge</h1>
          <p className="text-lg md:text-xl mb-6 font-bold">Explore exclusive books tailored <span className=' text-red-500'>just</span> for you.</p>
          <Link to="/available" className="bg-red-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
