import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    ownner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title: {
        type:String,

    },
    address: {
        type:String,

    },
    pics: {
        type: [String]
    },

    description: {
        type: String
    },

    perks : {
        type: [String]
    },
    extraInformation: {
        type: String
    },

    checkIn: {
        type: Number
    },

    checkOut: {
        type: Number
    },

    maxGuests: {
        type: Number
    },

    price: {
        type: Number,
        default: 100
    }
})

const PlaceModel = mongoose.model('Place', PlaceSchema);

export default PlaceModel;