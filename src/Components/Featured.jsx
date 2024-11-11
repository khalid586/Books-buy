import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Books from './Books';

function Featured() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    axios.get('https://b9a11-server-side-khalid586.vercel.app/featured')
      .then(res => res.data)
      .then(data => {
        setBooks(data);
      })
      .catch(error => console.error('Error fetching featured items:', error));
  }, []);

  return (
    <div className='mt-8'>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wide">
        <span className='bg-red-500 text-white px-2 rounded-xl'>Featured</span> Books
      </h1>
      <div className='bg-red-100 rounded-xl py-4 gap-4 grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8  my-4'>
      {
        books.map(book => 
            <Books book = {book} key = {book._id}></Books>
        )
      }
      </div>
    </div>

  );
}

export default Featured;
