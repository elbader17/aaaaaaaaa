const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Conexion con LaburAppDB exitosa!.");
});

module.exports = connection;
