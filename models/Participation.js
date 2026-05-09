import pool from '../config/db.js';

class Participation {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, CONCAT(m.MemberFirstName, ' ', m.MemberLastName) as MemberName, 
             sa.ActivityName 
      FROM Participation p 
      JOIN Members m ON p.MemberId = m.MemberId 
      JOIN SportsActivity sa ON p.ActivityId = sa.ActivityId 
      ORDER BY p.EnrollmentDate DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, CONCAT(m.MemberFirstName, ' ', m.MemberLastName) as MemberName, 
             sa.ActivityName 
      FROM Participation p 
      JOIN Members m ON p.MemberId = m.MemberId 
      JOIN SportsActivity sa ON p.ActivityId = sa.ActivityId 
      WHERE p.ParticipationId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { MemberId, ActivityId, ParticipationStatus, EnrollmentDate } = data;
    
    const [existing] = await pool.query(
      'SELECT * FROM Participation WHERE MemberId = ? AND ActivityId = ?',
      [MemberId, ActivityId]
    );
    
    if (existing.length > 0) {
      throw new Error('Member already enrolled in this activity');
    }
    
    const [result] = await pool.query(
      `INSERT INTO Participation (MemberId, ActivityId, ParticipationStatus, EnrollmentDate) 
       VALUES (?, ?, ?, ?)`,
      [MemberId, ActivityId, ParticipationStatus || 'Enrolled', EnrollmentDate]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { MemberId, ActivityId, ParticipationStatus, EnrollmentDate } = data;
    
    await pool.query(
      'UPDATE Participation SET MemberId = ?, ActivityId = ?, ParticipationStatus = ?, EnrollmentDate = ? WHERE ParticipationId = ?',
      [MemberId, ActivityId, ParticipationStatus, EnrollmentDate, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Participation WHERE ParticipationId = ?', [id]);
    return result.affectedRows;
  }

  static async getMembers() {
    const [rows] = await pool.query('SELECT MemberId, MemberFirstName, MemberLastName FROM Members WHERE MemberStatus = "Active" ORDER BY MemberFirstName');
    return rows;
  }

  static async getActivities() {
    const [rows] = await pool.query('SELECT ActivityId, ActivityName FROM SportsActivity WHERE ActivityStatus = "Active" ORDER BY ActivityName');
    return rows;
  }
}

export default Participation;