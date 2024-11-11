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
import BestSeller from '../Components/BestSeller';
import Featured from '../Components/Featured';

function Detailspage() {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rented, setRented] = useState(false);

  // Fetch book details
  const { data: book = {}, isLoading: reload } = useQuery({
    queryKey: ['bookDetails', id],
    queryFn: async () => {
      const res = await axios.get(`https://b9a11-server-side-khalid586.vercel.app/details/${id}`);
      return res.data;
    },
  });

  const { _id, name, genre, photoUrl, author, copies, rating, uploaderEmail, rentedBy } = book;

  useEffect(() => {
    if (user && rentedBy) {
      setRented(rentedBy.some((personMail) => personMail === user.email));
    }
  }, [user, rentedBy, loading]);

  const style = { width: '100%', height: 'auto', maxWidth: '600px' };

  // Navigation function
  const navigateToRentedBooks = () => {
    setTimeout(() => {
      navigate('/rented_books');
    }, 1500);
  };

  // Rent and Return mutations
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

  if(reload){
    return <Spinner></Spinner>
  }

  return (
      <div>
        <div className="my-4 mx-4 flex flex-col lg:flex-row items-center lg:h-[60vh]">
            <div className="card lg:card-side bg-base-100 w-full lg:w-2/3 shadow-lg p-6 rounded-lg">
              <figure className="flex-1">
                <img style={style} className="rounded-xl" src={photoUrl} alt={name} />
              </figure>
              <div className="card-body flex-1">
                <div className="mb-4 flex gap-2">
                  <span className={`text-xs px-4 py-2 rounded-full font-bold ${genre === 'Fiction' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-500'}`}>
                    {genre}
                  </span>
                  <span className={`text-xs border-2 rounded-full p-2 font-bold ${copies > 0 ? 'text-green-500 border-green-400' : 'text-red-500 border-red-400'}`}>
                    {copies > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <h2 className="card-title font-extrabold text-2xl">{name}</h2>
                <span className="font-bold text-gray-500 flex gap-1 items-center">
                  <FaPenFancy className="text-red-600 text-lg" /> {author}
                </span>
                <div className="mb-8 mt-4 flex flex-col gap-2">
                  <span className="font-bold text-lg flex items-center gap-1">
                    <PiBooks className="text-blue-600" /> Available copies: {copies}
                  </span>
                  <span className="font-bold text-lg flex items-center gap-1">
                    <VscGraph className="text-violet-500" /> Rating: {rating} <FaStar className="text-yellow-500" />
                  </span>
                </div>
                {user.email === uploaderEmail ? (
                  <div className="flex flex-col items-start">
                    <div className="flex gap-1 items-center font-bold">
                      <MdDriveFolderUpload className="text-2xl text-violet-600" />
                      <span className="text-blue-600 text-sm">Uploaded by you</span>
                    </div>
                    <Link to="/added_books" className="mt-8 px-4 py-2 rounded-full border-2 border-green-500 text-green-500 font-bold hover:bg-green-500 hover:text-white">
                      Update
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-4">
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
                <div className="mt-4">
                  <Link to="/" className="px-4 py-2 rounded-full text-white bg-red-500">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          <ToastContainer />
        </div>
        <BestSeller></BestSeller>
        <Featured></Featured>
      </div>
  );
}

export default Detailspage;
