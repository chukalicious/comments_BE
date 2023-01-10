const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const Users = require("../users/users-model");
const router = express.Router();

const uniqueUser = (req, res, next) => {
  next();
};

// Register ////////
router.post(
  "/signup",
  // uniqueUser,
  async (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;
    try {
      const saved = await Users.add(user);
      res
        .status(201)
        .json({ message: `You are now registered, ${user.username}!`, saved });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Could not create user",
        detail: err.detail,
        table: `In ${err.table} table`,
      });
    }
  }
);

// Login /////////
router.post("/login/log", async (req, res) => {
  const { email, password } = req.body;

  try {
    // This line below was my problem. I needed to add the .first()
    const user = await Users.findBy({ email }).first();

    if (user == null) {
      next({ status: 401, message: "Invalid Credentials" });
      return;
    }
    console.log("user: ", user);
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ message: `You are now logged in, ${email}` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", err });
  }
});

module.exports = router;
