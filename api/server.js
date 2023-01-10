const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const UsersRouter = require("./users/users-router");
const CommentsRouter = require("./comments/comments-router");
const AuthRouter = require("./auth/auth-router");

const server = express();

const sessionConfiguration = {
  name: "sessionToken",
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 120,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUnititialized: false,
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/users", UsersRouter);
server.use("/api", AuthRouter);
server.use("/api", AuthRouter);
server.use("/comments", CommentsRouter);

module.exports = server;
