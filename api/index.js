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
import bookingRouter from './routes/bookingRoutes.js';


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

app.use('/api/bookings', bookingRouter);


app.listen(3000, () => {
    console.log("Server up and running on port 3000");
})