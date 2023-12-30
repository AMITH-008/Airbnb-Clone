import { format } from 'date-fns'
import React from 'react'
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router-dom';


const BookingsPageItem = ({booking}) => {

 console.log(booking.checkIn);
 console.log(format(booking.checkIn,"dd-MM-yyyy"))
  return (
    <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
        <div className='w-36'>
            {
                booking.place.pics?.length>0 && 
                (
                    <img className='object-cover' src={booking.place.pics[0]} alt="Image" />
                )
            }
        </div>
        <div className='py-2 grow'>
            <h2 className='text-xl font-semibold mb-1'>{booking.place.title}</h2>
            <div className='flex gap-2 items-center border-t border-gray-400 mt-2 py-2 text-xl'>
                <SlCalender />
                {format(booking.checkIn,"dd-MM-yyyy") }
                &rarr;
                <SlCalender />
                { format(booking.checkOut, "dd-MM-yyyy")}
            </div>
            <div className='text-xl'>
                Total Price: ${booking.price}
            </div>
            <div className='text-xl'>
                Contact: {booking.phone}
            </div>
            <div className='text-xl'>
                Name: {booking.name}
            </div>
        </div>
        
    </Link>
  )
}

export default BookingsPageItem