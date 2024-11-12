import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Books from './Books';
import BooksSkeleton from './BooksSkeleton';

function Featured() {
  const [books, setBooks] = useState([]);
  const[loading,setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('https://b9a11-server-side-khalid586.vercel.app/featured')
      .then(res => res.data)
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching featured items:', error));
  }, []);

  if(loading){
    return(
        <BooksSkeleton></BooksSkeleton>
    )
  }

  return (
    <div className='mt-8'>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
        <span className='bg-red-500 text-white px-2 rounded-lg'>Featured</span> Books
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
