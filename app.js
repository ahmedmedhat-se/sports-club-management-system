// Main App Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

import dashboardRouter from './routes/dashboardRoutes.js';
import memberRouter from './routes/memberRoutes.js';
import trainerRouter from './routes/trainerRoutes.js';
import activityRouter from './routes/activityRoutes.js';
import facilityRouter from './routes/facilityRoutes.js';
import scheduleRouter from './routes/scheduleRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import participationRouter from './routes/participationRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success = req.query.success || '';
  res.locals.error = req.query.error || '';
  next();
});

// Routes
app.use('/', dashboardRouter);
app.use('/members', memberRouter);
app.use('/trainers', trainerRouter);
app.use('/activities', activityRouter);
app.use('/facilities', facilityRouter);
app.use('/schedules', scheduleRouter);
app.use('/reservations', reservationRouter);
app.use('/participations', participationRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    currentPage: ''
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Server Error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {},
    currentPage: ''
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;