import Reservation from '../models/Reservation.js';

class ReservationController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
          return res.status(404).render('404', { title: 'Not Found', path: '/reservations' });
        }
        const members = await Reservation.getMembers();
        const facilities = await Reservation.getFacilities();
        return res.render('reservations', {
          title: 'Edit Reservation',
          reservation,
          members,
          facilities,
          action: 'edit',
          path: '/reservations'
        });
      }
      
      if (action === 'create') {
        const members = await Reservation.getMembers();
        const facilities = await Reservation.getFacilities();
        return res.render('reservations', {
          title: 'Add Reservation',
          members,
          facilities,
          action: 'create',
          path: '/reservations'
        });
      }
      
      const reservations = await Reservation.findAll();
      res.render('reservations', {
        title: 'Reservations',
        reservations,
        action: 'list',
        path: '/reservations'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load reservations',
        path: '/reservations'
      });
    }
  }

  static async create(req, res) {
    try {
      await Reservation.create(req.body);
      res.redirect('/reservations?success=Reservation created successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/reservations?error=' + encodeURIComponent(error.message));
    }
  }

  static async update(req, res) {
    try {
      await Reservation.update(req.query.id, req.body);
      res.redirect('/reservations?success=Reservation updated successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/reservations?error=' + encodeURIComponent(error.message));
    }
  }

  static async delete(req, res) {
    try {
      await Reservation.delete(req.query.id);
      res.redirect('/reservations?success=Reservation deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/reservations?error=' + encodeURIComponent(error.message));
    }
  }
}

export default ReservationController;