import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'


const app = express();
dotenv.config();

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.use(cookieParser())

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Hello World");
});

mongoose.connect(process.env.MONGO_DB_URL, {
    
})

app.post('/register' , async (request, response) => {
    console.log(request.body);
    try{
        var {name, email, password} = request.body;
        const hashed = bcrypt.hashSync(password, 10)
        const user = new User({
            name:name,
            email:email,
            password: hashed
        });
        const result = await user.save();
        console.log(result);
        response.status(200).json(result);
    }catch(error) {
        console.log(error)
        response.status(422).json(error);
    }
    
})

app.post('/login', async (request, response)=> {
    const {email, password} = request.body;
    console.log(request.body);
    const user = await User.findOne({email});
    if (user) {
        
        const passwordValid = bcrypt.compareSync(password, user.password);
        if( passwordValid ) {
            jwt.sign({email: user.email, id: user._id, name:user.name}, process.env.JWT_SECRET_KEY, {}, (err, token) => {
                if(err) {
                    throw err;
                }
                const {password, ...rest} = user._doc
                console.log(rest);
                response.cookie('bookapp',token).json(rest);
            });
        } else {
            response.status(401).json("UnAuthorized");
        }
    } else {
        response.status(402).json('User Not Found')
    }
});

app.get('/profile', (request, response) => {
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
})

app.post('/logout', (request, response) => {
    response.cookie('bookapp', '').json(true);
})

app.listen(3000, () => {
    console.log("Server up and running on port 3000");
})