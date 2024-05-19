import { createBrowserRouter } from "react-router-dom";
import Root from '../Root'
import Homepage from '../Pages/Homepage'
import Detailspage from '../Pages/Detailspage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'
import ProfilePage from "../Pages/ProfilePage";
import RentedBooks from "../Pages/RentedBooks";
import AddBook from "../Pages/AddBook";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../Pages/ErrorPage";
import axios from "axios";
import AvailableBooks from "../Pages/AvailableBooks";
import AddedBooks from "../Pages/AddedBooks";

const  router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>, 
      children:[
        {
          index:true,
          element:<Homepage></Homepage>,          
        },
        {
          path:'/details/:id',
          element:<ProtectedRoute> <Detailspage></Detailspage></ProtectedRoute>,
          loader:({params})=>axios.get(`https://b9a11-server-side-khalid586.vercel.app/details/${params.id}`).then(res => res.data)
        },
        {
          path:'/login',
          element: <LoginPage></LoginPage>
        },
        {
          path:'/register',
          element: <RegisterPage></RegisterPage>
        },
        {
          path:'/profile',
          element:<ProtectedRoute> <ProfilePage></ProfilePage></ProtectedRoute>
        },
        {
          path:'/rented_books',
          element:<ProtectedRoute><RentedBooks></RentedBooks></ProtectedRoute> ,
        },
        {
          path:'/added_books',
          element:<ProtectedRoute><AddedBooks></AddedBooks></ProtectedRoute> ,
        },
        {
          path:'/add_book',
          element:<ProtectedRoute><AddBook></AddBook></ProtectedRoute> 
        },
        {
          path:'/available',
          element:<ProtectedRoute><AvailableBooks></AvailableBooks></ProtectedRoute> ,
        },
      ]
    },
  ]);

export default router;