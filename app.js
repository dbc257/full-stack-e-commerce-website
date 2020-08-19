const express = require("express");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const models = require("./models");
const app = express();
var bcrypt = require("bcryptjs");
require("dotenv").config();

const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());
app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("assets"));

// User authentication function
function auth(req, res, next) {
  if (req.session) {
    if (req.session.userid) {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}

// Admin authentication function
function admin(req, res, next) {
  if (req.session.is_admin) {
    next();
  } else {
    res.redirect("/");
  }
}

// create user session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// GET route to display Login Page
app.get("/", (req, res) => {
  res.render("login");
});

// POST route to login username and password
app.post("/", (req, res) => {
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
        req.session.username = user.username;
        req.session.userid = user.id;
        req.session.is_admin = user.is_admin;
        res.redirect("/index");
      } else {
        // password not correct
        res.render("login", { messageError: "Password is incorrect!" });
      }
    }
  });
});

// Index Page Route
const indexRouter = require("./routes/index");
app.use("/index", auth, indexRouter);

// Register Page Route
const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

// Admin Page Route
const adminRouter = require("./routes/admin");
app.use("/admin", auth, admin, adminRouter);

// Product Detail Page Route
const detailRouter = require("./routes/detail");
app.use("/detail", auth, detailRouter);

// Cart Page Route
const cartRouter = require("./routes/cart");
app.use("/cart", auth, cartRouter);

// GET Charge Page for checkout
app.get("/charge", (req, res) => {
  res.render("charge", {
    stripePublishableKey: keys.stripePublishableKey,
  });
});

// POST Charge Page for checkout
app.post("/charge", async (req, res) => {
  let user_id = req.session.userid;
  let balance = await models.Order.sum("price", {
    where: { user_id: user_id },
  });
  let amount = balance * 100;
  let customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  });
  let charge = await stripe.charges.create({
    amount: amount,
    description: "Books",
    currency: "usd",
    customer: customer.id,
  });
  res.render("charge", charge);
});

// GET Signout
app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Check if server 8080 is running
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
