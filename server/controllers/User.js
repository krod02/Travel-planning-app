import db from '../database.js';
import CustomError from '../customError.js';

// Register a new user
async function register(email, password, name) {
  // check if user exists
  const [user] = await db.query(`SELECT * FROM User WHERE email = ?`, [email]);
  if (user.length) {
    throw new CustomError('User already exists', 409);
  }

  const [result] = await db.query(
    `INSERT INTO User (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
    [email, password, name[0], name[1]]
  );
  if (result.affectedRows) {
    return { id: result.insertId, email, name };
  }
  throw new CustomError('User could not be created', 500);
}

// Login a user
async function login(email, password) {
  const [user] = await db.query(
    `SELECT * FROM User WHERE email = ? AND password = ?`,
    [email, password]
  );
  if (user.length) {
    return user[0];
  }
  throw new CustomError('User does not exist', 404);
}

export default {
  register,
  login,
};
