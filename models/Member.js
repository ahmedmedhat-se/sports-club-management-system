import pool from '../config/db.js';

class Member {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT m.*, mt.MembershipTypeName, a.City 
      FROM Members m 
      LEFT JOIN MembershipType mt ON m.MembershipTypeId = mt.MembershipTypeId 
      LEFT JOIN Address a ON m.AddressId = a.AddressId 
      ORDER BY m.MemberId DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT m.*, mt.MembershipTypeName, a.Building, a.StreetNo, a.City 
      FROM Members m 
      LEFT JOIN MembershipType mt ON m.MembershipTypeId = mt.MembershipTypeId 
      LEFT JOIN Address a ON m.AddressId = a.AddressId 
      WHERE m.MemberId = ?
    `, [id]);
    return rows[0];
  }

  static async create(data) {
    const { MemberFirstName, MemberLastName, MemberDateOfBirth, MemberEmail, 
            MemberPhoneNumber, MembershipTypeId, MemberStartDate, Building, 
            StreetNo, City } = data;
    
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const [addressResult] = await connection.query(
        'INSERT INTO Address (Building, StreetNo, City) VALUES (?, ?, ?)',
        [Building || null, StreetNo || null, City]
      );
      
      const [memberResult] = await connection.query(
        `INSERT INTO Members (MemberFirstName, MemberLastName, MemberDateOfBirth, 
          MemberEmail, MemberPhoneNumber, AddressId, MembershipTypeId, MemberStartDate) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [MemberFirstName, MemberLastName, MemberDateOfBirth || null, MemberEmail, 
         MemberPhoneNumber || null, addressResult.insertId, MembershipTypeId || null, 
         MemberStartDate]
      );
      
      await connection.commit();
      return memberResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const { MemberFirstName, MemberLastName, MemberDateOfBirth, MemberEmail, 
            MemberPhoneNumber, MembershipTypeId, MemberStatus, MemberStartDate, 
            MemberEndDate, Building, StreetNo, City, AddressId } = data;
    
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      if (AddressId) {
        await connection.query(
          'UPDATE Address SET Building = ?, StreetNo = ?, City = ? WHERE AddressId = ?',
          [Building || null, StreetNo || null, City, AddressId]
        );
      }
      
      await connection.query(
        `UPDATE Members SET MemberFirstName = ?, MemberLastName = ?, 
         MemberDateOfBirth = ?, MemberEmail = ?, MemberPhoneNumber = ?, 
         MembershipTypeId = ?, MemberStatus = ?, MemberStartDate = ?, 
         MemberEndDate = ? WHERE MemberId = ?`,
        [MemberFirstName, MemberLastName, MemberDateOfBirth || null, MemberEmail, 
         MemberPhoneNumber || null, MembershipTypeId || null, MemberStatus, 
         MemberStartDate, MemberEndDate || null, id]
      );
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM Members WHERE MemberId = ?', [id]);
    return result.affectedRows;
  }

  static async getMembershipTypes() {
    const [rows] = await pool.query('SELECT * FROM MembershipType ORDER BY MembershipTypeName');
    return rows;
  }
}

export default Member;