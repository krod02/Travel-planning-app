import db from '../database.js';
import CustomError from '../customError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
async function register(email, password, firstName, lastName) {
  // check if user exists
  const [user] = await db.query(`SELECT * FROM User WHERE email = ?`, [email]);
  if (user.length) {
    throw new CustomError('User already exists', 409);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const [result] = await db.query(
    `INSERT INTO User (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
    [email, hash, firstName, lastName]
  );
  if (result.affectedRows) {
    const name = `${firstName} ${lastName}`;
    return { id: result.insertId, email, name };
  }
  throw new CustomError('User could not be created', 500);
}

// Login a user
async function login(email1, password) {
  const [user] = await db.query(
    `SELECT * FROM User WHERE email = ? AND password = ?`,
    [email1, password]
  );
  if (user.length === 0) {
    throw new CustomError('User does not exist', 404);
  }

  if (!bcrypt.compareSync(password, user[0].password)) {
    throw new CustomError('Password is incorrect', 400);
  }
  const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user: user[0], token };
}

export default {
  register,
  login,
};
