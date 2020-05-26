let express = require("express");
let router = express.Router();
let models = require("../models");
var bcrypt = require("bcryptjs");
// GET route to display Login Page
router.get("/", (req, res) => {
  res.render("login");
});
// POST route to login username and password
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  models.User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user == null) {
      res.render("login", { messageError: "Username not found" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        // user password is correct
        res.redirect("/products");
      } else {
        // password not correct
        res.render("login", { messageError: "Password is incorrect!" });
      }
    }
  });
});
// POST route to signout
// router.post("/signout", (req, res) => {
//   req.session.destroy();
//   res.redirect("login");
// });

module.exports = router;
