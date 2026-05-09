import pool from '../config/db.js';

class Facility {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT f.*, ft.FacilityTypeName 
      FROM Facilities f 
      LEFT JOIN FacilityType ft ON f.FacilityTypeId = ft.FacilityTypeId 
      ORDER BY f.FacilityId DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT f.*, ft.FacilityTypeName 
      FROM Facilities f 
      LEFT JOIN FacilityType ft ON f.FacilityTypeId = ft.FacilityTypeId 
      WHERE f.FacilityId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { FacilityName, FacilityTypeId, FacilityLocation, FacilityCapacity } = data;
    
    const [result] = await pool.query(
      `INSERT INTO Facilities (FacilityName, FacilityTypeId, FacilityLocation, FacilityCapacity) 
       VALUES (?, ?, ?, ?)`,
      [FacilityName, FacilityTypeId || null, FacilityLocation || null, FacilityCapacity]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { FacilityName, FacilityTypeId, FacilityLocation, FacilityCapacity, 
            FacilityStatus } = data;
    
    await pool.query(
      `UPDATE Facilities SET FacilityName = ?, FacilityTypeId = ?, FacilityLocation = ?, 
       FacilityCapacity = ?, FacilityStatus = ? WHERE FacilityId = ?`,
      [FacilityName, FacilityTypeId || null, FacilityLocation || null, 
       FacilityCapacity, FacilityStatus, id]
    );
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Facilities WHERE FacilityId = ?', [id]);
    return result.affectedRows;
  }

  static async getFacilityTypes() {
    const [rows] = await pool.query('SELECT * FROM FacilityType ORDER BY FacilityTypeName');
    return rows;
  }
}

export default Facility;