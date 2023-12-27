import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (request, response) => {
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
    
}

export const logIn = async (request, response)=> {
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
}


export const logout = (request, response) => {
    response.cookie('bookapp', '').json(true);
}