import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Spinner from '../Components/Spinner';
import BookItemSkeleton from '../Components/BookItemSkeleton';

function ProtectedRoute({children, loader}) {
    const {user,loading} = useContext(AuthContext);
    const {pathname} = useLocation();

    if(loading){
        return loader
    }

    if(user){
        return children;
    }

    return <Navigate state = {pathname} to = '/login'></Navigate>
}

export default ProtectedRoute