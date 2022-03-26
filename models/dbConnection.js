const mysql = require("mysql");

const con = mysql.createConnection({
  host: "db4free.net",
  user: "capstonejamy",
  password: "jamylee2022!",
  database: "capstone2022",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
