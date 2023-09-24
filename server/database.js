import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//create databse connection
// Utilizes promise function to allow for async/await
// anytime  a query is made to the database the code will utilize this variable db to make the connection to the database
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

export default db;
