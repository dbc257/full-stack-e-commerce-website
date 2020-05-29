const express = require("express");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const mustacheExpress = require("mustache-express");
const models = require("./models");
// const bodyParser = require("body-parser");

//Body Parser Middleware

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// Set Static Folder
// app.use(express.static(`${__dirname}/public`));

const app = express();
require("dotenv").config();

const session = require("express-session");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const detailRouter = require("./routes/detail");
const cartRouter = require("./routes/cart");
const indexRouter = require("./routes/index");
// const addProductRouter = require("./routes/add-product");
app.use(express.urlencoded());

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("assets"));
// authentication function
function auth(req, res, next) {
  if (req.session) {
    if (req.session.userid) {
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
}
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", auth, adminRouter);
app.use("/cart", auth, cartRouter);
app.use("/index", auth, indexRouter);
app.use("/detail", auth, detailRouter);
// Charge Route
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

// Charge Route
app.get("/charge", (req, res) => {
  res.render("charge", {
    stripePublishableKey: keys.stripePublishableKey,
  });
});
// POST route to signout
app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// Check to see if the server is running
// app.listen(3000, () => {
//   console.log("Server is on the run!");
// });
