import React, {  useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";

import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNavPage from './AccountNavPage';


const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/myPlaces");
      console.log(data);
      setPlaces(data);
    }
    fetchData();
  }, [])
  
  return (
    <div>
      <AccountNavPage />
        <div className='text-center'>
          <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-1' to={'/account/places/new'}>
              <IoMdAdd className='font-extrabold text-xl' />
              Add new places
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-2'>
          {
            places.length > 0 && places.map(place => (
              <Link to={'/account/places/'+place._id} className='cursor-pointer bg-gray-100 p-4 rounded-2xl flex justify-around gap-4'>
                <div className='flex grow rounded-lg w-32 h-32 bg-gray-300 shrink-0'>
                  {place.pics.length > 0 && 
                  <img className=' rounded-lg'  src={"http://localhost:3000/uploads/"+place.pics[0]} alt="Image" />}
                </div>
                <div className='grow-0 shrink'>
                  <h2 className='text-xl font-semibold'>{place.title}</h2>
                  <p className='text-sm mt-2'>{place.description}</p>
                </div>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default PlacesPage