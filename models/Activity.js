import pool from '../config/db.js';

class Activity {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT sa.*, dl.LevelName 
      FROM SportsActivity sa 
      LEFT JOIN DifficultyLevel dl ON sa.DifficultyLevelId = dl.DifficultyLevelId 
      ORDER BY sa.ActivityId DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT sa.*, dl.LevelName 
      FROM SportsActivity sa 
      LEFT JOIN DifficultyLevel dl ON sa.DifficultyLevelId = dl.DifficultyLevelId 
      WHERE sa.ActivityId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { ActivityName, DifficultyLevelId, MaxCapacity, ActivityFee, 
            ActivityDescription } = data;
    
    const [result] = await pool.query(
      `INSERT INTO SportsActivity (ActivityName, DifficultyLevelId, MaxCapacity, 
        ActivityFee, ActivityDescription) 
       VALUES (?, ?, ?, ?, ?)`,
      [ActivityName, DifficultyLevelId || null, MaxCapacity, ActivityFee, 
       ActivityDescription || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { ActivityName, DifficultyLevelId, MaxCapacity, ActivityFee, 
            ActivityDescription, ActivityStatus } = data;
    
    await pool.query(
      `UPDATE SportsActivity SET ActivityName = ?, DifficultyLevelId = ?, 
       MaxCapacity = ?, ActivityFee = ?, ActivityDescription = ?, 
       ActivityStatus = ? WHERE ActivityId = ?`,
      [ActivityName, DifficultyLevelId || null, MaxCapacity, ActivityFee, 
       ActivityDescription || null, ActivityStatus, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM SportsActivity WHERE ActivityId = ?', [id]);
    return result.affectedRows;
  }

  static async getDifficultyLevels() {
    const [rows] = await pool.query('SELECT * FROM DifficultyLevel ORDER BY LevelName');
    return rows;
  }
}

export default Activity;