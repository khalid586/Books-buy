import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import BookItem from '../Components/BookItem';
import { Link } from 'react-router-dom';

function RentedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [pageloading,setPageLoading] = useState(true);
    const [books,setBooks] = useState([])

    useEffect(()=>{
        axios.get(`https://b9a11-server-side-khalid586.vercel.app/rented/${user.email}`)
        .then(res => res.data)
        .then(data => setBooks(data))
    },[])

    useEffect(()=>{
        setPageLoading(false)
    },[])
    return (
        <div>
        <Helmet>
            <title>Books Buy | Rented Books</title>
        </Helmet>
        {
            pageloading?<Spinner></Spinner>
            :
            <div> 
                <p className='text-center my-4 text-xl font-bold '>{books.length > 0 ?'Rented books':"You haven't rented any books yet!"}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4'>
                    {
                        books.map(
                            book => <BookItem rent = {true} book = {book}></BookItem>
                        )
                    }
                </div>
            </div>
        }
        <div className='text-center mt-16'>
            <Link to ='/' className='px-4 py-2 rounded-full text-white bg-red-500'>Back to home</Link>
        </div>
        </div>
    )
}

export default RentedBooks