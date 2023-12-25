import React from 'react'
import { useParams } from 'react-router-dom';

const BookingPage = () => {
    const params = useParams();
    console.log(params);
  return (
    <div>BookingPage</div>
  )
}

export default BookingPage