const express = require("express");
const app = express();
require("dotenv").config();
// const adminRouter = require('./routes/admin')
const session = require("express-session");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const addProductRouter = require("./routes/add-product");
// const ordersummaryRouter = require("./routes/cart");
const cartRouter = require("./routes/cart");
// const productsRouter = require("./routes/products");
const indexRouter = require("./routes/index");

const mustacheExpress = require("mustache-express");
const models = require("./models");
app.use(express.urlencoded());
// tell express to use mustache templating engine
app.engine("mustache", mustacheExpress());
// the pages are located in views directory
app.set("views", "./views");
// extension will be .mustache
app.set("view engine", "mustache");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

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

app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("assets"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/add-product", addProductRouter);
// app.use("/ordersummary", ordersummaryRouter);
app.use("/cart", cartRouter);
// app.use("/products", productsRouter);
app.use("/index", indexRouter);
// POST route to signout
app.post("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// app.get("/cart", (req, res) => {
//   res.render("cart");
// });
app.get("/category", (req, res) => {
  res.render("category");
});
app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/detail", (req, res) => {
  res.render("detail");
});
// app.get("/index", (req, res) => {
//   res.render("index");
// });
// Check to see if the server is running
app.listen(3000, () => {
  console.log("Server is on the run!");
});
