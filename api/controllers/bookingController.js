import jwt from 'jsonwebtoken';
import BookingModel from '../models/Booking.js';

export const getMyBookings = async (request, response) => {
    const {bookapp} = request.cookies;
    const userData = await getUserDataFromToken(bookapp);
    response.json(await BookingModel.find({userID:userData.id}).populate('place'))
}

export const addNewBooking = (request, response) => {
    //Further Development allow only the logged in users to book a place
    const {place, checkIn, checkOut, numberOfGuests, name, phone , price, userID} = request.body;
    BookingModel.create({
        place, checkIn, checkOut, numberOfGuests, name, phone , price, userID
    }).then((doc) => {
       response.status(202).json(doc)
    }).catch(err => {
        response.status(202).json(err);
    })
}

function getUserDataFromToken ( token ) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData)=> {
            if(err) reject(err);
            resolve(userData);
        });
    })
}