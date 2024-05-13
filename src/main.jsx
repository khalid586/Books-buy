import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root.jsx';
import Homepage from './Pages/Homepage.jsx';
import Detailspage from './Pages/Detailspage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    children:[
      {
        index:true,
        element:<Homepage></Homepage>,
      },
      {
        path:'/details',
        element: <Detailspage></Detailspage>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
