import express from 'express';
import DashboardController from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', DashboardController.index);

export default dashboardRouter;