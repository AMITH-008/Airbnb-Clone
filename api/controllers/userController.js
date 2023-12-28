import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Place from '../models/Place.js'


export const profile = (request, response) => {
    const {bookapp} = request.cookies;
    if(bookapp) {
        jwt.verify(bookapp, process.env.JWT_SECRET_KEY, {}, (err, user) => {
            if(err) {
                throw err;
            }
            User.findById(user.id)
                .then(data=> {
                    const {password, ...rest} = data._doc
                    console.log(rest);
                    response.json(rest);
                })
                .catch(err => console.log(err));
            
        })
    } else {
        response.json(null);
    }
}

export const addPlace = (request, response) => {

    const {bookapp} = request.cookies;
    const {title,
        address,
        description,
        extraInfo,
        checkIn,checkOut,
        maxGuests,
        perks, addedPhotos, price } = request.body;
    if(bookapp) {
        jwt.verify(bookapp, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
            if(err) {
                throw err;
            }
            const placeDoc = await Place.create({
                ownner:user.id,
                title: title,
                address: address,
                description: description,
                extraInformation:extraInfo,
                perks: perks,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests,
                pics: addedPhotos,
                price: price
            })
            response.json(placeDoc);
        })
    } else {
        response.json(null);
    }
}

export const myPlaces = (request, response) => {
    const {bookapp} = request.cookies;
    if(bookapp) {
        jwt.verify(bookapp, process.env.JWT_SECRET_KEY, {}, async (err, user)=> {
            const {id} = user;
            response.json(await Place.find({ownner:id}))
        })
    }
}