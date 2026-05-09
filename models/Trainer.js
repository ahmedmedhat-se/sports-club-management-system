import pool from '../config/db.js';

class Trainer {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT t.*, s.SpecializationName 
      FROM Trainer t 
      LEFT JOIN Specialization s ON t.SpecializationId = s.SpecializationId 
      ORDER BY t.TrainerId DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT t.*, s.SpecializationName 
      FROM Trainer t 
      LEFT JOIN Specialization s ON t.SpecializationId = s.SpecializationId 
      WHERE t.TrainerId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { TrainerFirstName, TrainerLastName, TrainerEmail, 
            TrainerPhoneNumber, TrainerHireDate, SpecializationId } = data;
    
    const [result] = await pool.query(
      `INSERT INTO Trainer (TrainerFirstName, TrainerLastName, TrainerEmail, 
        TrainerPhoneNumber, TrainerHireDate, SpecializationId) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [TrainerFirstName, TrainerLastName, TrainerEmail, 
       TrainerPhoneNumber || null, TrainerHireDate, SpecializationId || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { TrainerFirstName, TrainerLastName, TrainerEmail, 
            TrainerPhoneNumber, SpecializationId, TrainerStatus } = data;
    
    await pool.query(
      `UPDATE Trainer SET TrainerFirstName = ?, TrainerLastName = ?, 
       TrainerEmail = ?, TrainerPhoneNumber = ?, SpecializationId = ?, 
       TrainerStatus = ? WHERE TrainerId = ?`,
      [TrainerFirstName, TrainerLastName, TrainerEmail, 
       TrainerPhoneNumber || null, SpecializationId || null, TrainerStatus, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Trainer WHERE TrainerId = ?', [id]);
    return result.affectedRows;
  }

  static async getSpecializations() {
    const [rows] = await pool.query('SELECT * FROM Specialization ORDER BY SpecializationName');
    return rows;
  }
}

export default Trainer;