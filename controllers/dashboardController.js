import Dashboard from '../models/Dashboard.js';

class DashboardController {
  static async index(req, res) {
    try {
      const stats = await Dashboard.getStats();
      const recentReservations = await Dashboard.getRecentReservations();
      
      res.render('dashboard', {
        title: 'Dashboard',
        stats,
        recentReservations,
        path: '/'
      });
    } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load dashboard'
      });
    }
  }
}

export default DashboardController;