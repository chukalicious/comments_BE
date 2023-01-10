const express = require("express");
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
server.use("/api", AuthRouter);
server.use("/api", AuthRouter);
server.use("/comments", CommentsRouter);

module.exports = server;
