import express from 'express';
import ScheduleController from '../controllers/scheduleController.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', ScheduleController.index);
scheduleRouter.post('/', ScheduleController.create);
scheduleRouter.post('/update', ScheduleController.update);
scheduleRouter.post('/delete', ScheduleController.delete);

export default scheduleRouter;