let express = require("express");
let router = express.Router();
let models = require("../models");

// GET route to display all products
router.get("/", (req, res) => {
  models.Product.findAll().then((products) => {
    res.render("products", { allProducts: products });
  });
});
// POST route to add a product to Order Summary Page
router.post("/", (req, res) => {
  let title = req.body.product_title;
  let product_id = req.body.product_id;
  let order = models.Order.build({
    product_id: product_id,
  });
  order.save().then(() => {
    res.render("products", { title: title });
  });
});

module.exports = router;
