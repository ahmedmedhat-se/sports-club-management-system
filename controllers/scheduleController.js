import Schedule from '../models/Schedule.js';

class ScheduleController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const schedule = await Schedule.findById(id);
        if (!schedule) {
          return res.status(404).render('404', { title: 'Not Found', path: '/schedules' });
        }
        const activities = await Schedule.getActivities();
        const facilities = await Schedule.getFacilities();
        const trainers = await Schedule.getTrainers();
        return res.render('schedules', {
          title: 'Edit Schedule',
          schedule,
          activities,
          facilities,
          trainers,
          action: 'edit',
          path: '/schedules'
        });
      }
      
      if (action === 'create') {
        const activities = await Schedule.getActivities();
        const facilities = await Schedule.getFacilities();
        const trainers = await Schedule.getTrainers();
        return res.render('schedules', {
          title: 'Add Schedule',
          activities,
          facilities,
          trainers,
          action: 'create',
          path: '/schedules'
        });
      }
      
      const schedules = await Schedule.findAll();
      res.render('schedules', {
        title: 'Schedules',
        schedules,
        action: 'list',
        path: '/schedules'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load schedules',
        path: '/schedules'
      });
    }
  }

  static async create(req, res) {
    try {
      await Schedule.create(req.body);
      res.redirect('/schedules?success=Schedule created successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/schedules?error=Failed to create schedule');
    }
  }

  static async update(req, res) {
    try {
      await Schedule.update(req.query.id, req.body);
      res.redirect('/schedules?success=Schedule updated successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/schedules?error=Failed to update schedule');
    }
  }

  static async delete(req, res) {
    try {
      await Schedule.delete(req.query.id);
      res.redirect('/schedules?success=Schedule deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/schedules?error=Failed to delete schedule');
    }
  }
}

export default ScheduleController;