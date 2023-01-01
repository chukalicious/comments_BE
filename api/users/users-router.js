const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

router.get("/:id", (req, res) => {
  Users.getByID(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
});

router.post("/", (req, res) => {
  Users.add(req.body)
    .then((user) => {
      if (user.email && user.password && user.username) {
        res.status(201).json(user);
        console.log("nice, complete profile subimission!");
      } else {
        res.status(402).json({
          message:
            "You must include and email address, choose a password and a username, please. ",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been deleted" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

module.exports = router;
