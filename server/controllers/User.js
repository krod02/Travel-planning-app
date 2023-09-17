import db from '../database.js';

// Register a new user
async function register(email, password, name) {
  // check if user exists
  const [user] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
  if (user.length) {
    throw new Error('User already exists');
  }

  const [firstName, lastName] = name.split(' ');

  const [result] = await db.query(
    `INSERT INTO user (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
    [email, password, firstName, lastName]
  );
  if (result.affectedRows) {
    return { id: result.insertId, email, name };
  }
  throw new Error('User could not be created');
}

// Login a user
async function login(email, password) {
  const [user] = await db.query(
    `SELECT * FROM user WHERE email = ? AND password = ?`,
    [email, password]
  );
  if (user.length) {
    return user[0];
  }
  throw new Error('User not found');
}

export default {
  register,
  login,
};
