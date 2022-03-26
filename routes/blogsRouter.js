const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../dbConnection");
const authenticateToken = require("../auth");
const router = express.Router();

function getToday() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "2");
  const mm = String(today.getMonth() + 1).padStart(2, "2"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  return today;
}

//GET ALL BLOG POST
router.get("/", (req, res) => {
  var sql = "SELECT * FROM Blogs";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All blogs recieved");
    res.send(result);
  });
});

// GET 1 POST
router.get("/:name", (req, res, next) => {
  var sql = `SELECT * from Blogs WHERE blog_title=${req.params.title}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record recieved");
    res.send(result);
  });
});

// BLOG POST
router.post("/", (req, res) => {
  const { title, body, image } = req.body;
  if (!title || !body || !image) {
    res.status(400).send({
      msg: "Not all fields have been submitted",
    });
  }
  const Blogs = req.Blogs;
  console.log(Blogs);
  var sql = `INSERT INTO Blogs (blog_title, blog_body, blog_image) VALUES ('${title}', '${body}', '${image}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("internal error");
    console.log("1 blog inserted");
    res.send(result);
  });
});

// UPDATE blog WITH ID
router.put("/:title", (req, res) => {
  const { title, body } = req.body;
  let id = req.params.title;
  var sql = `UPDATE Blogs SET `;
  if (title) {
    sql += `blog_title = '${title}', `;
  }
  if (body) {
    sql += `blog_body = '${body}', `;
  }
  sql += `blog_image = '${image}' WHERE blog_tile=${title}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Blog Updated!!!");
    res.send(result);
  });
});

// DELETE BLOG
router.delete("/:name", (req, res, next) => {
  var sql = `DELETE FROM Blogs WHERE blog_name=${req.params.name}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("blog deleted");
    res.send(result);
  });
});
module.exports = router;
