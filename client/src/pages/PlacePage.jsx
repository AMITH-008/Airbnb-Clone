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
    </div>
  )
}

export default PlacePage