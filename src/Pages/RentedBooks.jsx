import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';

function RentedBooks() {
    const {user,loading} = useContext(AuthContext);
    const [pageloading,setPageLoading] = useState(true);

    useEffect(()=>{
        setPageLoading(false)
    },[])
    return (
        <div>
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