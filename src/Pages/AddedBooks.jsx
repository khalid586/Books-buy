import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';
import axios from 'axios';
import BookItem from '../Components/BookItem';
import { ToastContainer, toast } from 'react-toastify';

function AddedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [books,setBooks] = useState([]);
    const [wait,setWait] = useState(true);


    useEffect(()=>{
        if(user){
            axios.get(`http://localhost:5007/added_books/${user.email}`)
            .then(res => res.data)
            .then(data => {setBooks(data);setWait(false);})
        }
    },[loading,wait])


    function handleUpdate(e,bookId){
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const genre = form.genre.value;
        const author = form.author.value;
        const copies = parseInt(form.copies.value);
        const rating = parseInt(form.rating.value);

        const Info = {
            name,genre,photoUrl,author,copies,rating
        }
        setWait(true);
        axios.patch(`http://localhost:5007/update/${bookId}`,Info)
        .then(res => res.data)
        .then(data => {
            console.log(data);
            
            if(data.modifiedCount){
                toast.success('Updated Successfully');
            }
            else{
                toast.error("You haven't upddated any information")
            }
            setWait(false);
        })
        .catch(error => {toast.error(error)})
        
    }
    function handleDelete(bookId){
        axios.delete(`http://localhost:5007/delete/${bookId}`)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(err => console.error(err))
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
                books.map(book=><BookItem key = {book._id} handleDelete = {handleDelete} handleUpdate = {handleUpdate} book = {book} update = 'true'></BookItem>)
            }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default AddedBooks