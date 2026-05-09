import Activity from '../models/Activity.js';

class ActivityController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const activity = await Activity.findById(id);
        if (!activity) {
          return res.status(404).render('404', { title: 'Not Found', path: '/activities' });
        }
        const difficultyLevels = await Activity.getDifficultyLevels();
        return res.render('activities', { 
          title: 'Edit Activity', 
          activity, 
          difficultyLevels, 
          action: 'edit', 
          path: '/activities' 
        });
      }
      
      if (action === 'create') {
        const difficultyLevels = await Activity.getDifficultyLevels();
        return res.render('activities', { 
          title: 'Add Activity', 
          difficultyLevels, 
          action: 'create', 
          path: '/activities' 
        });
      }
      
      const activities = await Activity.findAll();
      res.render('activities', { 
        title: 'Activities', 
        activities, 
        action: 'list', 
        path: '/activities' 
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error', 
        message: error.message, 
        path: '/activities' 
      });
    }
  }

  static async create(req, res) {
    try {
      await Activity.create(req.body);
      res.redirect('/activities?success=Activity created successfully');
    } catch (error) {
      res.redirect('/activities?error=Failed to create activity');
    }
  }

  static async update(req, res) {
    try {
      await Activity.update(req.query.id, req.body);
      res.redirect('/activities?success=Activity updated successfully');
    } catch (error) {
      res.redirect('/activities?error=Failed to update activity');
    }
  }

  static async delete(req, res) {
    try {
      await Activity.delete(req.query.id);
      res.redirect('/activities?success=Activity deleted successfully');
    } catch (error) {
      res.redirect('/activities?error=Failed to delete activity');
    }
  }
}

export default ActivityController;