import express from 'express';
import ParticipationController from '../controllers/participationController.js';

const participationRouter = express.Router();

participationRouter.get('/', ParticipationController.index);
participationRouter.post('/', ParticipationController.create);
participationRouter.post('/update', ParticipationController.update);
participationRouter.post('/delete', ParticipationController.delete);

export default participationRouter;