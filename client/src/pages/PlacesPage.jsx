import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";


const PlacesPage = () => {
  return (
    <div className='text-center'>
        <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-1' to={'/account/places/new'}>
            <IoMdAdd className='font-extrabold text-xl' />
            Add new places
        </Link>
    </div>
  )
}

export default PlacesPage