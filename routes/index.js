let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display all products
router.get("/", (req, res) => {
  models.Product.findAll().then((products) => {
    res.render("index", { allProducts: products });
  });
});

module.exports = router;
