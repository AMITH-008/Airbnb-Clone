import jwt from 'jsonwebtoken';
import Place from '../models/Place.js' 


export const getPlace = async (request, response)=> {
    const {id} = request.params;
    response.status(200).json(await Place.findById(id));
};


export const editPlace = async (request, response) => {

    const {bookapp} = request.cookies;
    const {id} = request.params;
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
            const placeDoc = await Place.findByIdAndUpdate(id,{
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
};

export const getAllPlaces = async (request, response) => {
    console.log("AllPlaces");
    response.status(200).json(await Place.find());
};