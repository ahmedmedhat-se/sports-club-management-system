import pool from '../config/db.js';

class Dashboard {
  static async getStats() {
    const [memberCount] = await pool.query('SELECT COUNT(*) as count FROM Members');
    const [trainerCount] = await pool.query('SELECT COUNT(*) as count FROM Trainer');
    const [activityCount] = await pool.query('SELECT COUNT(*) as count FROM SportsActivity');
    const [facilityCount] = await pool.query('SELECT COUNT(*) as count FROM Facilities');
    const [reservationCount] = await pool.query('SELECT COUNT(*) as count FROM Reservation');
    
    return {
      totalMembers: memberCount[0].count,
      totalTrainers: trainerCount[0].count,
      totalActivities: activityCount[0].count,
      totalFacilities: facilityCount[0].count,
      totalReservations: reservationCount[0].count
    };
  }

  static async getRecentReservations() {
    const [rows] = await pool.query(`
      SELECT r.*, CONCAT(m.MemberFirstName, ' ', m.MemberLastName) as MemberName, 
             f.FacilityName 
      FROM Reservation r 
      JOIN Members m ON r.MemberId = m.MemberId 
      JOIN Facilities f ON r.FacilityId = f.FacilityId 
      ORDER BY r.ReservationDate DESC 
      LIMIT 5
    `);
    return rows;
  }
}

export default Dashboard;