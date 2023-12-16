import React from 'react'
import { Link, useLocation} from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FiList } from "react-icons/fi";
import { MdPlace } from "react-icons/md";

const AccountNavPage = () => {
    const {pathname} = useLocation();
    console.log(pathname);
    let subpage = pathname.split('/')?.[2];
    console.log(subpage);
    if(subpage === undefined) {
        subpage = 'profile';
    }
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
  return (
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
  )
}

export default AccountNavPage