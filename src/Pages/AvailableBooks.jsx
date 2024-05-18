import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BookItem from '../Components/BookItem';


function AvailableBooks() {
    const books = useLoaderData() || [];
    return (
        <div>
        {
            books.map(book => 
                <div className='m-4 gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                    <BookItem  book = {book} index = {book._id}></BookItem>
                    
                </div>
            )
        }
        </div>
    )
}

export default AvailableBooks