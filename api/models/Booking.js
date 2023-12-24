import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    place: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type:Date,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    phone:{
        type: String,
        required: true
    },
    price: {
        type: Number
    }
});


const BookingModel = mongoose.model("booking", bookingSchema);

export default BookingModel;