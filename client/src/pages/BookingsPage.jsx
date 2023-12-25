import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AccountNavPage from './AccountNavPage'
import axios from 'axios'

const BookingsPage = () => {


    useEffect(() => {
        const fetchAllBookings = async () => {
            const {data} = await axios.get("/bookings");
            console.log(data);
        }
        fetchAllBookings();
    }, [])
  
  return (
    <div>
        <AccountNavPage />
        <div>

        </div>
    </div>
  )
}

export default BookingsPage