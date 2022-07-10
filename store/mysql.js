const mysql = require("mysql2");
const util = require("util");
const config = require("../config");

class MySQLSingleton {
  static instance
  constructor(host,user,password,database){
    let instance = mysql.createPool({
      host,
      user,
      password,
      database
    });
    instance.getConnection((err, connection) => {
      if (err) {
        console.error("db connection has an error");
      } else {
        connection.release();
        console.log("db is connected");
      }
    });
    instance.query = util.promisify(instance.query);
    // if(!!this.instance){
    //   return this.instance
    // }
    this.instance = instance
  }
  static async list(table) {
    const QUERY = `SELECT * FROM ${table}`;
    try {
      const rows = await pool.query(QUERY);
      return rows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async get(table, id) {
    const QUERY = "SELECT * FROM ? WHERE id = ?";
    try {
      const rows = await pool.query(QUERY, [table, id]);
      return rows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async insert(table, data) {
    const QUERY = `INSERT INTO ${table} SET ?`;
    try {
      return await pool.query(QUERY, [data]);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async update(table, data) {
    const QUERY = `UPDATE ${table} SET ? WHERE id = ?`;
    try {
      const rows = await pool.query(QUERY, [data, data.id]);
      return rows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static upsert(table, data) {
    if (data && data.id) {
      update(table, data);
    } else {
      insert(table, data);
    }
  }
  static async remove(table, id) {
    const QUERY = `DELETE FROM ${table} WHERE id = ?`;
    try {
      const response = await pool.query(QUERY, [id]);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async query(table, q) {
    const QUERY = `SELECT * FROM ${table} WHERE ?`;
    try {
      const response = await pool.query(QUERY, q);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
let instance = new MySQLSingleton(config.mysql.host,config.mysql.user,config.mysql.password,config.mysql.database)
module.exports = {instance}