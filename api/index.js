import express, { response } from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'
import download from 'image-downloader'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import multer from 'multer';
import Place from './models/Place.js'
import BookingModel from './models/Booking.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import placeRouter from './routes/placeRoutes.js';


const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename);


const app = express();
dotenv.config();

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.use(cookieParser())

app.use(express.json());

app.use('/uploads', express.static(__dirname+'/uploads'));

app.get('/', (request, response) => {
    response.send("Hello World");
});

mongoose.connect(process.env.MONGO_DB_URL, {
    
})

app.use('/api/auth', authRouter);

app.use('/api/user', userRouter);

app.use('/api/places', placeRouter);


app.post('/uploadPhotoByLink', async (request, response) => {

    const link = request.body.link;
    console.log(link);
    const newName = "img"+Date.now() + '.jpg';
    await download.image({
        url:link,
        dest: __dirname+'/uploads/'+newName,
        timeout:10000
    });
    response.status(200).json({newName});
});

const photosMiddleware = multer({dest:'uploads/'})
app.post('/uploadPhotos', photosMiddleware.array("photos", 40),(request, response) => {
    const files = request.files;
    const data = Array();
    for(let i=0;i<files.length;i++) {
        data[i] = files[i].filename;
    }
    console.log(data);
    response.status(200).json(data);
});




// app.get('/places/:id', async (request, response)=> {
//     const {id} = request.params;
//     response.status(200).json(await Place.findById(id));
// });

// app.put('/places/:id', async (request, response) => {

//     const {bookapp} = request.cookies;
//     const {id} = request.params;
//     const {title,
//         address,
//         description,
//         extraInfo,
//         checkIn,checkOut,
//         maxGuests,
//         perks, addedPhotos, price } = request.body;
//     if(bookapp) {
//         jwt.verify(bookapp, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
//             if(err) {
//                 throw err;
//             }
//             const placeDoc = await Place.findByIdAndUpdate(id,{
//                 ownner:user.id,
//                 title: title,
//                 address: address,
//                 description: description,
//                 extraInformation:extraInfo,
//                 perks: perks,
//                 checkIn: checkIn,
//                 checkOut: checkOut,
//                 maxGuests: maxGuests,
//                 pics: addedPhotos,
//                 price: price
//             })
//             response.json(placeDoc);
//         })
//     } else {
//         response.json(null);
//     }

// })

// app.get('/allPlaces', async (request, response) => {
//     response.status(200).json(await Place.find());
// })

app.post("/booking" , (request, response) => {
    //Further Development allow only the logged in users to book a place
    const {place, checkIn, checkOut, numberOfGuests, name, phone , price, userID} = request.body;
    BookingModel.create({
        place, checkIn, checkOut, numberOfGuests, name, phone , price, userID
    }).then((doc) => {
       response.status(202).json(doc)
    }).catch(err => {
        response.status(202).json(err);
    })

})

function getUserDataFromToken ( token ) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData)=> {
            if(err) reject(err);
            resolve(userData);
        });
    })
}

app.get("/bookings" ,  async (request, response) => {
    const {bookapp} = request.cookies;
    const userData = await getUserDataFromToken(bookapp);
    response.json(await BookingModel.find({userID:userData.id}).populate('place'))

});

app.listen(3000, () => {
    console.log("Server up and running on port 3000");
})