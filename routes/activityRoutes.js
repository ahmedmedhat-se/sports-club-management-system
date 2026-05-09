import express from 'express';
import ActivityController from '../controllers/activityController.js';

const activityRouter = express.Router();

activityRouter.get('/', ActivityController.index);
activityRouter.post('/', ActivityController.create);
activityRouter.post('/update', ActivityController.update);
activityRouter.post('/delete', ActivityController.delete);

export default activityRouter;