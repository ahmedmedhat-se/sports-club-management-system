import express from 'express';
import FacilityController from '../controllers/facilityController.js';

const facilityRouter = express.Router();

facilityRouter.get('/', FacilityController.index);
facilityRouter.post('/', FacilityController.create);
facilityRouter.post('/update', FacilityController.update);
facilityRouter.post('/delete', FacilityController.delete);

export default facilityRouter;