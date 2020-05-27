const express = require("express");
const app = express();
// const adminRouter = require('./routes/admin')
const session = require("express-session");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const addProductRouter = require("./routes/add-product");
const ordersummaryRouter = require("./routes/ordersummary");
const productsRouter = require("./routes/products");

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
    secret: "redrum",
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
app.use(express.static("images"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/add-product", addProductRouter);
app.use("/ordersummary", ordersummaryRouter);
app.use("/products", productsRouter);

// Check to see if the server is running
app.listen(3000, () => {
  console.log("Server is on the run!");
});
