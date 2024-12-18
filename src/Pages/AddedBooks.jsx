import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';
import axios from 'axios';
import BookItem from '../Components/BookItem';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import BookItemSkeleton from '../Components/BookItemSkeleton';


function AddedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [books,setBooks] = useState([]);
    const [wait,setWait] = useState(true);


    useEffect(()=>{
        if(user){
            axios.get(`https://b9a11-server-side-khalid586.vercel.app/added_books/${user.email}`)
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
        const rating = parseFloat(form.rating.value);

        const Info = {
            name,genre,photoUrl,author,copies,rating
        }
        setWait(true);
        axios.patch(`https://b9a11-server-side-khalid586.vercel.app/update/${bookId}`,Info)
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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                setWait(true);
                axios.delete(`https://b9a11-server-side-khalid586.vercel.app/delete/${bookId}`)
                .then(res => res.data)
                .then(data => {
                    const {deletedCount} = data;
                    if(deletedCount){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Deleted Successfully!",
                            icon: "success"
                        });

                        setWait(false);
                    }
                })
                .catch(err => console.error(err))
            }
          });
        
    }

    return (
        <div>
            {
                loading || wait? <BookItemSkeleton></BookItemSkeleton>
                :
                <div className='text-center'>
                    <p className='font-bold mt-6 text-xl'>{books.length > 0?'You have added the following books':"You haven't added any books yet!"}</p> <br />
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