import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('api/places/').then(response => {
      console.log(response.data);
      setPlaces(response.data);
    }).catch(err => console.log(err));
  }, []);
  return (
    <div className='grid grid-cols-4 gap-x-6 gap-y-8 md:grid-cols-3 sm:grid-cols-2 mt-8'>
      {
        places.length > 0 && places.map(place => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div key={place._id}>
              <div className='bg-gray-500 rounded-2xl flex mb-2'>
                {place.pics?.[0] && (
                  <img className='rounded-2xl object-cover aspect-square' src={place.pics?.[0]} alt='' />
                )}
              </div>
              
              <h2 className='font-bold'>{place.address}</h2>
              <h3 className='text-sm '>{place.title}</h3>
              <div>
                <span className='font-bold'>${place.price} per Night</span>
              </div>
            </div>
          </Link>
          
        ))
      }
    </div>
  )
}

export default IndexPage