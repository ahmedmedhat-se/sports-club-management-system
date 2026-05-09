import pool from '../config/db.js';

class Schedule {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT s.*, sa.ActivityName, f.FacilityName, 
             CONCAT(t.TrainerFirstName, ' ', t.TrainerLastName) as TrainerName
      FROM \`Schedule\` s 
      JOIN SportsActivity sa ON s.ActivityId = sa.ActivityId 
      JOIN Facilities f ON s.FacilityId = f.FacilityId 
      LEFT JOIN Trainer t ON s.TrainerId = t.TrainerId 
      ORDER BY s.ScheduleStartDate DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT s.*, sa.ActivityName, f.FacilityName,
             CONCAT(t.TrainerFirstName, ' ', t.TrainerLastName) as TrainerName
      FROM \`Schedule\` s 
      JOIN SportsActivity sa ON s.ActivityId = sa.ActivityId 
      JOIN Facilities f ON s.FacilityId = f.FacilityId 
      LEFT JOIN Trainer t ON s.TrainerId = t.TrainerId 
      WHERE s.ScheduleId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { ActivityId, FacilityId, TrainerId, ScheduleStartDate, ScheduleEndDate, 
            ScheduleStartTime, ScheduleEndTime, ScheduleDayOfWeek } = data;
    
    const [result] = await pool.query(
      `INSERT INTO \`Schedule\` (ActivityId, FacilityId, TrainerId, ScheduleStartDate, 
        ScheduleEndDate, ScheduleStartTime, ScheduleEndTime, ScheduleDayOfWeek) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [ActivityId, FacilityId, TrainerId || null, ScheduleStartDate, ScheduleEndDate, 
       ScheduleStartTime, ScheduleEndTime, ScheduleDayOfWeek]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { ActivityId, FacilityId, TrainerId, ScheduleStartDate, ScheduleEndDate, 
            ScheduleStartTime, ScheduleEndTime, ScheduleDayOfWeek } = data;
    
    await pool.query(
      `UPDATE \`Schedule\` SET ActivityId = ?, FacilityId = ?, TrainerId = ?, 
       ScheduleStartDate = ?, ScheduleEndDate = ?, ScheduleStartTime = ?, 
       ScheduleEndTime = ?, ScheduleDayOfWeek = ? WHERE ScheduleId = ?`,
      [ActivityId, FacilityId, TrainerId || null, ScheduleStartDate, ScheduleEndDate, 
       ScheduleStartTime, ScheduleEndTime, ScheduleDayOfWeek, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM `Schedule` WHERE ScheduleId = ?', [id]);
    return result.affectedRows;
  }

  static async getActivities() {
    const [rows] = await pool.query('SELECT ActivityId, ActivityName FROM SportsActivity WHERE ActivityStatus = "Active" ORDER BY ActivityName');
    return rows;
  }

  static async getFacilities() {
    const [rows] = await pool.query('SELECT FacilityId, FacilityName FROM Facilities WHERE FacilityStatus = "Available" ORDER BY FacilityName');
    return rows;
  }

  static async getTrainers() {
    const [rows] = await pool.query('SELECT TrainerId, CONCAT(TrainerFirstName, " ", TrainerLastName) as TrainerName FROM Trainer WHERE TrainerStatus = "Active" ORDER BY TrainerFirstName');
    return rows;
  }
}

export default Schedule;