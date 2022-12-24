const express = require("express");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router");
const CommentsRouter = require("./comments/comments-router");
const AuthRouter = require("./auth/auth-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/users", UsersRouter);
server.use("/users/signup", AuthRouter);
server.use("/users/login", AuthRouter);
server.use("/comments", CommentsRouter);

module.exports = server;
