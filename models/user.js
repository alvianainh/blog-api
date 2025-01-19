const pool = require('./db');
const bcrypt = require('bcryptjs');

const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
    [email, hashedPassword, name]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const getUserById = async (userId) => {
  const result = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

module.exports = { registerUser, findUserByEmail, getUserById };
