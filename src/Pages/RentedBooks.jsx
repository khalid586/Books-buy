import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';
import { Helmet } from 'react-helmet';

function RentedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [pageloading,setPageLoading] = useState(true);

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
            <div className='text-center w-full'>
                {
                    !loading ? 
                    <div>
                    {
                        user.email
                    }
                    </div>
                    :
                    <div>
                        <Spinner></Spinner>
                    </div>
                }
            </div>
        }
        </div>
    )
}

export default RentedBooks