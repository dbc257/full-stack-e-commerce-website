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
  // check is username has already been taken
  models.User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user == username) {
      res.render("register", { message: "Username is already registered." });
    } else {
      let user = models.User.build({ username: username, password: password });
      user.save().then((savedUser) => {
        res.redirect("/login");
      });
    }
  });
});
// let user = models.User.build({ username: username, password: password });
// user.save().then((savedUser) => {
//   res.redirect("/login");
// });

module.exports = router;
