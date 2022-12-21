const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const router = express.Router();

const uniqueUser = (req, res, next) => {
  next();
};

router.post("/", uniqueUser, async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    console.log(req.body);
    const hash = bcrypt.hashSync(password, 12);
    const user = { email, username, password: hash };
    await Users.add(user);
    res.status(201).json({ message: `You are now registered, ${username}` });
  } catch (err) {
    next(err);
  }
});

router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
