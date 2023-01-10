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
router.post("/login/log", async (req, res, next) => {
  const { email, password } = req.body;

  // this line below initializing the hash was missing,
  // which was preventing the compareSync from working.
  // note how it is now as the second argument in the
  // compareHash function. So, I need it in the register
  //  function, as well as the login function.
  ///////////////  NOPE!  ////////////////////
  // this was incorrect, I still have aproblem
  const hash = bcrypt.hashSync(password, 10);

  try {
    console.log(email);
    const user = await Users.findBy({ email });

    if (user == null) {
      next({ status: 401, message: "Invalid Credentials" });
      return;
    }
    console.log("user: ", user);
    if (bcrypt.compareSync(password, hash)) {
      res.json({ message: `You are now logged in, ${email}` });
    } else {
      next({ status: 401, message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
