let express = require("express");
let router = express.Router();
let models = require("../models");
var bcrypt = require("bcryptjs");

// GET route to display registration page
router.get("/", (req, res) => {
  res.render("register");
});

// POST route to register a new user account
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password, 10);
  let user = models.User.build({ username: username, password: password });
  user
    .save()
    .then((savedUser) => {
      res.redirect("/");
    })
    .catch(() => {
      res.render("register", { message: "Username is already registered." });
    });
});

module.exports = router;
