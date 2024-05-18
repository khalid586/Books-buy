import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BookItem from '../Components/BookItem';


function AvailableBooks() {
    const books = useLoaderData() || [];
    return (
        <div className='m-4 grid grid-cols-4 gap-3'>
        {
            books.map(book => 
                <div className=''>
                    <BookItem  book = {book} index = {book._id}></BookItem>
                    
                </div>
            )
        }
        </div>
    )
}

export default AvailableBooks