import React from 'react'

const BookingWidget = ({place}) => {
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
                      <input type='date'/>
                    </div>
                    <div className=' py-4 px-4 border-l'>
                      <label>Check out:</label>
                      <input type='date'/>
                    </div>
                  </div>
                  <div className='py-3 px-4 border-t'>
                      <label>Number of Guests:</label>
                      <input className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' type='number' value={1}/>
                  </div>
                </div>
                <button className='mt-4 primary border text-white hover:border-primary hover:bg-white hover:text-primary'>Book this place</button>
        </div>
    </>
  )
}

export default BookingWidget