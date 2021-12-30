const mysql = require("mysql2");
const util = require("util");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

const pool = mysql.createPool(dbconfig);
pool.getConnection((err, connection) => {
  if (err) {
    console.error("db connection has an error");
  } else {
    connection.release();
    console.log("db is connected");
  }
});

//this works to can use querys with async-await
pool.query = util.promisify(pool.query);

async function list(table) {
  const QUERY = `SELECT * FROM ${table}`;
  try {
    const rows = await pool.query(QUERY);
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function get(table, id) {
  const QUERY = "SELECT * FROM ? WHERE id = ?";
  try {
    const rows = await pool.query(QUERY, [table, id]);
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
}
async function insert(table, data) {
  const QUERY = `INSERT INTO ${table} SET ?`;
  try {
    return await pool.query(QUERY, [data]);
  } catch (err) {
    throw new Error(err.message);
  }
}
async function update(table, data) {
  const QUERY = `UPDATE ${table} SET ? WHERE id = ?`;
  try {
    const rows = await pool.query(QUERY, [data, data.id]);
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
}
function upsert(table, data) {
  if (data && data.id) {
    update(table, data);
  } else {
    insert(table, data);
  }
}
async function remove(table, id) {
  const QUERY = `DELETE FROM ${table} WHERE id = ?`;
  try {
    const response = await pool.query(QUERY, [id]);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}
async function query(table, q) {
  const QUERY = `SELECT * FROM ${table} WHERE ?`;
  try {
    const response = await pool.query(QUERY, q);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
