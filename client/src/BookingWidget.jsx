import React, { useState } from 'react'
import  { differenceInCalendarDays } from 'date-fns';

const BookingWidget = ({place}) => {
  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0,10));
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  let numberOfNights = 0;

  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  
  const handleCheckInChange = (event) => {
    setCheckIn(event.target.value);
  }

  const handleCheckOutChange = (event) => {
    setCheckOut(event.target.value);
  }

  const handleNumberOfGuestsChange = (event) => {
    setNumberOfGuests(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  return (
    <>
        <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center mb-2'>
                  Price: {place.price}$/ night
                </div>
                <div className='border rounded-2xl mt-4'>
                  <div className='flex'>
                    <div className=' py-4 px-4 '>
                      <label>Check in:</label>
                      <input 
                      type='date'
                      min={new Date().toISOString().slice(0,10)} 
                      value={checkIn} 
                      onChange={handleCheckInChange}/>
                    </div>
                    <div className=' py-4 px-4 border-l'>
                      <label>Check out:</label>
                      <input 
                      type='date' 
                      value={checkOut}
                      min={new Date(checkIn).toISOString().slice(0,10)} 
                      onChange={handleCheckOutChange}/>
                    </div>
                  </div>
                  <div className='py-3 px-4 border-t'>
                      <label>Number of Guests:</label>
                      <input 
                      className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' 
                      type='number' 
                      value={1} 
                      onChange={handleNumberOfGuestsChange}/>
                  </div>
                  {numberOfNights > 0 && (
                    <div>
                        <div className='py-3 px-4 border-t'>
                          <label>Enter Full Name</label>
                          <input 
                          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' 
                          type='text' 
                          value={name}
                          placeholder='Username' 
                          onChange={handleNameChange}/>
                        </div>
                        <div className='py-3 px-4 border-t'>
                          <label>Enter Phone Number</label>
                          <input 
                          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' 
                          type='tel' 
                          value={number}
                          placeholder='Phone Number' 
                          onChange={handleNumberChange}/>
                        </div>
                    </div>

                    
                  )}
                </div>
                <button className='mt-4 primary border text-white hover:border-primary hover:bg-white hover:text-primary'>
                  Book this place {
                    checkIn && checkOut && (
                      <span>
                        {numberOfNights > 0 &&
                          (
                            <span>
                               (${numberOfNights * place.price})
                            </span>
                          )
                        }
                      </span>
                    )
                  }
                  
                </button>
        </div>
    </>
  )
}

export default BookingWidget