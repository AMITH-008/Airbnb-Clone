import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import { CiUser } from "react-icons/ci";
import { FiList } from "react-icons/fi";
import { MdPlace } from "react-icons/md";


const AccountPage = () => {
    const {loading, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let {subpage} = useParams();

    if(subpage === undefined) {
        subpage = 'profile';
    }

    

    if(loading) {
        return <div>
            Loading.....
        </div>
    }

    
    console.log(subpage);

    const linkClasses = (type=null) => {
        let classes = "py-2 px-6 inline-flex gap-1 items-center rounded-full cursor-pointer";
        console.log(type);
        console.log(subpage);
        if (type === subpage) {
            classes += " bg-primary text-white"
        } else {
            classes += " bg-gray-200"
        }
        console.log(classes);
        return classes;
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    if(!user && !loading) {
        return <Navigate to='/login' />
    }
  return (
    <div>
        <nav className='w-full flex mt-8 gap-2 justify-center mb-8'>
            <Link className={linkClasses('profile')} to="/account">
                <CiUser />
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to="/account/bookings">
                <FiList />
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to="/account/places">
                <MdPlace />
                My Accomodations
            </Link>
        </nav>
        {
            subpage === 'profile' && (
            <div className='max-w-lg mx-auto text-center'>
                Logged in as <strong>{user.name}</strong>({user.email}) <br />
                <button onClick={logout} className='primary border border-white-20 max-w-sm mt-3 hover:bg-transparent hover:border-primary '>Logout</button>
            </div>
        )}
        {
            subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )
        }
    </div>
  )
}

export default AccountPage