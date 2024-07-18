import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kry,pton.0749',
  database: 'signupdb',
});

export default pool;
