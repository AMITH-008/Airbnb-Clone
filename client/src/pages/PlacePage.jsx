import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TbGridDots } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { RiMapPinLine } from "react-icons/ri";
import BookingWidget from '../BookingWidget';




const PlacePage = () => {
  const {id} = useParams();
  const [place, setPlace] = useState(null);
  const [showAll, setShowAll] = useState(false);
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

  if(showAll) {
    return( 
    <div className=' absolute inset-0 min-w-full  min-h-screen '>
      <div className='bg-gray-200 py-4 px-2 fixed min-w-full flex justify-between'>
          <h1 className='text-xl font-bold underline mr-36'>{place.title}</h1>
          <button onClick={() => setShowAll(false)} className='flex items-center gap-1 p-2 rounded-full shadow shadow-slate-900 top-2 right-2'>
            Close Photos <AiOutlineClose /> 
          </button>
        </div>
      <div className='grid gap-4 p-4 bg-gray-100'>
      {
        place?.pics?.length > 0 && 
        place.pics.map(pic => (
          <div key={pic}cursor-pointer >
            <img className='object-cover w-full' src={"http://localhost:3000/uploads/"+pic} alt="Image" />
          </div>
        ))
      }
      </div>
    </div>
    )
  }

  return (
    <div className='mt-4 py-4 bg-gray-100 -mx-8 px-8 pt-8'>
        <h1 className='text-2xl'>{place.title}</h1>
        <a className="flex items-center gap-1 my-3 underline font-semibold" target='_blank' href={"https://maps.google.com/?q="+place.address}>
          <RiMapPinLine />
          {place.address}
        </a>
        <div className='relative'>
          <div className="grid gap-2 grid-cols-[2fr_1fr] border border-gray-400 rounded-2xl overflow-hidden">
            <div>
              {place.pics?.[0] && (
                
                  <img   onClick={() => setShowAll(true)} className='cursor-pointer aspect-square object-cover w-full' src={"http://localhost:3000/uploads/"+place.pics[0]} alt=''/>
              )}
            </div>
            <div className='grid '>
              
                {place.pics?.[1] && (
                  <img onClick={() => setShowAll(true)}  className='cursor-pointer aspect-square object-cover' src={"http://localhost:3000/uploads/"+place.pics[1]} alt=''/>
                )}
                <div className= 'overflow-hidden'>
                {place.pics?.[2] && (
                    <img onClick={() => setShowAll(true)} className='cursor-pointer relative top-2 aspect-square object-cover' src={"http://localhost:3000/uploads/"+place.pics[2]} alt=''/>
                  )}
                </div>
              
            </div>
          </div>
          <button onClick={event => setShowAll(true)} type='button' className='absolute bottom-2 right-2 p-2 bg-white border border-gray-500 hover:shadow-xl rounded-full font-serif flex items-center gap-1'>
            <TbGridDots  />
            Show More Photos
          </button>
        </div>
        
        <div  className='mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
          <div>
            <div className='my-4'>
              <h2 className='font-semibold text-2xl'>About this place</h2>
              {place.description}
            </div>
              Check-in: {place.checkIn} <br />
              Check-out: {place.checkOut} <br />
              Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className='bg-white -mx-8 px-8 py-8 border-t'>
          <div>
            <h2 className='font-semibold text-2xl'>Extra Information</h2>
          </div>
          <div className='mb-4 mt-2 text-sm text-gray-500 leading-6'>
            {place.extraInformation}
          </div>
        </div>
        
    </div>
  )
}

export default PlacePage