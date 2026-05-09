import express from 'express';
import TrainerController from '../controllers/trainerController.js';

const trainerRouter = express.Router();

trainerRouter.get('/', TrainerController.index);
trainerRouter.post('/', TrainerController.create);
trainerRouter.post('/update', TrainerController.update);
trainerRouter.post('/delete', TrainerController.delete);

export default trainerRouter;