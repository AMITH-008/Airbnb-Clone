import express from 'express';
import { addNewBooking, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post("/addBooking", addNewBooking);

router.get("/myBookings", getMyBookings);

export default router;
