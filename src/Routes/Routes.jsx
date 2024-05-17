import { createBrowserRouter } from "react-router-dom";
import Root from '../Root'
import Homepage from '../Pages/Homepage'
import Detailspage from '../Pages/Detailspage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'
import ProfilePage from "../Pages/ProfilePage";

const  router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
  
      children:[
        {
          index:true,
          element:<Homepage></Homepage>
        },
        {
          path:'/details',
          element: <Detailspage></Detailspage>
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
          element:<ProfilePage></ProfilePage>
        },
      ]
    },
  ]);

export default router;