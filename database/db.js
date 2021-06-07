const mysql = require("mysql");
const dbConfig = require("../config/database");

var connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = connection;