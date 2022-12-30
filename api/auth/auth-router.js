const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("json-web-token");
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
    res
      .status(201)
      .json({ user, message: `You are now registered, ${username}!` });
  } catch (err) {
    next(err);
  }
});

router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then((user) => {
      if (user) {
        res.status(201).json({
          message: `Welcome, ${user.username}!`,
          token: user.password,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error", err }));
});

// if (user && bcrypt.compareSync(password, user.password)) {
//   const payload = {
//     sub: user.email,
//     username: user.username,
//   };
//   const options = {
//     expiresIn: 60,
//   };

//   const token = jwt.sign(
//     payload,
//     process.env.JWT_SECRET || "secret",
//     options
//   );

//   res.status(200).json({ message: `Here is your token!`, token });

//   } else {
//     res.status(401).json({ message: "Invalid Credentials" });
//   }
// })

module.exports = router;
