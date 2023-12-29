import express from 'express';
import { editPlace, getAllPlaces, getPlace } from '../controllers/placeController.js';

const router = express.Router();

router.get('/:id', getPlace);

router.put('/:id', editPlace);

router.get('/', getAllPlaces);

export default router;