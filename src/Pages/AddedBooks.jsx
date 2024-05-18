import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';
import axios from 'axios';
import BookItem from '../Components/BookItem';

function AddedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [books,setBooks] = useState([]);
    const [wait,setWait] = useState(true);

    if(!loading){
        if(user){
            useEffect(()=>{
                axios.get(`http://localhost:5007/added_books/${user.email}`)
                .then(res => res.data)
                .then(data => {setBooks(data);setWait(false);})
            },[wait])
        }
    }

    function handleUpdate(){

    }

    return (
        <div>
            {
                loading || wait? <Spinner></Spinner>
                :
                <div className='text-center'>
                    <p className='font-bold mt-6 text-xl'>You have added the following books</p> <br />
                </div>
            }         
            <div className='mx-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
            {
                books.map(book=><BookItem book = {book} update = 'true'></BookItem>)
            }
            </div>
        </div>
    )
}

export default AddedBooks