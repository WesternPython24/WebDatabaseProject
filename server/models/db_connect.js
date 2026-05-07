
import dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql2/promise'


const con = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export  { con, query
};
