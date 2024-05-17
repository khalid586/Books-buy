import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider'

function Navbar() {
    const list = 
    <div className='flex flex-col lg:flex-row gap-2'>
        <li> <Link>tem 1</Link> </li>
        <li> <Link>Item 3</Link> </li>
    </div>

    const {user,loading} = useContext(AuthContext);
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {list}
                </ul>
            </div>
        <Link className="font-bold text-xl mx-[-4px]">Books Buy</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            {list}
        </ul>
        </div>
        <div className="navbar-end my-">
            {
               loading? <div> loading </div>:
               
               <div> 
                {
                user ? 
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="mx-2 ">
                        <img src = {user.photoURL} width={30} className='border-green-500 border-4 rounded-full'></img>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to = '/profile'>Profile</Link></li>
                        <li><Link>My rented books</Link></li>
                    </ul>
                </div>
                // <div className=" dropdown-left dropdown-end">
                //     <div tabIndex={0} role="button" className="btn m-1">
                //     <div>
                //         <img src = {user.photoURL} width={30} className='border-green-500 border-4 rounded-full'></img>
                //     </div>
                //     </div>
                //     <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                //         <li><Link>Profile</Link></li>
                //         <li><Link>My rented books</Link></li>
                //     </ul>
                // </div>
                    :
                    <Link to = '/login' className="btn">Login</Link>
               } 

               </div>
            }
        </div>
    </div>
    )
}

export default Navbar