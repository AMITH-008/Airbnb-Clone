import express from 'express';
import { addPlace, myPlaces, profile } from '../controllers/userController.js';

const router = express.Router();

router.get("/profile", profile);

router.post("/places", addPlace);

router.get("/myPlaces", myPlaces);




export default router;
