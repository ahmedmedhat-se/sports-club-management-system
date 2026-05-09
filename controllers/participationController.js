import Participation from '../models/Participation.js';

class ParticipationController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const participation = await Participation.findById(id);
        if (!participation) {
          return res.status(404).render('404', { title: 'Not Found', path: '/participations' });
        }
        const members = await Participation.getMembers();
        const activities = await Participation.getActivities();
        return res.render('participations', {
          title: 'Edit Participation',
          participation,
          members,
          activities,
          action: 'edit',
          path: '/participations'
        });
      }
      
      if (action === 'create') {
        const members = await Participation.getMembers();
        const activities = await Participation.getActivities();
        return res.render('participations', {
          title: 'Add Participation',
          members,
          activities,
          action: 'create',
          path: '/participations'
        });
      }
      
      const participations = await Participation.findAll();
      res.render('participations', {
        title: 'Participations',
        participations,
        action: 'list',
        path: '/participations'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load participations',
        path: '/participations'
      });
    }
  }

  static async create(req, res) {
    try {
      await Participation.create(req.body);
      res.redirect('/participations?success=Participation created successfully');
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.message === 'Member already enrolled in this activity' 
        ? error.message 
        : 'Failed to create participation';
      res.redirect(`/participations?error=${encodeURIComponent(errorMsg)}`);
    }
  }

  static async update(req, res) {
    try {
      await Participation.update(req.query.id, req.body);
      res.redirect('/participations?success=Participation updated successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/participations?error=Failed to update participation');
    }
  }

  static async delete(req, res) {
    try {
      await Participation.delete(req.query.id);
      res.redirect('/participations?success=Participation deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/participations?error=Failed to delete participation');
    }
  }
}

export default ParticipationController;