const express = require("express");

const UsersRouter = require("./users/users-router");
const CommentsRouter = require("./comments/comments-router");

const server = express();

server.use(express.json());

server.use("/users", UsersRouter);
server.use("/comments", CommentsRouter);

module.exports = server;
