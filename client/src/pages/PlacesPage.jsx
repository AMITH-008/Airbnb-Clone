import React, {  useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";

import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNavPage from './AccountNavPage';


const PlacesPage = () => {
  
  return (
    <div>
      <AccountNavPage />
        <div className='text-center'>
          <h1>List Of All Added Places</h1>
          <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-1' to={'/account/places/new'}>
              <IoMdAdd className='font-extrabold text-xl' />
              Add new places
          </Link>
        </div>
    </div>
  )
}

export default PlacesPage