import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('your-image-url.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent flex justify-center items-center">
        <div className="text-center text-white px-6 py-4 md:px-16 md:py-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unleash Your Fashion</h1>
          <p className="text-lg md:text-xl mb-6">Explore exclusive styles and trends tailored for you.</p>
          <Link to="/available" className="bg-yellow-500 text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
