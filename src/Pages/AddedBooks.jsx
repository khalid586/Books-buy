import React, { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import Spinner from '../Components/Spinner';

function AddedBooks() {
    const {user,loading} = useContext(AuthContext);

    return (
        <div>
        {
            loading ? <Spinner></Spinner>
            :
            <div className='text-center'>
                Added Books page <br />
                {user.displayName}
            </div>
        }
        </div>
    )
}

export default AddedBooks