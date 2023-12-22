import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacePage = () => {
  const {id} = useParams();
  const [place, setPlace] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
        const {data} = await axios.get("/places/"+id);
        console.log(data);
        setPlace({...data});
    }
    fetchData();
  }, [])

  if(!place) return;

  return (
    <div className='mt-4 py-4 bg-gray-100 -mx-8 px-8'>
        <h1 className='text-2xl'>{place.title}</h1>
        <a className="block underline font-semibold" target='_blank' href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
        <div className="grid gap-2 grid-cols-[2fr_1fr] ">
          <div>
            {place.pics?.[0] && (
              
                <img className='aspect-square object-cover' src={"http://localhost:3000/uploads/"+place.pics[0]} alt=''/>
            )}
          </div>
          <div className='grid '>
            
              {place.pics?.[1] && (
                <img className='aspect-square object-cover' src={"http://localhost:3000/uploads/"+place.pics[1]} alt=''/>
              )}
              <div className= 'overflow-hidden'>
              {place.pics?.[2] && (
                  <img className='relative top-2 aspect-square object-cover' src={"http://localhost:3000/uploads/"+place.pics[2]} alt=''/>
                )}
              </div>
            
          </div>
        </div>
    </div>
  )
}

export default PlacePage