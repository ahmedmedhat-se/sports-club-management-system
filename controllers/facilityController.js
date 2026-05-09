import Facility from '../models/Facility.js';

class FacilityController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const facility = await Facility.findById(id);
        if (!facility) {
          return res.status(404).render('404', { title: 'Not Found', path: '/facilities' });
        }
        const facilityTypes = await Facility.getFacilityTypes();
        return res.render('facilities', { 
          title: 'Edit Facility', 
          facility, 
          facilityTypes, 
          action: 'edit', 
          path: '/facilities' 
        });
      }
      
      if (action === 'create') {
        const facilityTypes = await Facility.getFacilityTypes();
        return res.render('facilities', { 
          title: 'Add Facility', 
          facilityTypes, 
          action: 'create', 
          path: '/facilities' 
        });
      }
      
      const facilities = await Facility.findAll();
      res.render('facilities', { 
        title: 'Facilities', 
        facilities, 
        action: 'list', 
        path: '/facilities' 
      });
    } catch (error) {
      res.status(500).render('error', { 
        title: 'Error', 
        message: error.message, 
        path: '/facilities' 
      });
    }
  }

  static async create(req, res) {
    try {
      await Facility.create(req.body);
      res.redirect('/facilities?success=Facility created successfully');
    } catch (error) {
      res.redirect('/facilities?error=Failed to create facility');
    }
  }

  static async update(req, res) {
    try {
      await Facility.update(req.query.id, req.body);
      res.redirect('/facilities?success=Facility updated successfully');
    } catch (error) {
      res.redirect('/facilities?error=Failed to update facility');
    }
  }

  static async delete(req, res) {
    try {
      await Facility.delete(req.query.id);
      res.redirect('/facilities?success=Facility deleted successfully');
    } catch (error) {
      res.redirect('/facilities?error=Failed to delete facility');
    }
  }
}

export default FacilityController;