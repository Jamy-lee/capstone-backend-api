require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const con = require("./dbConnection");
// Needed fixes
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
//
//

const usersRouter = require("./routes/usersRouter");
const blogsRouter = require("./routes/blogsRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const _rootUrl = req.get("host") + req.url;
  res.send({
    msg: "Welcome to the API.",
    // routes: {
    //   contact: `${_rootUrl}contact`,
    // },
  });
});

app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/comments", commentsRouter);
app.set("port", process.env.PORT || 8228);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
