const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../dbConnection");
// const authenticateToken = require("../auth");
const router = express.Router();

//GET ALL comments POST
router.get("/", (req, res) => {
  var sql = "SELECT * FROM comments";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All comments recieved");
    res.send(result);
  });
});

// GET 1 POST
router.get("/:id", (req, res, next) => {
  var sql = `SELECT * from comments WHERE comment_id=${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record recieved");
    res.send(result);
  });
});

// COMMENTS POST
router.post("/", (req, res) => {
  const { title, body, date, author } = req.body;
  if (!title || !body || !date || !author) {
    res.status(400).send({
      msg: "Not all fields have been submitted",
    });
  }
  const blogs = req.comments;
  console.log(comments);
  var sql = `INSERT INTO comments (comment_title, comment_body, comment_date, comment_author) VALUES ('${title}', '${body}', '${author}', '${getToday()}' )`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("internal error");
    console.log("1 comment inserted");
    res.send(result);
  });
});

// UPDATE 1

router.put("/:id", (req, res) => {
  const { title, body, date, author } = req.body;
  var sql = `UPDATE comments SET `;
  if (title) sql += `comment_title= '${title}', `;
  if (body) sql += `comment_body= '${body}', `;
  if (date) sql += `comment_date= '${getToday}', `;
  if (author) sql += `comment_author= '${author}', `;

  query += `WHERE comment_id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("User Updated!");
    res.send(result);
  });
});
module.exports = app;
