const express = require("express");
// const keys = require("./config/config.env");
// const stripe = require("stripe")(keys.STRIPE_SECRET_TEST_KEY);
const models = require("./models");
const app = express();
// const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
require("dotenv").config();

const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());

app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("assets"));

// const { Sequelize } = require("sequelize")

// const sequelize = new Sequelize(
//   `${process.env.USERNAME}`,
//   `${process.env.PASSWORD}`,
//   `${process.env.DATABASE}`,
//   {
//     host: `${process.env.HOST}`,
//     dialect: "postgres",
//   }
// );

// try {
//   sequelize.authenticate();
//   console.log('Connected to DB')
// } catch (error) {
//   console.log('Unable to connect to DB')
// }

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
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
// const cookieSession = require("cookie-session");
// app.use(
//   require("cookie-session")({
//     // Cookie config, take a look at the docs...

//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// const session = require("express-session");
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

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

app.get("/checkout", (req, res) => {
  res.render("checkout")
})
// GET Charge Page for checkout
app.get("/charge", (req, res) => {
  res.render("charge")
})

// , {
//   STRIPE_TEST_KEY: keys.STRIPE_TEST_KEY,
// });}

// POST Charge Page for checkout
// app.post("/charge", async (req, res) => {
//   let user_id = req.session.userid;
//   let balance = await models.Order.sum("price", {
//     where: { user_id: user_id },
//   });
//   let amount = balance * 100;
//   let customer = await stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken,
//   });
//   let charge = await stripe.charges.create({
//     amount: amount,
//     description: "Books",
//     currency: "usd",
//     customer: customer.id,
//   });
//   res.render("charge", charge);
// });

app.post("/charge", async (req, res) => {
  // const stripeSession = await stripe.checkout.session.create({
  //   payment_method_types: ["card"],
  //   line_items: [
  //     {
  //       price_data: {
  //         product: "{{PRODUCT_ID}}",
  //         unit_amount: 1500,
  //         currency: "usd",
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: "payment",
  //   success_url: "https://example.com/success",
  //   cancel_url: "https://example.com/cancel",
  // });
  res.render("charge");
});

// GET Signout
app.get("/signout", (req, res) => {
  req.sessionCookie = null;
  // req.sessionCookie.destroy();
  res.redirect("/");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Check if server 8080 is running
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
