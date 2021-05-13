const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT
});


db.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});



module.exports = db;
