import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AccountNavPage from './AccountNavPage'
import axios from 'axios'
import BookingsPageItem from '../BookingsPageItem'

const BookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchAllBookings = async () => {
            const {data} = await axios.get("/api/bookings/myBookings");
            setBookings(data);
            console.log(data);
        }
        fetchAllBookings();
    }, [])
  
  return (
    <div>
        <AccountNavPage />
        <div>
            {
                bookings?.length>0 && bookings.map(booking => (
                    <BookingsPageItem booking={booking} />
                ))
            }
        </div>
    </div>
  )
}

export default BookingsPage