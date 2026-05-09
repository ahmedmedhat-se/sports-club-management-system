import pool from '../config/db.js';

class Reservation {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT r.*, CONCAT(m.MemberFirstName, ' ', m.MemberLastName) as MemberName, 
             f.FacilityName 
      FROM Reservation r 
      JOIN Members m ON r.MemberId = m.MemberId 
      JOIN Facilities f ON r.FacilityId = f.FacilityId 
      ORDER BY r.ReservationDate DESC, r.ReservationStartTime DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT r.*, CONCAT(m.MemberFirstName, ' ', m.MemberLastName) as MemberName, 
             f.FacilityName 
      FROM Reservation r 
      JOIN Members m ON r.MemberId = m.MemberId 
      JOIN Facilities f ON r.FacilityId = f.FacilityId 
      WHERE r.ReservationId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { MemberId, FacilityId, ReservationDate, ReservationStartTime, 
            ReservationEndTime } = data;
    
    const [result] = await pool.query(
      `INSERT INTO Reservation (MemberId, FacilityId, ReservationDate, 
        ReservationStartTime, ReservationEndTime) 
       VALUES (?, ?, ?, ?, ?)`,
      [MemberId, FacilityId, ReservationDate, ReservationStartTime, ReservationEndTime]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { ReservationStatus } = data;
    
    await pool.query(
      'UPDATE Reservation SET ReservationStatus = ? WHERE ReservationId = ?',
      [ReservationStatus, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Reservation WHERE ReservationId = ?', [id]);
    return result.affectedRows;
  }

  static async getMembers() {
    const [rows] = await pool.query('SELECT MemberId, CONCAT(MemberFirstName, " ", MemberLastName) as MemberName FROM Members WHERE MemberStatus = "Active" ORDER BY MemberFirstName');
    return rows;
  }

  static async getFacilities() {
    const [rows] = await pool.query('SELECT FacilityId, FacilityName FROM Facilities WHERE FacilityStatus = "Available" ORDER BY FacilityName');
    return rows;
  }
}

export default Reservation;