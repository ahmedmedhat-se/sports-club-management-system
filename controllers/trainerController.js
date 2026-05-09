import Trainer from '../models/Trainer.js';

class TrainerController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const trainer = await Trainer.findById(id);
        if (!trainer) {
          return res.status(404).render('404', { title: 'Not Found', path: '/trainers' });
        }
        const specializations = await Trainer.getSpecializations();
        return res.render('trainers', { 
          title: 'Edit Trainer', 
          trainer, 
          specializations, 
          action: 'edit', 
          path: '/trainers' 
        });
      }
      
      if (action === 'create') {
        const specializations = await Trainer.getSpecializations();
        return res.render('trainers', { 
          title: 'Add Trainer', 
          specializations, 
          action: 'create', 
          path: '/trainers' 
        });
      }
      
      const trainers = await Trainer.findAll();
      res.render('trainers', { 
        title: 'Trainers', 
        trainers, 
        action: 'list', 
        path: '/trainers' 
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error', 
        message: error.message, 
        path: '/trainers' 
      });
    }
  }

  static async create(req, res) {
    try {
      await Trainer.create(req.body);
      res.redirect('/trainers?success=Trainer created successfully');
    } catch (error) {
      res.redirect('/trainers?error=Failed to create trainer');
    }
  }

  static async update(req, res) {
    try {
      await Trainer.update(req.query.id, req.body);
      res.redirect('/trainers?success=Trainer updated successfully');
    } catch (error) {
      res.redirect('/trainers?error=Failed to update trainer');
    }
  }

  static async delete(req, res) {
    try {
      await Trainer.delete(req.query.id);
      res.redirect('/trainers?success=Trainer deleted successfully');
    } catch (error) {
      res.redirect('/trainers?error=Failed to delete trainer');
    }
  }
}

export default TrainerController;