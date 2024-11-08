import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MdDriveFolderUpload } from 'react-icons/md';
import { VscGraph } from 'react-icons/vsc';
import { FaPenFancy, FaStar } from 'react-icons/fa';
import { PiBooks } from 'react-icons/pi';

function Detailspage() {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rented, setRented] = useState(false);

  // Fetch book details using useQuery
  const { data: book = {}, isLoading: reload } = useQuery({
    queryKey: ['bookDetails', id],
    queryFn: async () => {
      const res = await axios.get(`https://b9a11-server-side-khalid586.vercel.app/details/${id}`);
      return res.data;
    },
  });

  const {
    _id, name, genre, photoUrl, author, copies, rating, uploaderEmail, rentedBy,
  } = book;

  // Check if the user has rented the book
  useEffect(() => {
    if (user && rentedBy) {
      setRented(rentedBy.some((personMail) => personMail === user.email));
    }
  }, [user, rentedBy, loading]);

  const isMobile = window.innerWidth <= 768;
  const style = {
    width: isMobile ? '500px' : '600px',
    height: isMobile ? '300px' : '600px',
  };

  // Navigate to rented books
  const navigateToRentedBooks = () => {
    setTimeout(() => {
      navigate('/rented_books');
    }, 1500);
  };

  // Mutations for rent and return actions
  const rentMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`https://b9a11-server-side-khalid586.vercel.app/rent/${_id}`, { email: user.email });
    },
    onSuccess: () => {
      toast.success('Successfully rented');
      queryClient.invalidateQueries(['bookDetails', id]);
      navigateToRentedBooks();
    },
  });

  const returnMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`https://b9a11-server-side-khalid586.vercel.app/return/${_id}`, { email: user.email });
    },
    onSuccess: () => {
      toast.success('Successfully returned');
      queryClient.invalidateQueries(['bookDetails', id]);
    },
  });

  return (
    <div className="my-4 mx-4 flex items-center lg:h-[80vh]">
      {reload ? (
        <Spinner />
      ) : (
        <div className="w-full card lg:card-side bg-base-100">
          <figure className="w-1/2">
            <img style={style} className="rounded-xl" src={photoUrl} alt="Album" />
          </figure>
          <div className="card-body rounded-3xl">
            <div className="mb-4 flex gap-2">
              <span className={`text-xs px-4 py-2 rounded-full font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                {genre}
              </span>
              <span className={`text-xs border-2 rounded-full p-2 font-bold ${copies > 0 ? 'text-green-500 border-green-400' : 'text-red-500 border-red-400'}`}>
                {copies > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </div>
            <h2 className="card-title font-extrabold">{name}</h2>
            <span className="font-bold text-gray-500 flex gap-1 items-center">
              <FaPenFancy className="text-red-600 text-lg" /> {author}
            </span>
            <div className="mb-16">
              <span className="font-bold py-2 flex gap-0.5 items-center">
                <PiBooks className="text-blue-600 text-xl" />
                Available copies: {copies}
              </span>
              <span className="font-bold flex items-center gap-0.5">
                <VscGraph className="text-xl text-violet-500" />
                Rating: <span className="font-bold"> {rating}</span> <FaStar className="text-green-500" />
              </span>
            </div>
            <div className="my-4">
              {user.email === uploaderEmail ? (
                <div>
                  <div className="flex gap-1 items-center font-bold">
                    <MdDriveFolderUpload className="text-2xl text-violet-600" />
                    <span className="text-blue-600 text-sm">Uploaded by you</span>
                  </div>
                  <div className="mt-16">
                    <Link className="px-4 py-2 rounded-full border-4 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-white" to="/added_books">
                      Update
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  {copies > 0 && !rented ? (
                    <button onClick={() => rentMutation.mutate()} className="btn border-green-400 border-2 text-green-500 bg-white font-bold">
                      Rent Book
                    </button>
                  ) : (
                    copies <= 0 && !rented && <p className="text-red-500 font-semibold">Currently out of stock and can't be rented</p>
                  )}
                  {rented && (
                    <button onClick={() => returnMutation.mutate()} className="btn border-red-400 border-2 text-red-500 bg-white font-bold">
                      Return Book
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <Link to="/" className="px-4 py-2 rounded-full text-white bg-red-500">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Detailspage;
