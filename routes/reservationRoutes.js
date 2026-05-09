import express from 'express';
import ReservationController from '../controllers/reservationController.js';

const reservationRouter = express.Router();

reservationRouter.get('/', ReservationController.index);
reservationRouter.post('/', ReservationController.create);
reservationRouter.post('/update', ReservationController.update);
reservationRouter.post('/delete', ReservationController.delete);

export default reservationRouter;